import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditProject from './EditProject';

function Projectitem (props) {
    const getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            boarderBottom: '1px #ccc dotted',
        }
    }

    const { id, name } = props.project 

    const [showEditor, setEditor] = useState(false); 
    //on true, text box appears, on false no textbox

    const toggleTextEditor = () => {
        setEditor(
          !showEditor
        );
    };

    return (
        <div style={getStyle()} id={`projectitem-${id}`} className='projectitem'>
            <div>
                {name}
                <button onClick={props.delProject.bind(this, id)} style={btnStyle} className="delete-btn">x</button>
                <button onClick={toggleTextEditor} style={btnStyle2}>Edit Project</button>
                {showEditor && <EditProject editProject={props.editProject} id={id} oldName={name} toggleTextEditor={toggleTextEditor}/>}
            </div>
        </div>
    ) 
}


Projectitem.propTypes = {
    project: PropTypes.object.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

const btnStyle2 = {
    background: '#555555',
    color: '#fff',
    padding: '2px 3px',
    cursor: 'pointer',
    float: 'right',
    marginRight: '10px'
}

export default Projectitem
