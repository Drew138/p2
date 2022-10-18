import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./containers/home";
import LogIn from "./containers/login";
import SignUp from "./containers/signup";
import ProtectedRoute from "./components/protected-route";
import NotFound from "./containers/not-found";
//<ProtectedRoute>
//<Home />
//</ProtectedRoute>
const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home/>
            }
          />
          <Route path="auth">
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
