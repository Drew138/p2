import { NavigateFunction } from "react-router-dom";

export const handleError = (error: any, navigate: NavigateFunction) => {
  switch (error?.response.status) {
    case 400:
      navigate("/auth/login");
      if (error?.response.data.non_field_errors) {
          return error?.response.data.non_field_errors[0];
      }
      return 'Bad Request';
    case 401:
      navigate("/auth/login");
      return 'Not Authorized';
    case 404:
      return 'Not Found';
    default:
      return 'Internal Server Error';
  }
};
