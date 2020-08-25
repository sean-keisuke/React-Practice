import React from 'react';

function ClearProjects (props) {

    const {
        clearProjects
    } = props;

    const onClick = (e) => {
        e.preventDefault();
        clearProjects();
    }

    return (
        <button onClick={onClick}  style={btnStyle}>Clear Projects</button>
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

export default ClearProjects;