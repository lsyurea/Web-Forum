import { useOutletContext} from "react-router-dom";
import { useEffect, useState} from 'react';
import Input from './form/Input';

function News() {
    const {jwtToken} = useOutletContext("");
    const [posts, setPosts] = useState([])

    // fetch posts from the backend continuously
    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
            method: "GET",
            headers: headers,
        }
        fetch(`http://localhost:8080/posts`, requestOptions)
        .then(response => response.json())
        .then(data => {
            setPosts(data);
        })
        .catch(error => {
            console.log("Error: ", error);
        })
    }, []);

    const addFeature = jwtToken === "" 
                ? (<div></div>) 
                : ( <div style={{padding: "2rem", backgroundColor: "#DBF9F4", borderRadius: "10px"}}>
                        <Input
                            title="Start writing your post here"
                            type="post"
                            className="form-control"
                            style={{width: "100%", height: "10rem", backgroundColor: "#F2F2F2"}}
                        />
                    
                        <div className="d-flex justify-content-end" 
                        
                        style={{width: "100%", zIndex: "-1"}}>
                        
                            <a className="nav-link" style={{fontSize: "1.5rem"}} href="/"><button className="btn hover-fill" style={{borderColor: "#3EC1D0"}}>Post</button></a>
                        </div>
                    </div>
                );



    const addPost = (
        <div>
            {posts.map(post => (
            <div className="card" style={{width: "100%", backgroundColor: "#F2F2F2", borderRadius: "10px", marginTop: "10px"}}>
                <div className="card-body">
                    <h5 className="card-title" style={{color: "#3EC1D0", fontWeight: "bold"}}>{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <a href="/" className="card-link">Like</a>
                    <a href="/" className="card-link">Comment</a>
                </div>
            </div>
            ))}
        </div>

            
        
    )
    return (
        <div className="News">
            <h1 style={{color: "#3EC1D0", fontWeight: "bold"}}>DAILY FEED</h1>
            {addFeature}
            {addPost}
        
        </div>

    );
}

export default News;