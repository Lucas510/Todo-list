import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
import AxiosTest from './AxiosTest'; //ejemplo con high order component with styles 

function Index() {
  return <><h2>Home 456</h2><AxiosTest/></>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
     // <div>
     //   <div className="App"> style={{ backgroundColor: 'grey' }}>
     // <header className="App-header">
     //   <img src={logo} className="App-logo" alt="logo" />
     //   </header>
     //   </div>
     //   <AxiosTest />
     // </div>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

                               
        <Route path="/" exact component={Index} /> 
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />

      </div>
    </Router>
  );
}

export default App;
