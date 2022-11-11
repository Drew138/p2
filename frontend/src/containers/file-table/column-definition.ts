import { ColumnDefinitionType } from "../../models/table";
import { File } from "../../models/file";

const columns: ColumnDefinitionType<File, keyof File>[] = [
  {
    key: "modified",
    header: "Fecha",
    isFile: false,
    editDisabled: true,
  },
  {
    key: "image",
    header: "Imagenes",
    isFile: true,
    editDisabled: false,
  },
  {
    key: "transcript",
    header: "Transcripción",
    isFile: true,
    editDisabled: false,
  },
];
export default columns;
