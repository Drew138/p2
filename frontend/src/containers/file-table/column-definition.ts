import { ColumnDefinitionType } from "../../models/table";
import { File } from "../../models/file";

const columns: ColumnDefinitionType<File, keyof File>[] = [
  {
    key: "modified",
    header: "Fecha",
    isFile: false,
    disabled: true
  },
  {
    key: "image",
    header: "Imagenes",
    isFile: true,
    disabled: false
  },
  {
    key: "transcript",
    header: "Transcripción",
    isFile: true,
    disabled: false
  },
];
export default columns;
