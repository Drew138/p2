import { ColumnDefinitionType } from "../../models/table";
import { Report } from "../../models/report";

const columns: ColumnDefinitionType<Report, keyof Report>[] = [
  {
    key: "name",
    header: "Nombre",
    isFile: false,
    editDisabled: false
  },
  {
    key: "modified",
    header: "Fecha",
    isFile: false,
    editDisabled: false
  },
  {
    key: "report",
    header: "Reporte",
    isFile: true,
    editDisabled: false
  },
];
export default columns;
