import { getBase } from "./helpers";
import { User } from "../models/user";

export const getUser = getBase<User>("auth/users/me/");
