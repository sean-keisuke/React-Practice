import React, { useState, useEffect } from 'react';
import AddProject from '../projectComponents/AddProject';
import Spinner from '../Spinner';
import Projects from '../projectComponents/Projects';
import SearchProject from '../projectComponents/SearchProject'
import ClearProjects from '../projectComponents/ClearProjects'


export default function ProjectsPage() {
    
    const projectUrl = "/api/v1/projects/" //PICK PROJECT
    const [projects, setProjects] = useState([]); //list of projects

    console.log(projects)
    //LOADERS
    const [load, setLoad] = useState(true);

    const hideLoader = () => {
        setLoad(false);
    }
    
    const showLoader = () => {
        setLoad(true);
    }

    async function getProjects () // PICK PROJECT
    {
        let response = await fetch(projectUrl);
        let data = await response.json()
        return data;
    }

    //POST request Project
    async function postProjects(newProject)
    {
        let response = await fetch(projectUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newProject)
        });
        console.log(response.status)  
        let data = await response.json()
        return data;
    }

    //PUT request Projects
    async function putProjects(updateProject, id) {
        let response = await fetch(projectUrl+id+"/", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(updateProject)
        });
        console.log(response.status)  
        let data = await response.json()
        return data;
    }

    //DELETE request Projects
    async function deleteProject(id) {
        let response = await fetch(projectUrl+id+"/", {
            method: 'DELETE',
        });
        console.log(response.status)  
    }

    const clearProjects = async () => {
        //clear the database
        for(let i = 0; i < projects.length; i++)
        {
            await deleteProject(projects[i].id);
        }
        setProjects(
            []
        );
        SetDefaultProjects();
    }

    //GET json objects
    useEffect(() => {
        async function loadData() {
            // Update the document title using the browser API
            showLoader();
            try {
                const projectData = await getProjects();
                setProjects(projectData);
                hideLoader();
            } catch (error) {
                hideLoader();
                console.log(error);
            }
        }
        loadData();
    },
    []);
    
    //find Project by id, DELETE 
    const delProject = async(id) => {
        //call delete here  
        setProjects(
            [...projects.filter(
                (project) => project.id !== id)
            ]
        );
        if(projects.length === 1) 
        {
            SetDefaultProjects();
        }
        await deleteProject(id)
    }
    
    //add a singular Project, post it onto backend
    const addProjects = async (name) => {
        //console.log(project)
        const myNewProject = {
            name
        }
        const newProject = await postProjects(myNewProject); 
        setProjects(
            [ ...projects, newProject]
        );
    }

    const SetDefaultProjects = async () => {
        //console.log(project)
        const myNewProject = {
            name: "Default"
        }
        const newProject = await postProjects(myNewProject); 
        setProjects(
            [newProject]
        );
    }

    //find a Project by id, edit the name and PUT
    const editProject = async (id, newName) => {
        let uProject = null;
        const update = projects.map(project => {
            if (project.id === id) {
                project.name = newName
                uProject = project
            }
            return project;
        });
        setProjects(update);
        await putProjects(uProject, uProject.id)
    };

    const [searchName, setSearchName] = useState('');

    const getSearchResults = (name) => {
        setSearchName(
            name
        );
    }

    //console.log(projects)
    return (
        <React.Fragment>
            {load && <Spinner/>}
            {!load && <div>
            <AddProject 
                addProjects={addProjects} 
            />
            <ClearProjects clearProjects={clearProjects} />
            <Projects
                projects={projects}
                editProject={editProject}
                delProject={delProject} 
                searchName = {searchName}
            />
            <SearchProject
                getSearchResults={getSearchResults}
            />
            </div>}
        </React.Fragment>
    )
}