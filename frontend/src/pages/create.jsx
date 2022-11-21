import {useState} from "react";
import {Link} from "react-router-dom";
import "./create.css";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (password != "swag") {
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({title, content})
    };

    fetch('http://localhost:3000/blog/create-post', requestOptions);

    setDone(true);
  }

  if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <div>
          <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          />
      </div>
      <button type="submit">Post</button>
    </form>
  );
}
