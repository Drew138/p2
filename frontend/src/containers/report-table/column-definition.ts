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
		key: "report",
		header: "Report",
		isFile: true,
		editDisabled: false
	}
];

export default columns;
