import React from 'react';

function HideTodo (props) {
    return (
        <div>
            <input 
                type="checkbox" 
                onChange={props.toggleHide}
                className="toggle-hide"
            /> Hide Completed Todos?
        </div> 
    )
}

export default HideTodo;