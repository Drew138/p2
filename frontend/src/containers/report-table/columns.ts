import { ColumnDefinitionType } from "../../models/table";
import { Report } from "../../models/report";

const columns: ColumnDefinitionType<Report, keyof Report>[] = [
  {
    key: "name",
    header: "Nombre",
    isFile: false,
    disabled: false
  },
  {
    key: "modified",
    header: "Fecha",
    isFile: false,
    disabled: false
  },
  {
    key: "report",
    header: "Reporte",
    isFile: true,
    disabled: false
  },
];
export default columns;
