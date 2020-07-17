import React, { useState, useEffect } from 'react';
import Todos from '../Todos';
import AddTodo from '../AddTodo';
import ClearTodo from '../ClearTodo';
import HideTodo from '../HideTodo';
import Spinner from '../Spinner';
import SearchTodo from '../SearchTodo';
import PickProject from '../PickProject';

export default function TodosPage() {
    const todoUrl = "/api/v1/todos/";
    const [todos, setTodos] = useState([]); //list of todos
    
    const projectUrl = "/api/v1/projects/" //PICK PROJECT
    const [projects, setProjects] = useState([]); //list of projects

    //LOADERS
    const [load, setLoad] = useState(true);

    const hideLoader = () => {
        setLoad(false);
    }
    
    const showLoader = () => {
        setLoad(true);
    }

    //GET request TODO
    async function getTodos ()
    { 
        let response = await fetch(todoUrl);
        let data = await response.json()
        return data;
    }

    async function getProjects () // PICK PROJECT
    {
        let response = await fetch(projectUrl);
        let data = await response.json()
        return data;
    }

    //POST request TODO
    async function postTodos(newTodo)
    {
        let response = await fetch(todoUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newTodo)
        });
        console.log(response.status)  
        let data = await response.json()
        return data;
    }

    //PUT request TODO
    async function putTodos(updateTodo, id) {
        let response = await fetch(todoUrl+id+"/", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(updateTodo)
        });
        console.log(response.status)  
        let data = await response.json()
        return data;
    }

    //DELETE request TODO
    async function deleteTodos(id) {
        let response = await fetch(todoUrl+id+"/", {
            method: 'DELETE',
        });
        console.log(response.status)  
    }

    //GET json objects
    useEffect(() => {
        async function loadData() {
            // Update the document title using the browser API
            showLoader();
            try {
                const todoData = await getTodos();
                setTodos(todoData);
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
    
    //find todo by id, change complete state, then PUT
    const markComplete = async (id) => {
        //create json object for put and call put method
        let uTodo = null;
        const update = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
                uTodo = todo;
            }
            return todo;
        })
        //console.log(update);
        setTodos(update);
        await putTodos(uTodo, uTodo.id)
    };

    //find todo by id, DELETE 
    const delTodo = async(id) => {
        //call delete here
        setTodos(
            [...todos.filter(
                (todo) => todo.id !== id)
            ]
        );
        await deleteTodos(id);
    }

    //clear the whole list
    const clearTodo = async () => {
        setTodos(
            []
        );
        //clear the database
        for(let i = 0; i < todos.length; i++)
        {
            await deleteTodos(todos[i].id);
        }
    }

    //add a singular todo, post it onto backend
    const addTodo = async (title, project) => {
        //console.log(project)
        const myNewTodo = {
            title,
            completed: false,
            project: project
        }
        const newTodo = await postTodos(myNewTodo); 
        setTodos(
            [newTodo, ...todos]
        );
    }

    //find a todo by id, edit the name and PUT
    const editTodo = async (id, newTitle) => {
        let uTodo = null;
        const update = todos.map(todo => {
            if (todo.id === id) {
                todo.title = newTitle
                uTodo = todo
            }
            return todo;
        });
        setTodos(update);
        await putTodos(uTodo, uTodo.id)
    };

    const [projectFilter, setProjectFilter] = useState(false)
    const [projectId, setProjectId] = useState({})
    const toggleProjectFilter = (id) => {
        setProjectFilter(!projectFilter);
        //console.log(id)
        setProjectId(id);
    }
    


    const [hide, setHide] = useState(false); 

    const toggleHide = () => {
        setHide(
          !hide
        );
    };

    const [searchTitle, setSearchTitle] = useState('');

    const getSearchResults = (title) => {
        setSearchTitle(
            title
        );
    }

    //console.log(projects)
    return (
        <React.Fragment>
            {load && <Spinner/>}
            {!load && <div>
            <PickProject 
                projects={projects}
                toggleProjectFilter={toggleProjectFilter}
            />
            <AddTodo 
                addTodo={addTodo} 
                projects={projects}
            />
            <HideTodo toggleHide={toggleHide} />
            <ClearTodo clearTodo={clearTodo} />
            <Todos
                todos={todos}
                markComplete={markComplete}
                editTodo={editTodo}
                delTodo={delTodo} 
                hide={hide}
                searchTitle = {searchTitle}
                projectFilter = {projectFilter}
                projectId = {projectId}
                projects = {projects}
            />
            <SearchTodo 
                getSearchResults={getSearchResults}
            />
            </div>}
        </React.Fragment>
    )
}