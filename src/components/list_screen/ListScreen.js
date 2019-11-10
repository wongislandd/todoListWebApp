import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ListScreen extends Component {
    constructor(props){
        super(props);
        this.markAsMostRecent();
    }
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
    /* Causes constant switching, won't work
    moveToTop(){
        const firestore = getFirestore();
        firestore.collection("todoLists").limit(1).get()
        .then(snapshot => {
            // It'll only be the first one
            snapshot.forEach(doc => {
                this.switchWithTop(doc.id, doc.data());
              });
        });
    }
    switchWithTop(topID, topsContents){
        const firestore = getFirestore();
        var todoList = this.props.todoList;
        firestore.collection("todoLists").doc(topID).set({
            name : todoList.name,
            owner : todoList.owner,
            items: todoList.items
        })
        firestore.collection("todoLists").doc(todoList.id).set({
            name : topsContents.name,
            owner : topsContents.owner,
            items: topsContents.items,
        })
    }*/
    markAsMostRecent(){
        const firestore = getFirestore();
        var todoList = this.props.todoList;
        firestore.collection("todoLists").doc(todoList.id).update({
            lastAccessed : new Date().toISOString()
        })
        // Sorted it by most recent, but how do I load it by most recent?
        firestore.collection("todoLists").orderBy('lastAccessed');
    }
    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        // When loaded, move this to the top of the home screen list
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