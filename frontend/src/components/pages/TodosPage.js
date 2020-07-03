import React, { useState } from 'react';
import uuid from 'react-uuid';
import Todos from '../Todos';
import AddTodo from '../AddTodo';
import ClearTodo from '../ClearTodo';
import HideTodo from '../HideTodo'

export default function TodosPage() {

    let defaultTodos = [
        {
            id: uuid(),
            title: 'Take out the trash',
            completed: false
        },
        {
            id: uuid(),
            title: 'Take out the dishes',
            completed: false
        },
        {
            id: uuid(),
            title: 'Take me out, trash',
            completed: false
        }
    ]

    const [todos, setTodos] = useState(defaultTodos);

    const markComplete = (id) => {
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
    
    console.log(hide);

    return (
        <React.Fragment>
            <AddTodo addTodo={addTodo} />
            <HideTodo toggleHide={toggleHide} />
            <ClearTodo clearTodo={clearTodo} />
            <Todos
                todos={todos}
                markComplete={markComplete}
                editTodo={editTodo}
                delTodo={delTodo} 
                hide={hide}/>
        </React.Fragment>
    )
}