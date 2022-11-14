import {
  Button,
  InputGroup,
  Icon,
  InputLeftElement,
  Input,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const FileInput = ({ id, register }: { id: string; register: any }) => {
  return (
    <InputGroup>
      <label
        htmlFor={id}
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          display: "inline-block",
          padding: "6px 12px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {<AddIcon ml={3} mr={3} />}
        Subir
      </label>
      <Input id={id} hidden type="file" {...register(id)} />
    </InputGroup>
  );
};

export default FileInput;
