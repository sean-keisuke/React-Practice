import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import ClearTodo from './components/ClearTodo';
import Header from './components/layout/header';
import About from './components/pages/About';
import uuid from 'react-uuid';



export function App () {     
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

    return (
        <Router>
            <div className="App">
                <div className="container">
                        <Header />
                        <Route exact
                            path="/"
                            render={() => (
                                <React.Fragment>
                                    <AddTodo addTodo={addTodo} />
                                    <ClearTodo clearTodo={clearTodo} />
                                    <Todos
                                        todos={todos}
                                        markComplete={markComplete}
                                        editTodo={editTodo}
                                        delTodo={delTodo} />
                                </React.Fragment>
                            )} />
                        <Route path="/about" component={About} />
                    </div>
                </div>
            </Router>
    );
}  

/*
class App2 extends Component{
    state = {
        todos: [
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
    }

    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        });
    };

    delTodo = (id) => {
        this.setState({
            todos: [...this.state.todos.filter(todo => todo.id
                !== id)]
        });
    }

    addTodo = (title) => {
        const newTodo = {
            id: uuid(),
            title,
            completed: false
        }

        this.setState({
            todos: [newTodo, ...this.state.todos]
        });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route exact
                            path="/"
                            render={props => (
                            <React.Fragment>
                                <AddTodo addTodo={this.addTodo} />
                                <Todos
                                    todos={this.state.todos}
                                    markComplete={this.markComplete}
                                    delTodo={this.delTodo}
                                />
                            </React.Fragment>
                        )} />
                        <Route path="/about" component={About} />
                    </div>
                </div>
            </Router>
        );
    }  
}
*/

export default App;
