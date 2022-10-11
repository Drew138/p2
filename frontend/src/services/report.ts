import { Report } from "../models/report";
import { getBase } from "./helpers";

const getReport = getBase<Report>("api/v1/report/");

export default getReport;
