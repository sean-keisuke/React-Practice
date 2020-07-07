import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import Todos from '../Todos';
import AddTodo from '../AddTodo';
import ClearTodo from '../ClearTodo';
import HideTodo from '../HideTodo';
import Spinner from '../Spinner';
import SearchTodo from '../SearchTodo';

export default function TodosPage() {
    const url = "/api/v1/todos/";
    const [todos, setTodos] = useState([]);
    const [load, setLoad] = useState(true);

    const hideLoader = () => {
        setLoad(false);
    }
    
    const showLoader = () => {
        setLoad(true);
    }

    async function getDefault ()
    { 
        let response = await fetch(url);
        let data = await response.json()
        return data;
    }

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

    async function putDefault(updateTodo) {
        let response = await fetch(url, {
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
    

    const markComplete = (id) => {
        //create json object for put and call put method
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        );
    };

    const delTodo = (id) => {
        //call delete here
        setTodos(
            [...todos.filter(
                (todo) => todo.id !== id)
            ]
        );
    }

    const clearTodo = () => {
        setTodos(
            []
        );
    }

    const addTodo = (title) => {
        const newTodo = {
            id: uuid(),
            title,
            completed: false
        }

        postDefault(newTodo);
        
        setTodos(
            [newTodo, ...todos]
        );
    }

    const editTodo = (id, newTitle) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.title = newTitle
                }
                return todo;
            })
        );
    };

    const [hide, setHide] = useState(false); 

    const toggleHide = () => {
        setHide(
          !hide
        );
    };

    const [search, setSearch] = useState(false);

    const toggleSearch = () => {
        setSearch(
            !search
        );
    }

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
                search={search}
                searchTitle = {searchTitle}
            />
            <SearchTodo 
                toggleSearch={toggleSearch}
                getSearchResults={getSearchResults}
            />
            </div>}
        </React.Fragment>
    )
}