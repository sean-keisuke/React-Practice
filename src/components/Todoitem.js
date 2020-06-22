import React from 'react';
import PropTypes from 'prop-types';


export function Todoitem (props) {
    const getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            boarderBottom: '1px #ccc dotted',
            textDecoration: props.todo.completed ? 'line-through' : 'none'
        }
    }

    const { id, title } = props.todo 
    
    const newTitle = 'test' //make this a function call to an editor of some sort
    

    return (
        <div style={getStyle()} id={`todoitem-${id}`} className='todoitem'>
            <p>
                <input type="checkbox" onChange={props.markComplete.bind(this, id )}/> {' '}
                {title}
                <button onClick={props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                <button onClick={props.editTodo.bind(this, id, newTitle)}  style={btnStyle2}>Edit Item</button>
            </p>
        </div>
    ) 
}


Todoitem.propTypes = {
    todo: PropTypes.object.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

const btnStyle2 = {
    background: '#555555',
    color: '#fff',
    padding: '2px 3px',
    cursor: 'pointer',
    float: 'right',
    marginRight: '10px'
}

export default Todoitem
