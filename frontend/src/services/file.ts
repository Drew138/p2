import { File } from "../models/file";
import { getBase, postBase, patchBase, deleteBase } from "./helpers";

const apiEndpoint = "api/v1/file/";
export const getFile = getBase<File>(apiEndpoint);
export const postFile = postBase<File>(apiEndpoint);
export const patchFile = patchBase<File>(apiEndpoint);
export const deleteFile = deleteBase(apiEndpoint);
