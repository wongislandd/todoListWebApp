import React, { Component } from 'react'
import { getFirestore } from 'redux-firestore';

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
            <div id="item_form_container">
                
            </div>// make these buttons nicer
        )
    }
}
