import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditTodo from './EditTodo';



function Todoitem (props) {
    const getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            boarderBottom: '1px #ccc dotted',
            textDecoration: props.todo.completed ? 'line-through' : 'none'
        }
    }

    const { id, title, completed } = props.todo 
    
    const [showEditor, setEditor] = useState(false); 
    //on true, text box appears, on false no textbox

    const toggleTextEditor = () => {
        setEditor(
          !showEditor
        );
    };

    return (
        <div style={getStyle()} id={`todoitem-${id}`} className='todoitem'>
            <div>
                <input 
                    type="checkbox" 
                    checked={completed}
                    onChange={props.markComplete.bind(this, id )}
                /> {' '}
                {title}
                <button onClick={props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                <button onClick={toggleTextEditor} style={btnStyle2}>Edit Todo</button>
                {showEditor && <EditTodo editTodo={props.editTodo} id={id} oldTitle={title}/>}
            </div>
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
