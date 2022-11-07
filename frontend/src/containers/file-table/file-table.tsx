import AppTable from "../../components/table";
import responseHandler from "../../hooks/response";
import CreateFileModal from "../../components/create-file-modal/create-file-modal";
import columns from "./column-definition";
import { deleteFile, listFile, patchFile } from "../../services/file";
import { File } from "../../models/file";
import { useNavigate } from "react-router-dom";
import { useToast, Stack } from "@chakra-ui/react";
import { useQuery, useMutation } from "react-query";

const FileTable = () => {
  const toast = useToast();
  const navigate = useNavigate();

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

  const modifyFile = async (file: File) => {
    const [response, error] = await patchFile(file, file.pk);
  };

  const removeFile = async (id: number) => {
    const [response, error] = await deleteFile(id);
  };

  // const mutation = useMutation(removeFile, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("files");
  //   },
  // });

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
        modifyFunction={modifyFile}
        deleteFunction={removeFile}
        caption="Lista de Archivos"
      />
    </Stack>
  );
};

export default FileTable;
