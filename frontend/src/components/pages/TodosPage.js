import React, { useState, useEffect } from 'react';
import Todos from '../Todos';
import AddTodo from '../AddTodo';
import ClearTodo from '../ClearTodo';
import HideTodo from '../HideTodo';
import Spinner from '../Spinner';
import SearchTodo from '../SearchTodo';

export default function TodosPage() {
    const url = "/api/v1/todos/";
    const [todos, setTodos] = useState([]); 

    //LOADERS
    const [load, setLoad] = useState(true);

    const hideLoader = () => {
        setLoad(false);
    }
    
    const showLoader = () => {
        setLoad(true);
    }

    //GET request
    async function getDefault ()
    { 
        let response = await fetch(url);
        let data = await response.json()
        return data;
    }

    //POST request
    async function postDefault(newTodo)
    {
        let response = await fetch(url, {
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

    //PUT request
    async function putDefault(updateTodo, id) {
        let response = await fetch(url+id+"/", {
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

    //DELETE request
    async function deleteDefault(id) {
        let response = await fetch(url+id+"/", {
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
                const data = await getDefault();
                setTodos(data);
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
    const markComplete = (id) => {
        //create json object for put and call put method
        const update = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
                putDefault(todo, id)
            }
            return todo;
        })
        //console.log(update);
        setTodos(update);
    };

    //find todo by id, DELETE 
    const delTodo = async(id) => {
        //call delete here
        setTodos(
            [...todos.filter(
                (todo) => todo.id !== id)
            ]
        );
        await deleteDefault(id);
    }

    //clear the whole list
    const clearTodo = async () => {
        setTodos(
            []
        );
        //clear the database
        for(let i = 0; i < todos.length; i++)
        {
            await deleteDefault(todos[i].id);
        }
    }

    //add a singular todo, post it onto backend
    const addTodo = async (title) => {
        const myNewTodo = {
            title,
            completed: false
        }
        const newTodo = await postDefault(myNewTodo); 
        setTodos(
            [newTodo, ...todos]
        );
    }

    //find a todo by id, edit the name and PUT
    const editTodo = (id, newTitle) => {
        const update = todos.map(todo => {
            if (todo.id === id) {
                todo.title = newTitle
                putDefault(todo, id)
            }
            return todo;
        });
        setTodos(update);
    };

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

    return (
        <React.Fragment>
            {load && <Spinner/>}
            {!load && <div>
            <AddTodo addTodo={addTodo} />
            <HideTodo toggleHide={toggleHide} />
            <ClearTodo clearTodo={clearTodo} />
            <Todos
                todos={todos}
                markComplete={markComplete}
                editTodo={editTodo}
                delTodo={delTodo} 
                hide={hide}
                searchTitle = {searchTitle}
            />
            <SearchTodo 
                getSearchResults={getSearchResults}
            />
            </div>}
        </React.Fragment>
    )
}