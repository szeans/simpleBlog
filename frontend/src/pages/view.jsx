import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async function () {
      const req = await fetch("http://localhost:3000/blog/");
      const json = await req.json();
      setPosts(json);
    })();
  }, []);

  const handleDelete = async(title) => {
     await fetch(`http://localhost:3000/blog/${title}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
    })
  }

  const handleEdit = async(title) => {
    handleDelete(title);
    
  }

  return (
    <div>
      <Link to="/"> Home</Link>
      <div>
        {
          posts.map((post) => (
          <div
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
          >
           <button onClick = {() => handleDelete(post.title)}>Delete</button>
           <Link to="/create" onClick = {() => handleEdit(post.title)}>Edit</Link>
            <h2 style={{margin: "0.2rem"}}>{post.title}</h2>
            <div>{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
