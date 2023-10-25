import { BrowserRouter } from "react-router-dom";
// importar o hook de autenticação p acessar o usuário:
import { useAuth } from "../hooks/auth";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {/* se tem o usuário eu renderizo o AppRoutes senao eu renderizo o AuthRoutes: */}
      {user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}
