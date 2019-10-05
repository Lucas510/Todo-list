import React from 'react';
import PropType from'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class TaskListOld extends React.Component {

	state = {
		count: 0,
		value: null,
		people: []
	}
 componentDidMount() {
 	console.log('componentDidMount');
	//axios.get('https://swapi.co/api/people')
  axios.get('ws/rest/tasks')
	.then(res => {
		console.log('dentro del then');
		console.log(res);
		this.setState({ people: res.data });
	});
	console.log('fuera del then -> $(this.state.people}');
 }

 catch(err) {
		console.log(err);
 };

// handleChange = (event, newValue) => {
// 	console.log(newValue);
// 	this.setState({ value: newValue });
// 
 //myFunction = () => {
 //	console.log('myFunction');
 //	window.location.hash = '#text';
 //	window.location.reload();
// }	

//Para que imprima feo <div>{JSON.stringify(people)}</div>  
  // Aqui haremos que se imprima de forma linda y estetica
  //   <> 
  //     <List>
  //     { people.map(p => {
  //       console.log(p);
  //       return (
  //         <ListItem key={p.name}>
  //         <ListItemText
  //         primary={p.name}
  //         secondary={p.gender}
  //         />
  //      </ListItem>
  //        </List>
  //      )}
  //    })
  //   </>

render() {
  console.log('render');
  // const { classes } = this.props; // this.props.classes
  const { people } = this.state; //this.state.people
  console.log(people);
  return(
  	 
    <> 
      <List>
      { people.map(p => {
        console.log(p);
        return (
          <ListItem key={p.name}>
            <ListItemText
            primary={p.name}
            secondary={p.type.description}
            />
          </ListItem> 
        )
        })
      }
      </List>
    </>
   );
  }
}

export default TaskListOld;