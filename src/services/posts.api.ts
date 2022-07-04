import { AxiosResponse } from "axios";
import { IPost } from "../interface";
import api from "./api";

export const getPosts = (): Promise<AxiosResponse<IPost.Post[]>> =>
  api.get("/posts");

export const deletePost = (id: number): Promise<AxiosResponse<{}>> =>
  api.delete(`/posts/${id}`);
