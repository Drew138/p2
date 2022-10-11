import { Report } from "../models/report";
import { getBase, postBase, patchBase, deleteBase } from "./helpers";

const apiEndpoint = "api/v1/report/";
export const getFile = getBase<Report>(apiEndpoint);
export const postFile = postBase<Report>(apiEndpoint);
export const patchFile = patchBase<Report>(apiEndpoint);
export const deleteFile = deleteBase(apiEndpoint);
