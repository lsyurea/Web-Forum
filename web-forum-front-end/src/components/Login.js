import {useState} from 'react';
import Input from './form/Input';
import {useOutletContext, useNavigate} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setJwtToken} = useOutletContext();
    const {setAlertClassName} = useOutletContext();
    const {setAlertMessage} = useOutletContext();
    const {toggleRefresh} = useOutletContext();

    const navigate = useNavigate();

    //shows error message if username or password is incorrect
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //build request payload
        let payload = {
            username: username,
            password: password
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(payload),
        }
        fetch(`/authenticate`, requestOptions)
        .then(response => {
            // console.log("response", response)    for debugging
            return response.json()})
        .then(data => {
            if (data.error) {
                setAlertClassName("alert-danger");
                setAlertMessage(data.message);
            }
            else {
                // console.log("data", data)    for debugging
                setJwtToken(data.access_token);
                setAlertClassName("d-none");
                setAlertMessage("");
                toggleRefresh(true);
                navigate("/news");
            }
        })
        .catch(error => {
            setAlertClassName("alert-danger");
            setAlertMessage("Error: " + error);
        })
    }

    return (
    <form onSubmit={handleSubmit}>
        <div className='d-flex justify-content-center'>
            <div className="form-group col-md-6 mb-3 my-3">
                <Input
                    title="Username"
                    type="username"
                    className="form-control"
                    name="username"
                    autoComplete="username-new"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(e) => setPassword(e.target.value)}
                />
                
            </div>
        </div>
       
        <div className="d-flex justify-content-center">
            <a href="/home"><button className="btn btn-secondary">Login</button></a>
        </div>

    </form>);
}

export default Login