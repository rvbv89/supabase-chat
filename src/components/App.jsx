import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { ProtectedRoute } from "./ProtectedRoute";
import Welcome from "./Welcome";
import "./App.css";

import Dashboard from "./Dashboard";

import SignUp from "./SignUp";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
