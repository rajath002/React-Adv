import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPost, IStore } from "../../interface";
import { getPostsList, deletePost } from "../../store/actions/post.actions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
// import classes from "./listDetails.module.scss";

export function Listdetails() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const storePostsList = useAppSelector<IStore.Store>((state) => state.posts);

  const fetchPosts = async () => {
    setLoading(true);
    dispatch(getPostsList());
    setLoading(false);
  };

  const removePost = (id: number) => {
    dispatch(deletePost(id));
  };

  const openPost = (id: number) => {
    alert("Open post " + id);
  };

  const navigateTo = (id: number) => {
    navigate(`/postdetails/${id}`);
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
                <PostCard
                  key={post.id}
                  {...post}
                  openPost={openPost}
                  removePost={removePost}
                  navigateTo={navigateTo}
                />
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
  openPost: (id: number) => void;
  navigateTo: (id: number) => void;
}

function PostCard(props: IPostCardProps) {
  return (
    <div className="post-card" data-testid="post-card">
      <button
        className="delete-post"
        data-testid="deletePost"
        onClick={() => props.removePost(props.id)}
        area-lable="delete post"
      >
        Delete
      </button>
      <button
        className="open-post"
        data-testid="open-post"
        onClick={() => props.openPost(props.id)}
        area-lable="open post"
      >
        Open
      </button>
      <button
        className="show-post"
        data-testid="show-post"
        onClick={() => props.navigateTo(props.id)}
        area-lable="show post"
      >
        Show Details
      </button>
      <div className="title">{props.title}</div>
      <div className="body">{props.body}</div>
    </div>
  );
}
