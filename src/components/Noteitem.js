import React ,{useContext} from 'react'
import { yourNote } from '../App';



function Noteitem(props) {
    const context = useContext(yourNote)
    const {noteDel} = context;

    const {note} = props;
    return (
        <div className="containter col-md-3 my-3">
            <div className ="card " >
                
                <div className ="card-body">
                <h5 className ="card-title">{note.topic}</h5>
                <p className ="card-text">{note.discription}</p>
                <i class="fas fa-trash-alt mx-3"  onClick={() => {noteDel(note._id)}} ></i>
                <i class="far fa-edit mx-3"></i>
                </div>
            </div>
            
        </div>
    )
}

export default Noteitem

