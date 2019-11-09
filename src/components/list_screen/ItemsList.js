import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        const newItemID = todoList.items.length;
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
                        <ItemCard todoList={todoList} item={item} new ={false}/>
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