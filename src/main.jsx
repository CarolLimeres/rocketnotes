import React from "react";
import ReactDOM from "react-dom/client";
// estilos globais da aplicação:
import GlobalStyles from "./styles/global";
// isso vai prover um tema p toda a aplicação:
import { ThemeProvider } from "styled-components";

// compartilhar o contexto com toda a aplicação:
import { AuthProvider } from "./hooks/auth";

import { Routes } from "./routes";
// tema q criei:
import theme from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* o ThemeProvider vai compartilhar com todas as rotas o tema q criamos p nossa aplicação */}
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
