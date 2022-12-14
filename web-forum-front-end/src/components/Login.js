import {useState} from 'react';
import Input from './form/Input';
import {useOutletContext, useNavigate} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setJwtToken} = useOutletContext();
    const {setAlertClassName} = useOutletContext();
    const {setAlertMessage} = useOutletContext();

    const navigate = useNavigate();

    //shows error message if username or password is incorrect
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            setJwtToken("admin");
            setAlertClassName("d-none");
            setAlertMessage("");
            navigate("/news"); //redirects to news page
        } else {
            setAlertClassName("alert-danger");
            setAlertMessage("Invalid username or password");
        }
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
       
        <div class="d-flex justify-content-center">
            <a href="/home"><button class="btn btn-secondary">Login</button></a>
        </div>

    </form>);
}

export default Login