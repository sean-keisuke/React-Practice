import React from 'react';

function ClearTodo (props) {

    const {
        clearTodo
    } = props;

    const onClick = (e) => {
        e.preventDefault();
        clearTodo();
    }
    
    return (
        <button onClick={onClick}>
            Clear List
        </button>
    )
   
}

export default ClearTodo;