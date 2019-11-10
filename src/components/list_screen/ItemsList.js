import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { Link } from 'react-router-dom';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemsList extends React.Component {
    // Refreshes keys and updates the firestore
    refreshKeys(todoList){
        const items = todoList.items;
        for (var i=0;i<items.length;i++){
            items[i].key = i;
        }
        var firestore = getFirestore();
        firestore.collection("todoLists").doc(todoList.id).update({
            items : items
        });

    }
    moveUp(id, todoList){
        if (id == 0){
            console.log("Cannot move up the first element");
            return;
        }
        var items = todoList.items;
        var placeholder = items[id-1];
        items[id-1] = items[id];
        items[id] = placeholder;
        this.refreshKeys(todoList);
    }
    moveDown(id, todoList){
        var items = todoList.items;
        if (id == items.length-1){
            console.log("Cannot move down the last element");
            return;
        }
        var placeholder = items[id+1];
        items[id+1] = items[id];
        items[id] = placeholder;
        this.refreshKeys(todoList);
    }
    deleteItem(id, todoList){
        todoList.items.splice(id,1);
        this.refreshKeys(todoList);
    }
    render() {
        console.log("ItemList render called");
        var todoList = this.props.todoList;
        var refreshKeys = this.refreshKeys;
        var moveUp = this.moveUp;
        var moveDown = this.moveDown;
        var deleteItem = this.deleteItem;
        var items = todoList.items;
        var newItemID = todoList.items.length;
        console.log(newItemID);
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className="card-headers">
                    <div className ="description-header">Task</div>
                    <div className = "due_date-header">Due Date</div>
                    <div className ="status-header">Status</div>
                </div>
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} new ={false} refreshKeys = {refreshKeys} 
                        moveUp = {moveUp} moveDown = {moveDown} deleteItem = {deleteItem}/>
                    );})
                }
                <Link to={{
                pathname: '/todoList/'+ this.props.todoList.id + "/todoListItem/" + newItemID,
                state: {
                    todoList : todoList, 
                    todoItem : {description: "", assigned_to: "", due_date: "", completed: false},
                    newCard : true,
                }
                }} key={newItemID}>
                <div className="addACardDiv"><button className="addACardBtn">Add a Card</button></div>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);