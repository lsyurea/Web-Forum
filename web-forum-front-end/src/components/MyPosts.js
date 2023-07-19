import { useOutletContext, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";


function MyPosts() {
    const jwtToken = useOutletContext("");
    const [posts, setPosts] = useState([])

    useEffect(() => {
        
        const token = jwtToken.jwtToken
        if (token !== "") {
        const userID = jwt_decode(token).sub

        // to check if userID is correct
        // console.log(userID);
        // fetch posts from the backend continuously

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
            method: "GET",
            headers: headers,
        }
        fetch(`${process.env.REACT_APP_BACKEND}/posts/user/${userID}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            setPosts(data);
        })
        .catch(error => {
            console.log("Error: ", error);
        })
    }}, [jwtToken]);

    const loadPost = (
        <div>
            {posts && posts.map(p => (
            <div className="card" key={p.id} style={{width: "100%", backgroundColor: "#F2F2F2", borderRadius: "10px", marginTop: "10px"}}>
                <div className="card-body">
                    <Link to={`/${p.id}`} className="card-title" style={{color: "#3EC1D0", fontWeight: "bold"}}>{p.title}</Link>
                    
                    <p className="card-text">{p.content}</p>
                    <a href="/" className="card-link">Like</a>
                    <a href="/" className="card-link">Comment</a>
                </div>
            </div>
            ))}
        </div>   
        
    )

    return (
        <div className="Posts">
            {loadPost}
        </div>
    
    )
}
export default MyPosts;