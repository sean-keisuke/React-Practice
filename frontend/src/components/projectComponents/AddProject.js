import React from 'react';
import { useState } from 'react';

/**
 * @param {Object} props
 * @param {(title: string) => undefined } props.addProjects
 */
function AddProject (props) {
    const [title, setTitle] = useState('');
    const {
        addProjects,
    } = props;

    const onChange = (e) => {

        setTitle(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        //console.log(project)
        addProjects(title);
        setTitle('');
    }
    return (
        <form onSubmit={onSubmit} style={{ display: 'flex' }}>
            <input
                type="text"
                style={{ flex: '20', padding: '10px' }}
                placeholder="Add Project..."
                value={title}
                className="add-project"
                onChange={(e) => onChange(e)}
            />
            <input
                type="submit"
                value="Submit"
                className="btn"
                style={{ flex: '1' }}
            />
        </form>
    )

}
export default AddProject;