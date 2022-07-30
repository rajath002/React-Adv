import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../interface/users.type";
import { getPostDetails } from "../../services/posts.api";
import { getUser } from "../../services/users.api";
import classes from "./postDetails.module.scss";

export interface IPostDetails {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const image =
  "https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=868&q=80";

export function PostDetails() {
  const [details, setDetails] = useState<IPostDetails | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (params["id"]) {
      getPostDetails(params["id"])
        .then((res) => {
          setDetails(() => res.data);
          getUser(res.data.userId)
            .then((user) => {
              setUser(user.data);
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    return () => {
      setDetails(null);
      setUser(null);
    };
  }, [params]);

  return (
    <div className={classes.postDetails}>
      <div key={details?.id}>
        <div className={classes.image}>
          <img src={image} alt="post" />
        </div>
        <div className={classes.title}>{details?.title}</div>
        <div className={classes.body}>
          <p>{details?.body}</p>
        </div>
      </div>
      <button onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined">reply</span>
      </button>
      {!user ? <h3>Loading...</h3> : <PrintUserDetails {...user} />}
    </div>
  );
}

const PrintUserDetails = (user: IUser) => {
  return (
    <div className={classes.user}>
      <div className={classes.userName}>{user.name}</div>
      <div className={classes.userEmail}>{user.email}</div>
      <div className={classes.userPnone}>{user.phone}</div>
      <div className={classes.userWebsite}>{user.website}</div>
    </div>
  );
};
