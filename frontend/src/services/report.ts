import { Report } from "../models/report";
import { getBase, postBase, patchBase, deleteBase, listBase } from "./helpers";

const apiEndpoint = "api/v1/report/";
export const getReport = getBase<Report>(apiEndpoint);
export const listReport = listBase<Report>(apiEndpoint);
export const postReport = postBase<Report>(apiEndpoint);
export const patchReport = patchBase<Report>(apiEndpoint);
export const deleteReport = deleteBase(apiEndpoint);
