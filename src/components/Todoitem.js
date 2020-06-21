import React, { Component } from 'react';
import PropTypes from 'prop-types';

export function Todoitem (props) {
    const getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            boarderBottom: '1px #ccc dotted',
            textDecoration: props.todo.completed ? 'line-through' : 'none'
        }
    }
    const { id, title } = props.todo 
    return (
        <div style={getStyle()} id={ `todoitem-${id}`  } className='todoitem' >
            <p>
                <input type="checkbox" onChange={props.markComplete.bind(this, id )}/> {' '}
                {title}
                <button onClick={props.delTodo.bind(this, id)} style={btnStyle}>x</button>
            </p>
        </div>
    )
}

export class Todoitem2 extends Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            boarderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'

        }
    }

    markComplete = (e) => {

    }

    render() {
        const {id, title } = this.props.todo 
        return (
            <div style={this.getStyle()} >
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id )}/> {' '}
                    {title}
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                </p>
            </div>
        )
    }
}

Todoitem.propTypes = {
    todo: PropTypes.object.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default Todoitem
