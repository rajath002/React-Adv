import { AxiosResponse } from "axios";
import { IUser } from "../interface/users.type";
import api from "./api";

export const getUser = (id: string | number): Promise<AxiosResponse<IUser>> =>
  api.get(`/users/${id}`);
