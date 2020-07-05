import React, { useState } from 'react';


function SearchTodo (props) {
    const [title, setTitle] = useState('');

    const onChange = (e) => {
        //e.persist();
        //console.log(e);
        //console.log(e.target.value);
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
            <input 
                type="checkbox"
                onChange={props.toggleSearch}
            /> Search for Keywords?
        </div> 
    )
}

const inputStyle = {
    width: '100%',
    float: 'right',
    boxSizing: 'border-box'
}

export default SearchTodo;