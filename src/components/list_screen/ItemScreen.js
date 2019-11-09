import React, { Component } from 'react'
import { getFirestore } from 'redux-firestore';
import {Switch} from 'react-materialize';

export default class ItemScreen extends Component {
    handleChange = (e) => {
        const { target } = e;
        const firestore = getFirestore();
        const {id,itemid} = this.props.match.params;
    }



    render() {
        var todoItem = this.props.location.state;
        console.table(todoItem);
        return (
            <div className="item_form_container">
                <div id="item_heading"></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_description_prompt">Description:</span>
                <input className= "item_input" type = "text" id="item_description_textfield"/></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_assigned_to_prompt">Assigned to:</span>
                <input className= "item_input" type = "text" id="item_assigned_to_textfield"/></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_due_date_prompt">Due Date:</span>
                <input className= "item_input" type = "date" id="item_due_date_textfield"/></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_completed_prompt" >Status:</span>
                    <Switch offLabel="Incomplete" onLabel="Complete" /> 
                </div>
                <div id="submitOrCancelDiv">
                    <button className= "submit_button" onClick = {(e)=>this.submitItem()}>Submit</button>
                    <button className= "cancel_button" onClick = {(e)=>this.props.loadList(this.props.todoList)}>Cancel</button>
                    </div>
            </div>// make these buttons nicer
        )
    }
}
