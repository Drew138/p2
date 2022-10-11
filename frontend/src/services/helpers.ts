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
  ): Promise<[ApiResponse<T> | T | undefined, any]> => {
    let base_url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}`;
    if (id) {
      base_url += `${id}/`;
    }
    const headers = headersFactory();
    try {
      const response = await axios.get<ApiResponse<T> | T>(
        altUrl ? altUrl : base_url,
        { headers }
      );
      return [response.data, undefined];
    } catch (error) {
      return [undefined, error];
    }
  };
};

export const postBase = <T>(apiEndpoint: string) => {
  return async (data: T): Promise<[T | undefined, any]> => {
    let url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}`;
    const headers = headersFactory();
    try {
      const response = await axios.post<T>(url, data, { headers });
      return [response.data, undefined];
    } catch (error) {
      return [undefined, error];
    }
  };
};

export const patchBase = <T>(apiEndpoint: string) => {
  return async (data: T, id: number): Promise<[T | undefined, any]> => {
    let url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}${id}/`;
    const headers = headersFactory();
    try {
      const response = await axios.patch<T>(url, data, { headers });
      return [response.data, undefined];
    } catch (error) {
      return [undefined, error];
    }
  };
};

export const deleteBase = (apiEndpoint: string) => {
  return async (id: number): Promise<[undefined, any]> => {
    let url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}${id}/`;
    const headers = headersFactory();
    try {
      const response = await axios.delete<undefined>(url, { headers });
      return [response.data, undefined];
    } catch (error) {
      return [undefined, error];
    }
  };
};
