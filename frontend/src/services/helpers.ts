import axios from "axios";
import { ApiResponse } from "../models/api";

export const headersFactory = () => {
  const token = localStorage.getItem("token") ?? "";
  return {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
};

export const getBase = <T>(apiEndpoint: string) => {
  return async (
    altUrl: string = "",
    id?: number
  ): Promise<[ApiResponse<T> | undefined, any]> => {
    let base_url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}`;
    if (id) {
      base_url += `${id}/`;
    }
    const headers = headersFactory();
    try {
      const response = await axios.get<ApiResponse<T>>(
        altUrl ? altUrl : base_url,
        {
          headers,
        }
      );
      return [response.data, undefined];
    } catch (error) {
      return [undefined, error];
    }
  };
};
