import AppTable from "../../components/table";
import responseHandler from "../../hooks/response";
import CreateFileModal from "../../components/create-file-modal/create-file-modal";
import columns from "./column-definition";
import { deleteFile, listFile, patchFile } from "../../services/file";
import { useNavigate } from "react-router-dom";
import { useToast, Stack } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";

const FileTable = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchFiles = async () => {
    const [response, error] = await listFile();
    const toastData = responseHandler("", error, navigate);
    if (!error && response) {
      return response.results;
    } else {
      toast(toastData);
    }
    return [];
  };

  const invalidateQuery = () => {
    queryClient.invalidateQueries("files");
  };
  const removeFile = async (id: number) => {
    const [_, error] = await deleteFile(id);
    const toastData = responseHandler(
      "Archivo Borrado Exitosamente",
      error,
      navigate
    );
    toast(toastData);
    invalidateQuery();
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
    const [_, error] = await patchFile(payload, pk);
    const toastData = responseHandler(
      "Archivo Modificado Exitosamente",
      error,
      navigate
    );
    toast(toastData);
    invalidateQuery();
  };

  const { data } = useQuery({
    queryKey: ["files"],
    queryFn: fetchFiles,
  });

  return (
    <Stack>
      <CreateFileModal />
      <AppTable
        columns={columns}
        data={data}
        entityName="Archivo"
        modifyFunction={modifyFunction}
        deleteFunction={removeFile}
        caption="Lista de Archivos"
      />
    </Stack>
  );
};

export default FileTable;
