import { File } from "../models/file";
import { getBase } from "./helpers";

const getFile = getBase<File>("api/v1/file/");

export default getFile;
