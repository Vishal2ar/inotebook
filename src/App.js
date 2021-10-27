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
import Signin from './components/Signin';
import Signup from './components/Signup';
import Alert from './components/Alert';


export const Note = React.createContext();
export const yourNote =React.createContext();



function App() {


// note sample 
let n1 =[{}]; // needed as the data will be loaded via api after 1st go it will fail without it 
const [notes, setnotes] = useState(n1);
const [alert, setalert] = useState(null);

const shootAlert = (type,message) => {
  setalert({type,message});
  setInterval(() => {
    setalert(null);
  },5000);

}



//get notes for the user 
async function getNotes() {
  let res = await fetch("http://localhost:3001/api/notes/getData",
                  {
                    method : "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmE3ODI1YjFlZjEwM2JiN2ExMjRkMiIsImlhdCI6MTYzNDM2NzUyNX0.ygs2gqGNoTWjngSPccP_PL3YHMjkl6e5_E_47IyXxCc"
                      }
                  });
  let data = await res.json();
 console.log(data)
setnotes(data);
}


// Del note with ID
  const  noteDel = async (id) => {
   // logic for backend 
   let res = await fetch(`http://localhost:3001/api/notes/deleteNote/${id}`,
   {
     method : "DELETE",
     headers: {
       "Content-Type": "application/json",
       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmE3ODI1YjFlZjEwM2JiN2ExMjRkMiIsImlhdCI6MTYzNDM2NzUyNX0.ygs2gqGNoTWjngSPccP_PL3YHMjkl6e5_E_47IyXxCc"
       }
   });
let data = await res.json();
      console.log(data);

    // Logic on User end
    console.log(id);
    setnotes(notes.filter(note => note._id !== id));
  }
// add new note 
const AddNote1 =  async (topic, discription, tag) =>{
    //api logic
    try {
    let res = await fetch("http://localhost:3001/api/notes/postData",
     {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmE3ODI1YjFlZjEwM2JiN2ExMjRkMiIsImlhdCI6MTYzNDM2NzUyNX0.ygs2gqGNoTWjngSPccP_PL3YHMjkl6e5_E_47IyXxCc"
        },
        body: JSON.stringify({ topic, discription, tag })
      });
      // eslint-disable-next-line
    let data = await res.json();
    // app login 
    //console.log(data);
    setnotes(notes.concat(data));
    } catch (error) {
      console.log(error)
    }
    
 
   
  }
// update Note 
const updateOneNote  = async (id,topic,discription,tag) =>{

try {
  //api call to update note 
  let res = await fetch(`http://localhost:3001/api/notes/updateData/${id}`,
  {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmE3ODI1YjFlZjEwM2JiN2ExMjRkMiIsImlhdCI6MTYzNDM2NzUyNX0.ygs2gqGNoTWjngSPccP_PL3YHMjkl6e5_E_47IyXxCc"
     },
     body: JSON.stringify({ topic, discription, tag })
   });
   // eslint-disable-next-line
 let data = await res.json();
 // app login 
 console.log(data);
// Update on UI 
        const element = [];
        for (let index = 0; index < notes.length; index++) {
          element[index]= notes[index];

          if (notes[index]._id === id)
            {
              element[index].topic= topic;
              element[index].discription= discription;
              element[index].tag= tag; 
            
            } 
          
        }
        //console.log(element)
       setnotes(element);

} catch (error) {
  console.log(error)
}
}

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
    <yourNote.Provider value ={{notes,AddNote1,noteDel,getNotes,updateOneNote,shootAlert}} >
    <Note.Provider value= {{state,updateState}}> 
     <Router>
       <div>
        <Navbar />
        <Alert alert={alert} />
        <div className="contAINER">
        <Switch>
        <Route exact path="/">
            <Home />
         </Route>
          <Route  exact path="/about">
          <About />
          </Route>       
          <Route  exact path="/Signin">
          <Signin />
          </Route>  
          <Route  exact path="/Signup">
          <Signup />
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
