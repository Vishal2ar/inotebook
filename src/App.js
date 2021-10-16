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
export const yourNote =React.createContext();



function App() {
// note sample 
let n1 = [{
  "_id": "616597038239afae52298d35",
  "userid": "615f50194d7a841796947361",
  "topic": "Apple",
  "discription": "Time to eat",
  "tag": "private",
  "date": "2021-10-12T14:09:07.459Z",
  "__v": 0
},
{
  "_id": "616597038239afae52298d35",
  "userid": "615f50194d7a841796947361",
  "topic": "Apple",
  "discription": "Time to eat",
  "tag": "private",
  "date": "2021-10-12T14:09:07.459Z",
  "__v": 0
},
{
  "_id": "616597038239afae52298d35",
  "userid": "615f50194d7a841796947361",
  "topic": "Apple",
  "discription": "Time to eat",
  "tag": "private",
  "date": "2021-10-12T14:09:07.459Z",
  "__v": 0
}
];

const [notes, setnotes] = useState(n1);


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
    <yourNote.Provider value ={{notes,setnotes}} >
    <Note.Provider value= {{state,updateState}}> 
     <Router>
       <div>
        <Navbar />
        <div className="contAINER">
        <Switch>
        <Route exact path="/">
            <Home />
         </Route>

          <Route  exact path="/about">
          <About />
          </Route>          
        </Switch>
        </div>
         </div>
          </Router>
          </Note.Provider> 
          </yourNote.Provider>
         
    </>
  );
}

export default App;
