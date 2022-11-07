import AppTable from "../../components/table";
import responseHandler from "../../hooks/response";
import columns from "./columns";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Report } from "../../models/report";
import { deleteReport, listReport, patchReport } from "../../services/report";
import { useQuery } from "react-query";

const ReportTable = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const fetchReports = async () => {
    const [response, error] = await listReport();
    const toastData = responseHandler(
      "Reportes Recuperados Correctamente",
      error,
      navigate
    );
    if (!error && response) {
      return response.results;
    } else {
      toast(toastData);
    }
    return [];
  };

  const modifyReport = async (file: Report) => {
    const [response, error] = await patchReport(file, file.pk);
  };

  const removeReport = async (id: number) => {
    const [response, error] = await deleteReport(id);
  };

  const { data } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });

  return (
    <AppTable
      columns={columns}
      data={data}
      entityName="Reporte"
      modifyFunction={modifyReport}
      deleteFunction={removeReport}
      caption="Lista de Reportes"
    />
  );
};

export default ReportTable;
