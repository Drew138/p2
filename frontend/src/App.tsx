import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./containers/home";
import LogIn from "./containers/login";
import SignUp from "./containers/signup";
import NotFound from "./containers/not-found";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
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
}

export default App;
