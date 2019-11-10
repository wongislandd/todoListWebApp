import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';

class TodoListLinks extends React.Component {
    reorderByAccessDate(todoLists){
        for (var i=0;i<todoLists.length;i++){
            if (todoLists.lastAccessed != null){
                continue;
            }
            else{
                todoLists.lastAccessed = "";
            }
        }
        todoLists.sort(function(item1,item2){
            if (item1.lastAccessed > item2.lastAccessed){
                return -1;
            }
            if (item1.lastAccessed < item2.lastAccessed){
                return 1;
            }
            else{
                return 0;
            }
        });
    }
    render() {
        const todoLists = this.props.todoLists;
        if (todoLists !== undefined){
            this.reorderByAccessDate(todoLists);
        }
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);