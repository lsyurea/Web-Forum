import { useEffect, useState } from 'react';

const Post = (props) => {
    const [post, setPost] = useState({});

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/posts/${props.id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            setPost(data);
        })
        .catch(error => {
            console.log("Error: ", error);
        }
        )
    }, [props.id])

    if (post.genres) {
        post.genres = Object.values(post.genres);
    } else {
        post.genres = [];
    }
    return (
        <div className="card" key={props.id} style={{width: "100%", backgroundColor: "#F2F2F2", borderRadius: "10px", marginTop: "10px"}}>
            <div className="card-body">
                <h1 className="card-title" style={{color: "#3EC1D0", fontWeight: "bold"}}>{post.title}</h1>
                {post.genres.map(g => (
                        <span key={g.genres} className="badge bg-secondary me-1">{g.genre}</span>
                    ))}
                {post.Image !== "" && 
                    <div className='mb-3'>
                        <img src={`https://image.tmdb.org/t/p/w200/${post.Image}`} alt={post.title} />
                    </div>}

                <p className="card-text">{post.content}</p>
                <a href="/" className="card-link">Like</a>
                <a href="/" className="card-link">Comment</a>
            </div>
        </div>
    );
}

export default Post;