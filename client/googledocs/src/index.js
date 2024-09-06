import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "../src/pages/login";
import Register from "../src/pages/register";
import VerifyEmail from "../src/pages/user/verify-email";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { ToastProvider } from "./contexts/toast-context";
import { DocumentProvider } from "./contexts/document-context";
import Document from "../src/pages/document/index";
import AuthRoute from "./components/molecules/auth-route";
import Create from "./pages/document/create";
import { EditorProvider } from "./contexts/editor-context";
import Tiptap from "./components/molecules/text-editor-tiptap/Tiptap";
import ButtonBar from "./components/atoms/button-bar-text-editor/button-bar";
import LandingPage from "./components/organisms/landing-page/landing-page"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route
              path="/document/:id"
              element={
                <AuthRoute
                  element={
                    <DocumentProvider>
                      <EditorProvider>
                        <Document />
                      </EditorProvider>
                    </DocumentProvider>
                  }
                />
              }
            />
            <Route path="/menu-bar" element={<ButtonBar/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="/document/create"
              element={<AuthRoute element={<Create />} />}
            />
            <Route
              path="/"
              element={
                <LandingPage />
              }
            />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
