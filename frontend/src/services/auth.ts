import axios from "axios";
import { User } from "../models/user";
import { headersFactory } from "./helpers";


type logInReturn = [{ auth_token: string }?, "error"?];
export const logIn = async (
  email: string,
  password: string
): Promise<logInReturn> => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/token/login/`;
  const data = { email, password };
  try {
    const response = await axios.post<{ auth_token: string }>(url, data);
    return [response.data, undefined];
  } catch (error: any) {
    return [undefined, error];
  }
};

type createUserReturn = [User?, "error"?];
export const createUser = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string
): Promise<createUserReturn> => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/users/`;
  const data = { email, password, first_name: firstName, last_name: lastName };
  try {
    const response = await axios.post<User>(url, data);
    return [response.data, undefined];
  } catch (error: any) {
    return [undefined, error];
  }
};

type logOutReturn = [undefined, "error"?];
export const logOut = async (): Promise<logOutReturn> => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/token/logout/`;
  const headers = headersFactory();
  try {
    const response = await axios.post<undefined>(url, {}, { headers });
    return [response.data, undefined];
  } catch (error: any) {
    return [undefined, error];
  }
};
