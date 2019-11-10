import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Icon} from 'react-materialize'

class ItemCard extends React.Component {
    revealButtons(){
        /** HIDE ALL OTHER BUTTONS THEN REVEAL THESE */
        this.hideAllOtherButtons();
        const { item } = this.props;  
        var myMoveUpHoverBtn = document.getElementsByClassName("moveUpHoverBtn")[item.id];
        var myMoveDownHoverBtn = document.getElementsByClassName("moveDownHoverBtn")[item.id];
        var myDeleteHoverBtn = document.getElementsByClassName("deleteHoverBtn")[item.id];
        // Only change if it is not disabled. Don't even show the disabled ones.
        if(myMoveUpHoverBtn.disabled === false){
            myMoveUpHoverBtn.style.display = "block";
        }
        if(myMoveDownHoverBtn.disabled === false){
            myMoveDownHoverBtn.style.display = "block";
        }
        myDeleteHoverBtn.style.display = "block";
    }
    hideAllOtherButtons(){ 
        var MoveUpHoverBtns = document.getElementsByClassName("moveUpHoverBtn");
        var MoveDownHoverBtns = document.getElementsByClassName("moveDownHoverBtn");
        var DeleteHoverBtns = document.getElementsByClassName("deleteHoverBtn");
        for (var i=0;i<MoveUpHoverBtns.length;i++){
            MoveUpHoverBtns[i].style.display = "none";
            MoveDownHoverBtns[i].style.display = "none";
            DeleteHoverBtns[i].style.display = "none";
        }
    }
    render() {
        const { item ,todoList} = this.props;  
        return (
            <div className = "itemCard" onMouseOver={(e)=>this.revealButtons()}>
                <Link to={{
                    pathname: '/todoList/'+ this.props.todoList.id + "/todoListItem/" + item.id,
                    state: {
                        todoList : todoList, 
                        todoItem : item,
                        newCard : false,
                    }
                }} key={item.id}>
                    <div className="card z-depth-0 todo-list-link pink-lighten-3">
                        <div className="card-content grey-text text-darken-3">
                            <span className="card-description">{item.description}</span>
                            <span className="card-assignedTo">Assigned to:  {item.assigned_to}</span>
                            <span className="card-due_Date">{item.due_date}</span>
                            <div className={item.completed ? 'card-completed' : 'card-not-completed'}>
                            {item.completed ? 'Completed' : 'Pending'}
                            </div>
                        </div>
                    </div>
                </Link>
                <Button
                    className = "moveUpHoverBtn"
                    floating
                    large
                    waves="orange"
                    icon={<Icon children = "arrow_upward"/>}
                    onClick = {(e) => this.props.moveUp(item.id, todoList)}
                    disabled = {item.id === 0 ? true : false}
                />
                 <Button
                    className = "moveDownHoverBtn"
                    floating
                    large
                    waves="yellow"
                    icon={<Icon children = "arrow_downward"/>}
                    onClick = {(e) => this.props.moveDown(item.id, todoList)}
                    disabled = {item.id === todoList.items.length-1 ? true : false}
                />
                 <Button
                    className = "deleteHoverBtn"
                    floating
                    large
                    waves="red"
                    icon={<Icon children = "close" />}
                    onClick = {(e) => this.props.deleteItem(item.id, todoList)}
                />
            </div>
        );
    }
}
export default ItemCard;