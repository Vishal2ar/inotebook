import React,{useContext} from "react";
import {Note} from "../App"

const  About = () => {
    const a  = useContext(Note);
    //
    return(<div>  {a.name}
        </div>)
}

export default About