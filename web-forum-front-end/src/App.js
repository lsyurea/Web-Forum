import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Alert from './components/Alert';



function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const navigate = useNavigate();
  const [tickInterval, setTickInterval] = useState(0);

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }
    fetch(`/logout`, requestOptions)
    .catch(error => {
      console.log("error logging out", error)
    })
    .finally(() => {
      setJwtToken("");
      toggleRefresh(false);
    })
    navigate("/");
}

// refresh token every 10 minutes
const toggleRefresh = useCallback((status) => {
  console.log("toggling refresh")
  if (status) {
    let i = setInterval(() => {
      if (jwtToken === "") {
        const requestOptions = {
          method: "GET",
          credentials: "include",
        }
        fetch(`/refresh`, requestOptions)
        .then(response => {
          return response.json()})
        .then(data => {
          if (data.access_token) {
            setJwtToken(data.access_token);
          }
        })
        .catch(err => {
          console.log("user is not logged in ", err)
        })
      }
    }, 60000);
    setTickInterval(i);

  }
  else {
    setTickInterval(null);
    clearInterval(tickInterval);
  }
}, [tickInterval, jwtToken])


useEffect(() => {
  if (jwtToken === "") {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }
    fetch(`/refresh`, requestOptions)
    .then(response => {
      return response.json()})
    .then(data => {
      if (data.access_token) {
        setJwtToken(data.access_token);
        toggleRefresh(true);
      }
    })
    .catch(err => {
      console.log("user is not logged in ", err)
    })
  }
}, [jwtToken, toggleRefresh])



return (
  <div className="container">
    <div className="row mx-auto">
      <nav className="navbar">
        <ul className="nav">
          <li className="nav-item">
            {jwtToken === ""
            ? <Link to="/" className="nav-link hover-white">Login</Link>
            : <a href="/" onClick={logOut}><span className="nav-link hover-white">Logout</span></a>
            }
            
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link hover-white">Create Account</Link>
          </li>
        </ul>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/news" className="nav-link hover-white" >Latest News</Link>
          </li>
        </ul>
      </nav>

      <div className="col">
        <h1 className="webtitle text-center text-shadow">Weebs</h1>
        <Alert message={alertMessage} className={alertClassName}/>

        <Outlet context={{
          jwtToken, setJwtToken, setAlertClassName, setAlertMessage, toggleRefresh
        }}/>
      </div>
    </div>
  </div>
);
}

export default App;