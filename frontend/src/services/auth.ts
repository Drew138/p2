import axios from "axios";
import { getBase } from "./helpers";
import { User } from "../models/user";

export const logIn = async (email: string, password: string) => {
  const url = `${process.env.REACT_APP_BASE_URL}auth/token/login/`;
  return await axios.post(url, {
    email,
    password,
  });
};

export const getUser = getBase<User>("auth/users/me/");
