import AppTable from "../../components/table";
import responseHandler from "../../hooks/response";
import columns from "./column-definition";
import { useToast, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { deleteReport, listReport, patchReport } from "../../services/report";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CreateReportModal from "../../components/modal-reportes";

const ReportTable = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchReports = async () => {
    const [response, error] = await listReport();
    const toastData = responseHandler("", error, navigate);
    if (!error && response) {
      return response.results;
    } else {
      toast(toastData);
    }
    return [];
  };

  const invalidateQuery = () => {
    queryClient.invalidateQueries("reports");
  };

  const modifyFunction = async (data: object, pk: number) => {
    const [_, error] = await patchReport(data, pk);
    const toastData = responseHandler(
      "Reporte Modificado Exitosamente",
      error,
      navigate
    );
    toast(toastData);
    invalidateQuery();
  };

  const removeReport = async (id: number) => {
    const [_, error] = await deleteReport(id);
    const toastData = responseHandler(
      "Reporte Borrado Exitosamente",
      error,
      navigate
    );
    toast(toastData);
    invalidateQuery();
  };

  const { data } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });

  return (
    <Stack>
      <CreateReportModal />
      <AppTable
        columns={columns}
        data={data}
        entityName="Reporte"
        modifyFunction={modifyFunction}
        deleteFunction={removeReport}
        caption="Lista de Reportes"
      />
    </Stack>
  );
};

export default ReportTable;
