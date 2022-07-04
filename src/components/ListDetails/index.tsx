import { useState } from "react";
import { IPost } from "../../interface";
import { getPosts } from "../../services/posts.api";

function Listdetails() {
  const [posts, setPosts] = useState<IPost.Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // const data = await response.json();
    // setPosts(data);
    const response = await getPosts();
    setPosts(response.data);
    setLoading(false);
  };

  return (
    <>
      <div id="posts-page">
        <header>
          <h3>Posts</h3>
        </header>
        <section>
          <div className="posts">
            {/* <h4>Posts</h4> */}
            <button
              name="fetchPosts"
              id="fetchPosts"
              data-testid="fetchPosts"
              onClick={fetchPosts}
            >
              Get Posts
            </button>
            {loading && <p>Loading...</p>}
            <div
              data-testid="post-card-container"
              className="post-card-container"
            >
              {posts.map((post) => (
                <div
                  data-testid="post-card"
                  className="post-card"
                  key={post.id}
                >
                  <div className="title">{post.title}</div>
                  <div className="body">{post.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Listdetails;
