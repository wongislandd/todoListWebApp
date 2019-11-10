import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { firestoreConnect, firebaseConnect, getFirebase } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';
import TodoListCard from './TodoListCard';


class HomeScreen extends Component {
    
    handleNewList = (e) =>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        var userID= firebase.auth().currentUser.uid;
        firestore.collection('users').doc(userID).get()
        .then(doc => 
            this.createNewList(doc.data())
        );
    }
    // Creates a new list under the name of the user.
    // God damn had to go the distance just to get the first name and last name.
    createNewList(userData){
        const firestore = getFirestore();
        var {props} = this;
        firestore.collection('todoLists').add({
            items : [],
            name : "",
            owner : userData.firstName + " " + userData.lastName,
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            props.history.push("todoList/" + docRef.id);
        });
    }
    addNotFirstAttribute(){
        
    }
    render() {
        if (!this.props.auth.uid) {
            console.log("You aren't logged in!");
            return <Redirect to="/login" />;
        }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);