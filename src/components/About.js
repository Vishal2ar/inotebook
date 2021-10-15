import React,{useContext,useEffect} from "react";
import {Note} from "../App"

const  About = () => {
    const a  = useContext(Note);
    
    useEffect(() => {
        a.updateState();
        // eslint-disable-next-line
    }, [])

    return(<div>  {a.state.name}
                    
        </div>)
}

export default About