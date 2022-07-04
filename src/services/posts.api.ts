import { AxiosResponse } from "axios";
// import { IPosts } from "../interface/posts.type";
import { IPost } from "../interface";
import api from "./api";

export const getPosts = (): Promise<AxiosResponse<IPost.Post[]>> =>
  api.get("/posts");
