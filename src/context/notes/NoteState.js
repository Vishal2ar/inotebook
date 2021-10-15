import NoteContext from "./NoteContext";

const NoteState = (props) => {
    
return(
    <NoteContext.Provider value={state} >
        {props.childern}
    </NoteContext.Provider>
)

}

export default NoteState;