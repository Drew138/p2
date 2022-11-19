import { ColumnDefinitionType } from "../../models/table";
import { Report } from "../../models/report";

const columns: ColumnDefinitionType<Report, keyof Report>[] = [
  {
    key: "year",
    header: "Año",
    isFile: false,
    editDisabled: false
  },
  {
    key: "quimico_report",
    header: "Reporte Quimico",
    isFile: true,
    editDisabled: false
  },
  {
    key: "bio_y_cor_report",
    header: "Reporte Biologico",
    isFile: true,
    editDisabled: false
  },
  {
    key: "ord_y_rec_report",
    header: "Reporte Ordinarios",
    isFile: true,
    editDisabled: false
  },
];

export default columns;
