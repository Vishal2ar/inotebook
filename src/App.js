import React,{useState} from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


export const Note = React.createContext();



function App() {
  const s1 = { "name" : "vihal", "class" : "Test"};
const [state, setstate] = useState(s1)
const updateState = () => {
setTimeout(() => {
  setstate(
    { "name" : "Rahul", "class" : "Test"}
  )
  
}, 10000);

}
  
  return (
    <> 
    
    <Note.Provider value= {{state,updateState}}> 
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
