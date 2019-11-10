import React, { Component } from 'react'
import { getFirestore } from 'redux-firestore';
import {Switch, Button} from 'react-materialize';
import TodoListCard from '../home_screen/TodoListCard';
import { Link } from 'react-router-dom';

export default class ItemScreen extends Component {
    submitItem(){
        var newCard = this.props.location.state.newCard;
        console.log("New Card? " + newCard)
        const firestore = getFirestore();
        const {id,itemid} = this.props.match.params;
        firestore.collection("todoLists").doc(id)
        .get()
        .then(doc => {
            var itemsArr = doc.data().items;
            if (!newCard){
                this.updateItem(itemsArr, id, itemid);
            }
            else{
                this.addNewCard(itemsArr, id, itemid);
            }
        })
    }
    addNewCard(itemsArr,id,itemid){
        var newItem = {description : document.getElementById("item_description_textfield").value,
                        assigned_to : document.getElementById("item_assigned_to_textfield").value,
                        due_date : document.getElementById("item_due_date_textfield").value,
                        completed : document.getElementById("item_completedSwitch").checked,
                        key : itemid,
                        id : itemid,
                        };
        itemsArr.push(newItem);
        const firestore = getFirestore();
        firestore.collection("todoLists").doc(id).update({
            items : itemsArr,
        });
        this.goBackToListScreen();
    }
    updateItem(itemsArr, id, itemid){
        var itemToUpdate = itemsArr[itemid]; 
        itemToUpdate.description = document.getElementById("item_description_textfield").value;
        itemToUpdate.assigned_to = document.getElementById("item_assigned_to_textfield").value;
        itemToUpdate.due_date = document.getElementById("item_due_date_textfield").value;
        itemToUpdate.completed = document.getElementById("item_completedSwitch").checked;
        // Updates it and reinserts it into the array. Do I even need to reinsert?
        itemsArr[itemid] = itemToUpdate;
        const firestore = getFirestore();
        firestore.collection("todoLists").doc(id).update({
            items : itemsArr,
        });
        this.goBackToListScreen();
    }
    goBackToListScreen(){
        this.props.history.goBack();
    }
    render() {
        var todoItem = this.props.location.state.todoItem;
        // True or false if it should be empty or not
        var newCard = this.props.location.state.new;
        console.table(todoItem);
        return (
            <div className="item_form_container">
                <div id="item_heading"></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_description_prompt">Description:</span>
                <input className= "item_input" type = "text" id="item_description_textfield" defaultValue = {newCard ? "" : todoItem.description}/></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_assigned_to_prompt">Assigned to:</span>
                <input className= "item_input" type = "text" id="item_assigned_to_textfield" defaultValue = {newCard ? "" : todoItem.assigned_to}/></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_due_date_prompt">Due Date:</span>
                <input className= "item_input" type = "date" id="item_due_date_textfield" defaultValue = {newCard ? "" : todoItem.due_date}/></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_completed_prompt">Status:</span>
                    <Switch offLabel="Pending" onLabel="Complete" id = "item_completedSwitch" defaultChecked = {newCard ? false : todoItem.completed}/> 
                </div>
                <div id="submitOrCancelDiv">
                    <Button className= "submit_button" type = "submit" waves = "light" onClick = {(e)=>this.submitItem()}>Submit</Button>
                    <Button className= "cancel_button" type = "cancel" waves = "light" onClick = {(e)=>this.goBackToListScreen()}>Cancel</Button>
                    </div>
            </div>// make these buttons nicer
        )
    }
}
