import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom'



function Signin() {
    
const [login, setlogin] = useState({email:"",password:""})

let history = useHistory();

const onChange= (e) =>
{
    setlogin({...login,[e.target.name]:e.target.value})
}

const signInCheck = async (e) => {
    e.preventDefault();
    console.log(login);   
    
    try {
        let res = await fetch ("http://localhost:3001/api/auth/login",
                            {
                             method:"POST",
                             headers:{"Content-Type": "application/json"},
                             body: JSON.stringify({email:login.email,password:login.password})
                            })
    let loginStatus = await res.json();
    console.log(loginStatus);
    if(loginStatus.success)
    {       // need to read more 
        localStorage.setItem('token',loginStatus.token)
        history.push("/")
    }
    } catch (error) {
        console.log(error);
    }


}

    return (
        <div>
            <div className="container my-5">
                <form onSubmit={signInCheck} >
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={login.email} 
                        onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={login.password} onChange={onChange} />
                    </div>
                   
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Signin
