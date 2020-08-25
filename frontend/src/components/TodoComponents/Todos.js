import React from 'react';
import Todoitem from './Todoitem';
import PropTypes from 'prop-types';

function Todos ({ todos, markComplete, editTodo, delTodo, hide, searchTitle, projectFilter, IdtoFilter, projects }) {
    return todos.filter((todo) => {
        return (
            (!hide || todo.completed === false) 
            && todo.title.toLowerCase().includes(searchTitle.toLowerCase())
            && (!projectFilter || todo.project === IdtoFilter)
        )
    }).map(
        (todo) => (
            <Todoitem 
                key={todo.id} 
                todo={todo} 
                markComplete={markComplete} 
                editTodo={editTodo}
                delTodo={delTodo} 
                projects={projects}
            />    
        )
    );
}


// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

export default Todos;
