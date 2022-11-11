import {
  Button,
  InputGroup,
  Icon,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const FileInput = ({ id, register }: { id: string; register: any }) => {
  let inputRef: any;
  return (
    <InputGroup>
      <InputLeftElement />
      <Input
        id={id}
        type="file"
        hidden
        {...register(id)}
        ref={(input) => {
          inputRef = input;
        }}
      />
      <Button
        leftIcon={<Icon as={AddIcon} />}
        width="100%"
        onClick={() => {
          inputRef.click();
        }}
      >
        Subir
      </Button>
    </InputGroup>
  );
};

export default FileInput;
