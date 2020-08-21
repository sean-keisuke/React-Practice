import React from 'react';
import { useState } from 'react';

function EditProject (props) {

    const {
        editProject,
        id,
        oldName,
        toggleTextEditor
    } = props;

    const [newName, setNewName] = useState(oldName);
    

    const onChange = (e) => {
        setNewName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editProject(id, newName);
        setNewName('');
        toggleTextEditor();
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Set New Name"
                value={newName}
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

export default EditProject;