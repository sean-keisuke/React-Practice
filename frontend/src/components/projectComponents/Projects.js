import React from 'react';
import Projectitem from './Projectitem';
import PropTypes from 'prop-types';

function Projects ({ projects, editProject, delProject, searchName}) {
    return projects.filter((project) => {
        return (project.name.toLowerCase().includes(searchName.toLowerCase()))
    }).map(
        (project) => (
            <Projectitem 
                key={project.id} 
                project={project} 
                editProject={editProject}
                delProject={delProject} 
            />    
        )
    );
}


// PropTypes
Projects.propTypes = {
    projects: PropTypes.array.isRequired,
    delProject: PropTypes.func.isRequired
}

export default Projects;
