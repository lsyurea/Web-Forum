import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from './components/Alert';


function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  const navigate = useNavigate();
  const logOut = () => {
    setJwtToken("");
    navigate("/");
}

  return (
    <div className="container">
      <div className="row mx-auto">
        <nav class="navbar">
          <ul class="nav">
            <li class="nav-item">
              {jwtToken === ""
              ? <Link to="/" class="nav-link">Login</Link>
              : <a href="/" onclick={logOut}><span class="nav-link">Logout</span></a>
              }
              
            </li>
            <li class="nav-item">
              <Link to="/create" class="nav-link">Create Account</Link>
            </li>
          </ul>
          <ul class="nav">
            <li class="nav-item">
              <Link to="/news" class="nav-link" >Latest News</Link>
            </li>
          </ul>
        </nav>

        <div className="col">
          <h1 className="webtitle text-center text-shadow">Weebs</h1>
          <Alert message={alertMessage} className={alertClassName}/>

          <Outlet context={{
            jwtToken, setJwtToken, setAlertClassName, setAlertMessage
          }}/>
        </div>
      </div>
    </div>
  );
}

export default App;