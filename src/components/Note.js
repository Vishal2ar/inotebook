import React, { useContext, useEffect, useRef,useState } from 'react'
import { yourNote } from "../App";
import Noteitem from './Noteitem';

export const Note = () => {
    const context = useContext(yourNote);
    let { notes, getNotes,updateOneNote } = context;
    const [newNote, setnewNote] = useState({eid: "",etopic:"",ediscription:"" ,etag:""})
    useEffect(() => {
        getNotes()
        //eslint-disable-next-line 
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (n) => {
        //console.log(n);
        ref.current.click()
        setnewNote({eid: n._id,etopic:n.topic,ediscription:n.discription ,etag:n.tag})
    }
    const onChange =(e) =>{
        setnewNote({...newNote,[e.target.name]:e.target.value})
    } 
    const handleClick = () =>{
       // console.log(newNote);
        refClose.current.click()
        updateOneNote(newNote.eid,newNote.etopic,newNote.ediscription,newNote.etag);
    }
    return (

        <div className="row mx-3">

            <div className="container">


                <button ref={ref} type="button" className="btn btn-primary d none" data-bs-toggle="modal" style={{ visibility: "hidden"}} data-bs-target="#staticBackdrop" onClick={() => { console.log("Test") }}>
                    Launch static backdrop modal
                </button>


                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="etopic" className="form-label">TOPIC</label>
                                    <input type="Text" onChange={onChange} value ={newNote.etopic} className="form-control" id="etopic" name="etopic" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ediscription" className="form-label">discription</label>
                                    <input type="text" className="form-control" id="ediscription" name="ediscription" onChange={onChange} value={newNote.ediscription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={newNote.etag} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                <button disabled={newNote.etopic.length < 2 || newNote.ediscription.length < 2 }  type="button" className="btn btn-primary" onClick= {handleClick}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




            <h2>
                Notes Fetched :
            </h2>
            {notes.map((note) => {
                return (<Noteitem note={note} updateNote={updateNote} key={note._id} />)
                //eslint-disable-next-line 
            })}
        </div>)


}
