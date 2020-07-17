import React from 'react';

function HideTodo (props) {
    return (
        <div>
            <input 
                type="checkbox" 
                onChange={props.toggleHide}
            /> Hide Completed Todos?
        </div> 
    )
}

export default HideTodo;