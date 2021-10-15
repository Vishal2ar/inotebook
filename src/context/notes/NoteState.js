import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const state = { "name" : "vihal", "class" : "Test"}
return(
    <NoteContext.Provider value={state} >
        {props.childern}
    </NoteContext.Provider>
)

}

export default NoteState;