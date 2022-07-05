import { Dispatch } from "react";
import api from "../../services/api";

export const getPostsList = () => {
  return async (dispatch: Dispatch<any>) => {
    const response = await api.get("/posts");
    return dispatch({
      type: "GET_POSTS",
      payload: response.data,
    });
  };
};
