import React from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const state = { "name" : "vihal", "class" : "Test"};
export const Note = React.createContext();

function App() {
  
  return (
    <> 
    
    <Note.Provider value= {state}> 
     <Router>
       <div>
        <Navbar />
        <Switch>
        <Route exact path="/">
            <Home />
         </Route>

          <Route  exact path="/about">
          <About />
          </Route>          
        </Switch>
         </div>
          </Router>
          </Note.Provider> 
         
    </>
  );
}

export default App;
