import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


class TaskForm extends React.Component {

    state = {
        task: {}
    }
    // 
    componentDidMount() {
        const { match } = this.props;
        if (match.params.taskid) {
            axios.get(`/ws/rest/tasks/${match.params.taskid}`)
            .then((rsp) => {
                this.setState({ task: rsp.data }); 
            });
        }
    }
    // funcion que actualiza los atributos de la varibale task dentro del state
    handleChange = field => (e) => {
        console.log('handleChange');
        console.log(field);
        // e.target.value => tiene el valor de lo que escriben
        switch(field) {
            case 'name':
                let updateTask = {};
                updateTask.name = e.target.value;
                updateTask.description = this.state.task.description;
                this.setState({ task: updateTask });
            break;
            // case 'description':
            //     let updateTask = {};
            //     updateTask.name = e.target.value
            //     updateTask.description = this.state.task.description;
            //     this.setState({ task: updateTask });
            default:
                    this.setState({ task: {...this.state.task, [field]: e.target.value } });
            break;
        }
    }
    // Metodo el cual se ejecuta al hacer click en Save
    handleSubmit = () => {
        const { match, history } = this.props;
        // Si es una edicion, se le llama al metodo put, si no lo es se le llama al metodo post
        if (match.params.taskid) {
            axios.put(`/ws/rest/tasks/${match.params.taskid}`, this.state.task)
            .then((rsp) => {
                this.setState({ task: rsp.data }); 
                alert('Done Correctly!');
                //history.push('/tasks');
            })
            .catch(err => {
                console.log('Error');
                console.log(err);
                
            });
        } else  {
            axios.post(`/ws/rest/tasks/`, this.state.task)
            .then((rsp) => {
                this.setState({ task: rsp.data }); 
                alert('Done Correctly!');
                //history.push('/tasks');
            })
            .catch(err => {
                console.log('Error');
                console.log(err);
            });
        }
    }



    render() {
        const { match } = this.props;
        const { task } = this.state;

        return (
            <>
                <h2>{ match.params.taskId ? 'Edit Form' : 'New Form' } </h2>
            
                <TextField
                    id="standard-name"
                    label="Name"
                    value={task.name || ''}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />

                <TextField
                    id="standard-description"
                    label="Description"
                    value={task.description || ''}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />

                {/*Select */}
                {/*Date Picker*/}

                <br>
                </br>
                <Button variant="contained" component={Link} to={'/tasks'}> 
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                     Save
                </Button>            

            </>
        )
    }
}

export default TaskForm;