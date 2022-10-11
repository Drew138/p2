import { NavigateFunction } from "react-router-dom";

export const handleError = (error: any, navigate: NavigateFunction) => {
  switch (error.status) {
    case 401:
      navigate("/auth/login");
      break;
    case 404:
      break;
    case 408:
      break;
    case 500:
      break;
    default:
      break;
  }
};
