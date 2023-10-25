import { Routes, Route } from "react-router-dom";

import { New } from "../pages/New";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Details } from "../pages/Details";

export function AppRoutes() {
  return (
    // o Routes vai envolver todas as minhas rotas:
    <Routes>
      {/* p cada rota (Route) eu digo qual é o endereço e coloco o elemento que quero renderizar p esse endereço: */}
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/new" element={<New></New>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      {/* p details eu preciso do código da nota p exibi-la, entao eu passo o parâmetro de id q dps consigo recuperar o parâmetro passado pela rota */}
      <Route path="/details/:id" element={<Details></Details>}></Route>
    </Routes>
  );
}
