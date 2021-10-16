import React from "react";
import AddNote from "./AddNote";
import { Note } from "./Note";


const Home = () => {
  
    return(<div> 
        <div className="container my-5">
            <h2>New Note</h2>
           <AddNote />
        </div>
        <div className="container my-3">
        <h2>Your Notes</h2>
        <Note />
        </div>
         </div>)
}
export default Home