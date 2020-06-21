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
        <button onClick={onClick}  style={btnStyle}>Clear List</button>
    )
   
}

const btnStyle = {
    background: '#ff6666',
    color: '#fff',
    border: 'none',
    padding: '3px 6px',
    cursor: 'pointer',
    width: '100%',
    float: 'center'
}

export default ClearTodo;