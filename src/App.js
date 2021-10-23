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
let n1 =[{}]; // needed as the data will be loaded via api after 1st go it will fail without it 
const [notes, setnotes] = useState(n1);



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
    //let data = await res.json();
    // app login 
    //console.log(data);
    } catch (error) {
      console.log(error)
    }
    
    let newNote = [{
      "_id": "616597038239afae52298d35",
      "userid": "615f50194d7a841796947361",
      "topic": topic,
      "discription": discription,
      "tag": tag,
      "date": "2021-10-12T14:09:07.459Z",
      "__v": 0
    }];
    setnotes(notes.concat(newNote));
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
    <yourNote.Provider value ={{notes,AddNote1,noteDel,getNotes}} >
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
