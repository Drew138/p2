import AppTable from "../../components/table";
import responseHandler from "../../hooks/response";
import columns from "./column-definition";
import { useToast, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { deleteReport, listReport, patchReport } from "../../services/report";
import { useQuery, useQueryClient } from "react-query";
import CreateReportModal from "../../components/create-report-modal";

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

  const modifyFunction = async (
    data: { [key: string]: string | FileList },
    pk: number
  ) => {
    delete data["modified"];

    const payload: { [key: string]: any } = {};
    Object.entries(data).forEach(([key, value]) => {
      if (!value) {
        delete data[key];
      } else if (value instanceof FileList && value.length > 0) {
        payload[key] = value[0];
      } else {
        payload[key] = value;
      }
    });

    const [_, error] = await patchReport(payload, pk);
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
