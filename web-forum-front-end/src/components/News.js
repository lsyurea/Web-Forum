import { useOutletContext } from "react-router-dom";

function News() {
    const {jwtToken} = useOutletContext("");
    return (
        <div className="Home">
        <h1>News</h1>
        <p>Welcome to the news page!</p>
        {jwtToken === "" 
        ? (<p>You are not logged in.</p>) 
        : (<p>You are logged in.</p>)}
        </div>

    );
}

export default News;