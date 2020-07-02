import React from 'react';
import { useState } from 'react';

function EditTodo (props) {

    const {
        editTodo,
        id,
        oldTitle
    } = props;

    const [newTitle, setNewTitle] = useState(oldTitle);

    const onChange = (e) => {
        //e.persist();
        //console.log(e);
        //console.log(e.target.value);
        setNewTitle(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editTodo(id, newTitle);
        setNewTitle('');
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Set New Title"
                value={newTitle}
                onChange={(e) => onChange(e)}
            />
            <input
                type="submit"
                value="Change"
                className="btn"
            />
        </form>
    )

}

export default EditTodo;