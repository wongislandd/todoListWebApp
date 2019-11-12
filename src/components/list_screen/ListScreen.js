import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {Button, Modal} from 'react-materialize'

class ListScreen extends Component {
    constructor(props){
        super(props);
        this.markAsMostRecent();
    }
    todoList = this.props.todoList;
    state = {
        name: this.todoList.name,
        owner: this.todoList.owner,
        redirect: false,
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
    }
    handleDeleteList(){
        const firestore = getFirestore();
        var todoList = this.props.todoList;
        this.setState({
            redirect : true,
        })
        firestore.collection("todoLists").doc(todoList.id).delete();
    }
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
        if (this.state.redirect){
            return <Redirect to='/' />
        }
        // When loaded, move this to the top of the home screen list
        return (
            <div className="container">
                <div className = "list_header">
                <Modal id = "deleteModal" header="Delete List" trigger={
                    <Button className ="deleteListBtn" waves="dark" style={{marginRight: '5px'}}>
                        DELETE LIST
                    </Button>
                }
                    actions = {[<Button className = "modal-close" flat> Close </Button>, <Button flat onClick = {(e)=>this.handleDeleteList()}>Confirm</Button>]}> 
                    <p>Are you sure you want to delete {todoList.name}? </p>
                    <p><b>This action is irreversible.</b></p>
                 </Modal>
            </div>
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