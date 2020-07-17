import React from "react";

function PickProject({projects, toggleProjectFilter}) {
    return (
        <div>
            <label>Filter By Project:</label>
            <select id="projects" onChange={toggleProjectFilter.bind(this)}>
                {projects.map((project) => (
                    <option value={project.id} key={project.id}> 
                        {project.name} 
                    </option>
                ))}
            </select>
            
        </div>
    );
};

export default PickProject;