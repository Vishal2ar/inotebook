import React from 'react'


function Noteitem(props) {
    const { note, setnotes } = props;
    return (
        <div className="containter col-md-3 my-3">
            <div className ="card " >
                
                <div className ="card-body">
                <h5 className ="card-title">{note.topic}</h5>
                <p className ="card-text">{note.discription}</p>
               
                </div>
            </div>
            
        </div>
    )
}

export default Noteitem

