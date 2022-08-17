import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPost, IStore } from "../../interface";
import { getPostsList, deletePost } from "../../store/actions/post.actions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import classes from "./listDetails.module.scss";

export function Listdetails() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<IPost.Post[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  useState();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const storePostsList = useAppSelector<IStore.Store>((state) => state.posts);

  useEffect(() => {
    setPosts(() =>
      storePostsList.posts.map((post) => {
        return {
          ...post,
          checked: false,
        };
      })
    );
  }, [storePostsList]);

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

  const onCheck = (value: boolean, id: number) => {
    setPosts((prevState) =>
      prevState.map((post) => {
        if (id !== post.id) return post;
        return {
          ...post,
          checked: value,
        };
      })
    );
  };

  const checkAll = () => {
    setPosts((prevState) => {
      return prevState.map((post) => {
        return {
          ...post,
          checked: true,
        };
      });
    });
    setIsAllChecked(() => true);
  };

  const uncheckAll = () => {
    setPosts((prevState) => {
      return prevState.map((post) => {
        return {
          ...post,
          checked: false,
        };
      });
    });
    setIsAllChecked(() => false);
  };

  return (
    <>
      <div id="posts-page">
        <header>
          <h3>Posts</h3>
        </header>
        <section>
          <div className="posts">
            <div className={classes["main-action-buttons"]}>
              <button
                name="fetchPosts"
                id="fetchPosts"
                data-testid="fetchPosts"
                onClick={fetchPosts}
              >
                Get Posts
              </button>
              {isAllChecked ? (
                <button data-testid="uncheck-all" onClick={uncheckAll}>
                  Uncheck All
                </button>
              ) : (
                <button data-testid="check-all" onClick={checkAll}>
                  Check All
                </button>
              )}
            </div>
            {loading && <p>Loading...</p>}
            <div
              data-testid="post-card-container"
              className="post-card-container"
            >
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  {...post}
                  openPost={openPost}
                  removePost={removePost}
                  navigateTo={navigateTo}
                  onCheck={(value) => {
                    onCheck(value, post.id);
                  }}
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
  onCheck: (value: boolean) => void;
}

function PostCard(props: IPostCardProps) {
  return (
    <div className="post-card" data-testid="post-card">
      <div className={classes.cardActions}>
        <div className={classes.left}>
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
            data-testid={`show-post-${props.id}`}
            onClick={() => props.navigateTo(props.id)}
            area-lable="show post"
          >
            Show Details
          </button>
        </div>
        <div className="right">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            data-testid={"chkbx-" + props.id}
            checked={props?.checked}
            onChange={(e) => props.onCheck(!props.checked)}
          />
          Select All
        </div>
      </div>
      <div className="title">{props.title}</div>
      <div className="body">{props.body}</div>
    </div>
  );
}
