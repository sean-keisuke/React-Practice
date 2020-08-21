import React from 'react';
import { useState } from 'react';

/**
 * @param {Object} props
 * @param {(title: string) => undefined } props.addTodo 
 */
function AddTodo (props) {
    
    //hooks
    const [title, setTitle] = useState('');
    const [project, setProject] = useState(1);

    const {
        addTodo,
        projects
    } = props;

    const onChange = (e) => {
        //e.persist();
        //console.log(e);
        //console.log(e.target.value);
        setTitle(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        //console.log(project)
        addTodo(title, project);
        setTitle('');
    }
    
    const changeProject = (e) => {
        //console.log(e)
        setProject(e)
    }

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex' }}>
            <input
                type="text"
                style={{ flex: '20', padding: '10px' }}
                placeholder="Add Todo..."
                value={title}
                className="add-todo"
                onChange={(e) => onChange(e)}
            />
            <div style={{ padding:'10px' }}>
                <label>Choose Project: </label>
                <select id="add-to-projects" onChange={(e) => changeProject(e.target.value)}>
                    {projects.map((project) => (
                        <option value={project.id} key={project.id}> 
                            {project.name} 
                        </option>
                    ))}
                </select>
            </div>
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