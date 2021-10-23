import React , {useState,useContext} from 'react'
import { yourNote } from "../App";


function AddNote() {
    
    const origin = useContext(yourNote);
    const {AddNote1} = origin;
    const [newNote, setnewNote] = useState({topic:"",discription:"" ,tag:""})
    const onChange =(e) =>{
        setnewNote({...newNote,[e.target.name]:e.target.value})
    } 

    const handleClick = (e) => {
        e.preventDefault();
        AddNote1(newNote.topic,newNote.discription,newNote.tag);
            }
    
    
    return (
        <div>
             <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="topic" className="form-label">TOPIC</label>
                    <input type="Text" onChange={onChange} className="form-control" id="topic" name="topic" />
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="discription" className="form-label">discription</label>
                    <input type="text" className="form-control" id="discription"  name="discription" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag"  name="tag" onChange={onChange} />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
            </form>
        </div>
        </div>
    )
}

export default AddNote

