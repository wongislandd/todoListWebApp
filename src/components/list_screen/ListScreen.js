import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ListScreen extends Component {
    todoList = this.props.todoList;
    state = {
        name: this.todoList.name,
        owner: this.todoList.owner,
    }
    handleChange = (e) => {
        const { target } = e;
        const todoList = this.props.todoList;
        // Name or owner change.
        const firestore = getFirestore();
        if (target.id === "name"){
            todoList.name = target.value;
            firestore.collection("todoLists").doc(todoList.id).update({
                name : target.value,
            });
        }else{
            todoList.owner = target.value;
            firestore.collection("todoLists").doc(todoList.id).update({
                owner : target.value,
            });
        }
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));    
    }
    moveToTop(){
        const firestore = getFirestore();
    }
    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        // When loaded, move this to the top of the home screen list
        this.moveToTop();
        return (
            <div className="container">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">Name
                    <label htmlFor="email"></label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">Owner
                    <label htmlFor="password"></label> 
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

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
)(ListScreen);