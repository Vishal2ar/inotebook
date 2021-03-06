import React, {useState,useContext} from 'react'
import { useHistory } from 'react-router-dom';
import { yourNote } from '../App';

function Signup() {
    const [signUp, setsignUp] = useState({email:"",name:"",password:"",cpassword:""})
     let history = useHistory();
    const alertFunction =  useContext(yourNote)
    const {shootAlert} = alertFunction;
    const onChange = (e) => {
        setsignUp({...signUp,[e.target.name]: e.target.value});
        
    }
    const handleSubmit = async (s) =>{
        s.preventDefault();
      //  console.log(signUp);
        const {email,name,password,cpassword} = signUp;
        try {
            if(password===cpassword)
            {
                let res = await fetch("http://localhost:3001/api/auth/createUser",
                                        {   
                                            method:"POST",
                                            headers:{"Content-Type": "application/json"},
                                            body : JSON.stringify({email,name,password})
                                        });
                let status = await res.json();
                console.log(status);
                if(status.success){
                    localStorage.setItem('token',status.token);
                    shootAlert("success","Signup Success");
                    history.push("/");
                }
                else{
                    shootAlert("warning","Signup failed");
                }
                
            }
            else{
                   
                   shootAlert("warning","Password Do not Match");
            }
            
        } catch (error) {
            console.log(error);
            shootAlert("warning","Signup failed");
        }
    }
    return (
        <div>
            <div className="container my-5 ">
                <h3>Sign Up to INOTEBOOK</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name ="email" 
                      onChange={onChange} required    />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name ="name" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor ="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">ReType Password</label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
