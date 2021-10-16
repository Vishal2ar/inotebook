import React , {useContext} from 'react'
import { yourNote } from "../App";
import Noteitem from './Noteitem';

export const Note = () => {
    const context = useContext(yourNote);
    let {notes,setnotes}= context;
    return (
        <div className="row my-3 "> 
        {notes.map((note)=> {
            return(<Noteitem key={note._id} note={note} setnotes= {setnotes} />)
         })}
        </div>
    )
}
