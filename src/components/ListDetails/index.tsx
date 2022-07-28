import { useState } from "react";
import { IPost, IStore } from "../../interface";
import { getPostsList, deletePost } from "../../store/actions/post.actions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

function Listdetails() {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const storePostsList = useAppSelector<IStore.Store>((state) => state.posts);

  const fetchPosts = async () => {
    setLoading(true);
    dispatch(getPostsList());
    setLoading(false);
  };

  const removePost = async (id: number) => {
    dispatch(deletePost(id));
  };

  return (
    <>
      <div id="posts-page">
        <header>
          <h3>Posts</h3>
        </header>
        <section>
          <div className="posts">
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
              {storePostsList.posts.map((post) => (
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
