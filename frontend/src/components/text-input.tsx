import { useEffect, useState } from "react";
import { ColumnDefinitionType } from "../models/table";

import { Input } from "@chakra-ui/react";

type Props<T, K extends keyof T> = {
  field: ColumnDefinitionType<T, K>;
  register: any;
  initial: string;
};
const TextInput = <T, K extends keyof T>({
  field,
  initial,
  register,
}: Props<T, K>) => {
  const [value, setValue] = useState(initial);
  return (
    <Input
      placeholder={field.header}
      isDisabled={field.editDisabled}
      id={String(field.key)}
      {...register(String(field.key))}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default TextInput;
