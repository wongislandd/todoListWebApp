import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        console.table(item);
        return (
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
        );
    }
}
export default ItemCard;