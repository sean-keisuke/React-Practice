import React from 'react';
import { useState } from 'react';

/**
 * @param {Object} props
 * @param {(title: string) => undefined } props.addTodo 
 */
function AddTodo (props) {
    
    //hooks
    const [title, setTitle] = useState('');

    const {
        addTodo
    } = props;

    const onChange = (e) => {
        //e.persist();
        //console.log(e);
        setTitle(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addTodo(title);
        setTitle('');
    }

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex' }}>
            <input
                type="text"
                style={{ flex: '10', padding: '5px' }}
                placeholder="Add Todo ..."
                value={title}
                onChange={(e) => onChange(e)}
            />
            <input
                type="submit"
                value="Submit"
                className="btn"
                style={{ flex: '1' }}
            />
        </form>
    )

}

/*
export class AddTodo2 extends Component {
    state = {
        title: ''
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input
                    type="text"
                    name="title"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Add Todo ..."
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    style={{ flex: '1' }}

                />
            </form>
        )
    }
}
*/

export default AddTodo;