import { useOutletContext, Link} from "react-router-dom";
import { useEffect, useState} from 'react';
import Input from './form/Input';
import TextArea from "./form/TextArea";

function Posts() {
    const {jwtToken} = useOutletContext("");
    const [posts, setPosts] = useState([])
    // const navigate = useNavigate();


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

    // have not added on submit for form and on change for input
    const addPost = jwtToken === "" 
                ? (<div></div>) 
                : ( <form style={{padding: "2rem", backgroundColor: "#DBF9F4", borderRadius: "10px"}}>
                        <input type="hidden" name="id" value={posts.id} id="id"/>
                        <Input 
                            title="Title"
                            type="text"
                            className="form-control"
                            name="title"
                            value={"insert title here"}
                            errorDiv={false ? "text-danger" : "d-none"}
                            errorMessage={"Please enter a title"}
                        />
                        <TextArea
                            title="Start writing your post here"
                            name="content"
                            value={"insert content here"}
                            className="form-control"
                            rows={"3"}
                            errorDiv={false ? "text-danger" : "d-none"}
                            errorMessage={"Please enter your content"}
                            style={{width: "100%", height: "10rem", backgroundColor: "#F2F2F2"}}
                        />
                    
                        <div className="d-flex justify-content-end" 
                        
                        style={{width: "100%", zIndex: "-1"}}>
                        
                            <a className="nav-link" style={{fontSize: "1.5rem"}} href="/"><button className="btn hover-fill" style={{borderColor: "#3EC1D0"}}>Post</button></a>
                        </div>
                    </form>
                );



    const loadPost = (
        <div>
            {posts.map(post => (
            <div className="card" key={post.id} style={{width: "100%", backgroundColor: "#F2F2F2", borderRadius: "10px", marginTop: "10px"}}>
                <div className="card-body">
                    <Link to={`/${post.id}`} className="card-title" style={{color: "#3EC1D0", fontWeight: "bold"}}>{post.title}</Link>
                    <p className="card-text">{post.content}</p>
                    <a href="/" className="card-link">Like</a>
                    <a href="/" className="card-link">Comment</a>
                </div>
            </div>
            ))}
        </div>

            
        
    )
    return (
        <div className="Posts">
            <h1 style={{color: "#3EC1D0", fontWeight: "bold"}}>DAILY FEED</h1>
            {addPost}
            {loadPost}
        
        </div>
    );
}

export default Posts;