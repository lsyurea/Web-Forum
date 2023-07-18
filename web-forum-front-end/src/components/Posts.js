import { useOutletContext, Link} from "react-router-dom";
import { useEffect, useState} from 'react';
import Input from './form/Input';
import TextArea from "./form/TextArea";

function Posts() {
    const {jwtToken} = useOutletContext("");
    const [posts, setPosts] = useState([])

    // errors from backend
    // const [error, setError] = useState(null);
    // const [errors, setErrors] = useState([]);
    const [post, setPost] = useState({
        id: 0,
        title: "",
        content: "",
    });




    // Using async function to have more than 1 fetch request 
    useEffect(() => {

        // fetch posts from the backend continuously
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

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleChange = () => event => {
        let value = event.target.value;
        let name = event.target.name;
        // setPost({...post, [name]: value});
    }

    const hasError = (key) => {
        // return errors.indexOf(key) !== -1;
    }


    // have not added on submit for form and on change for input
    const addPost = jwtToken === "" 
                ? (<div></div>) 
                : ( <form onSubmit={handleSubmit} style={{padding: "2rem", backgroundColor: "#DBF9F4", borderRadius: "10px"}}>
                        <input type="hidden" name="id" value={post.id} id="id"/>
                        <Input 
                            title="Title"
                            type="text"
                            className="form-control"
                            name="title"
                            value={post.title}
                            onChange={handleChange("title")}
                            errorDiv={hasError("title") ? "text-danger" : "d-none"}
                            errorMessage={"Please enter a title"}
                        />
                        <TextArea
                            title="Start writing your post here"
                            name="content"
                            value={post.content}
                            className="form-control"
                            rows={"3"}
                            errorDiv={false ? "text-danger" : "d-none"}
                            errorMessage={"Please enter your content"}
                            style={{width: "100%", height: "10rem"}}
                        />
                    
                        <div className="d-flex justify-content-end" 
                        
                        style={{width: "100%", zIndex: "-1"}}>
                        
                            <a className="nav-link" style={{fontSize: "1.5rem"}} href="/"><button className="btn hover-fill" style={{borderColor: "#3EC1D0"}}>Post</button></a>
                        </div>
                    </form>
                );


    const loadPost = (
        <div>
            {posts.map(p => (
            <div className="card" key={p.id} style={{width: "100%", backgroundColor: "#F2F2F2", borderRadius: "10px", marginTop: "10px"}}>
                <div className="card-body">
                    <Link to={`/${p.id}`} className="card-title" style={{color: "#3EC1D0", fontWeight: "bold"}}>{p.title}</Link>
                     {/* {  
                        p.genres.map(g => (
                        <span key={g.genres} className="badge bg-secondary me-1">{g.genre}</span>
                    ))} */}
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
            <h1 style={{color: "#3EC1D0", fontWeight: "bold"}}>DAILY FEED</h1>
            {addPost}
            {loadPost}
        
        </div>
    );
}

export default Posts;