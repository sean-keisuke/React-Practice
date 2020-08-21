import React from 'react';
import { useState } from 'react';

function EditTodo (props) {

    const {
        editTodo,
        id,
        oldTitle,
        toggleTextEditor
    } = props;

    const [newTitle, setNewTitle] = useState(oldTitle);
    

    const onChange = (e) => {
        setNewTitle(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editTodo(id, newTitle);
        setNewTitle('');
        toggleTextEditor();
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