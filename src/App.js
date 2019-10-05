import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


//  Que pasa en el BrowserRouter? Hay dos formas de exportar
// La primera por 'default'
// export default Test;
// import Test from './test';
// La segunda
// export {
// Test,
// Test1,
// Test2,
// Test3  
//};
// import {Test as pepe, Test2, Test3 } from './test';

import logo from './logo.svg';
import './App.css';
import TaskList from './components/tasks/TaskList'; //ejemplo con high order component with styles 
import CustomSidebar from './Sidebar';
import TaskForm from './components/tasks/TaskForm';

function Index() {
  return <><h2>Welcome!!</h2>
  <h2>Daily Action Planner</h2>
  <h2>« The best way to save time is about not losing time. » That was one of the first sentence during the time management training 
  I used to lead. You cannot do anything to have more time in your life, 
  but you can do something about how you spend it.</h2>
  <h2>Everybody usually has a few tasks to achieve to reach an objective and the way you’re managing them can be a source of painful stress. 
  Let’s see if a todo-list can be a solution.</h2></>;
}

function About() {
  return <h2>About</h2>;
}

 function Tasks() {
   return <h2>Tasks<TaskList/></h2>;
 }


//https://localhost:3000/tasks/new
//https://localhost:3000/tasks/edit/xxxxx

// const { match } = this.props;
// match.params.taskId

//Crear componente tasks para mapear las rutas
//match sirve para saber si hay o no  un id en nuestra ruta
function Task ({ match }) {
   return (
     <>
       <Route exact path={`${match.path}/new`} component={TaskForm} />
       <Route
         exact
         path={`${match.path}/edit/:taskId`}
         component={TaskForm}
     />
     <Route exact path={`${match.path}/`} component={TaskList} />
     </>
   );
}

function App() {
  return (
    <div>
      {/* <div>
       <div className="App"> style={{ backgroundColor: 'grey' }}>
     <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
       </header>
       </div>
       <TaskList />
     </div>  */}
     
    <Router>
      <div>
      <header className= "App-header">
      <h1>ToDo-List</h1>
      </header> 
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/tasks/">Tasks</Link>
            </li>
          </ul>
        </nav>  */}
        <CustomSidebar/>
        <div style={{marginLeft: 250, width: 1000 }}>
                               
          <Route path="/" exact component={Index} /> 
          <Route path="/about/" component={About} />
          <Route path="/tasks/" component={Tasks} />
        </div>

      </div>
    </Router>
    </div>
  );
} 

export default App;
