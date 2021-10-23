import React , {useContext,useEffect} from 'react'
import { yourNote } from "../App";
import Noteitem from './Noteitem';

export const Note = () => {
    const context = useContext(yourNote);
    let {notes,getNotes}= context;
    useEffect(() => {
        getNotes()        
        //eslint-disable-next-line 
    console.log("test 1")
    }, [])
    
  return( <div className="row mx-3">
      <h2>
          Notes Fetched :
              </h2>
        {notes.map((note)=>{return(<Noteitem note={note} key={note._id} />)
        //eslint-disable-next-line 
    })}      
  </div> )
 
       
}
