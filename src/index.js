import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import { AuthProvider } from "./contexts/AuthProvider";
import MessageProvider from "./contexts/MessageProvider";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <AuthProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </AuthProvider>
  </BrowserRouter>,
  rootElement
);
