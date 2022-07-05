import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IPost, IStore } from "../../interface";
import { getPosts, deletePost } from "../../services/posts.api";
import { getPostsList } from "../../store/actions/post.actions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

function Listdetails() {
  const [posts, setPosts] = useState<IPost.Post[]>([]);
  const [loading, setLoading] = useState(false);
  const postsList = useSelector((state: IStore.Store) => state.posts);

  // const appDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  // const dispatch = useDispatch();

  const fetchPosts = async () => {
    setLoading(true);
    const response = await getPosts();
    setPosts(response.data);
    setLoading(false);
    // appDispatch(getPostsList());
    dispatch(getPostsList());
  };

  const removePost = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <>
      {JSON.stringify(postsList)}
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
                <PostCard key={post.id} {...post} removePost={removePost} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

interface IPostCardProps extends IPost.Post {
  removePost: (id: number) => void;
}

function PostCard(props: IPostCardProps) {
  return (
    <div className="post-card" data-testid="post-card">
      <button
        className="delete-post"
        data-testid="deletePost"
        onClick={() => props.removePost(props.id)}
      >
        Delete
      </button>
      <div className="title">{props.title}</div>
      <div className="body">{props.body}</div>
    </div>
  );
}

export default Listdetails;
