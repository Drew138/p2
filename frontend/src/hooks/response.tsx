import { UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import { handleError } from "../services/error";

const responseHandler = (
  responseMessage: string,
  error: unknown,
  navigate: NavigateFunction
): UseToastOptions => {
  if (error) {
    const message = handleError(error, navigate);
    return {
      title: "Error",
      description: message,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    };
  } else {
    return {
      title: "Exito",
      description: responseMessage,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    };
  }
};

export default responseHandler;
