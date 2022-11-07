import axios from "axios";
import { ApiResponse } from "../models/api";

export const headersFactory = () => {
  const token = localStorage.getItem("token") ?? "";
  return {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
};

export type GetBaseReturn<T> = [T?, 'error'?];
export const getBase = <T>(apiEndpoint: string) => {
  return async (
    altUrl: string = "",
    id: number
  ): Promise<GetBaseReturn<T>> => {
    let base_url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}${id}/`;
    const headers = headersFactory();
    try {
      const response = await axios.get<T>(
        altUrl ? altUrl : base_url,
        { headers }
      );
      return [response.data, undefined];
    } catch (error: any) {
      return [undefined, error];
    }
  };
};

export type ListBaseReturn<T> = [ApiResponse<T>?, 'error'?];
export const listBase = <T>(apiEndpoint: string) => {
  return async (
    altUrl: string = "",
  ): Promise<ListBaseReturn<T>> => {
    let base_url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}`;
    const headers = headersFactory();
    try {
      const response = await axios.get<ApiResponse<T>>(
        altUrl ? altUrl : base_url,
        { headers }
      );
      return [response.data, undefined];
    } catch (error: any) {
      return [undefined, error];
    }
  };
};

export type PostBaseReturn<T> = [T?, 'error'?];
export const postBase = <T>(apiEndpoint: string) => {
  return async (data: T): Promise<PostBaseReturn<T>> => {
    let url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}`;
    const headers = headersFactory();
    try {
      const response = await axios.post<T>(url, data, { headers });
      return [response.data, undefined];
    } catch (error: any) {
      return [undefined, error];
    }
  };
};

export type PatchBaseReturn<T> = [T?, 'error'?];
export const patchBase = <T>(apiEndpoint: string) => {
  return async (data: T, id: number): Promise<PatchBaseReturn<T>> => {
    let url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}${id}/`;
    const headers = headersFactory();
    try {
      const response = await axios.patch<T>(url, data, { headers });
      return [response.data, undefined];
    } catch (error: any) {
      return [undefined, error];
    }
  };
};

export type DeleteBaseReturn = [undefined, 'error'?];
export const deleteBase = (apiEndpoint: string) => {
  return async (id: number): Promise<DeleteBaseReturn> => {
    let url = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}${id}/`;
    const headers = headersFactory();
    try {
      const response = await axios.delete<undefined>(url, { headers });
      return [response.data, undefined];
    } catch (error: any) {
      return [undefined, error];
    }
  };
};
