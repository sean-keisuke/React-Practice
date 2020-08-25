import React, { useState } from 'react';


function SearchTodo (props) {
    const [title, setTitle] = useState('');

    const onChange = (e) => {
        props.getSearchResults(e.target.value);
        setTitle(e.target.value);
    }

    return (
        <div style={inputStyle}>
            <input
                type="text"
                placeholder="Filter Todos..."
                value={title}
                onChange={(e) => onChange(e)}
            />
        </div> 
    )
}

const inputStyle = {
    width: '100%',
    float: 'right',
    boxSizing: 'border-box'
}

export default SearchTodo;