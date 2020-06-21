import React from 'react';
import Todoitem from './Todoitem';
import PropTypes from 'prop-types';

function Todos ({ todos, markComplete, delTodo }) {
    console.log(todos);
    return todos.map(
        (todo) => (
            <Todoitem key={todo.id} todo={todo} markComplete={markComplete} delTodo={delTodo} />    
        )
    );
}

/*class Todos2 extends Component{
    render() {
        return this.props.todos.map((todo) => (
            <Todoitem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo} />    
        ));
    }
}*/

// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

export default Todos;
