/* eslint-disable react/prop-types */

// hook de autenticação
// toda lógica do contexto vai ficar nesse arquivo p compartilhar os dados do usuário com toda a aplicação
// context api do react:
// esse useContext serve p q eu consiga utilizar o contexto
import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});
  // colocando o email e o password entre {} eu to dizendo p javascript q eu quero
  // o email e o password q ta dentro desse objeto independente da posição q ele está (diferente se colocasse só (email, password))
  // mandar informação de email e de senha pro backend:
  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });

      const { user, token } = response.data;

      // salvar as informações no navegador (localStorage)
      // chave e valor
      // o valor, nesse caso é um objeto (user) com várias propriedades, então
      // tenho que passar ele pra string p conseguir usar:
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      // tenho que guardar usuário (em cima) e token:
      localStorage.setItem("@rocketnotes:token", token);

      // aqui eu to inserindo um token do tipo Bearer de autorização no cabeçalho por padrão de todas as requisições q o usuário vai fazer
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  function signOut() {
    // preciso remover as informações q tão guardadas no localStorage p poder sair da aplicação
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    // voltando o setData p um objeto vazio p refletir lá nas rotas q vai mudar o estado
    // e automaticamente mudando o estado vai passar a ter um usuário vazio e assim muda pras rotas de autenticação
    setData({});
  }

  // p atualizar os dados eu preciso receber os dados e vou receber através do objeto chamado user:
  async function updateProfile({ user, avatarFile }) {
    try {
      // se existe um arquivo selecionado :
      if (avatarFile) {
        // new FormData pq to enviando como um arquivo:
        const fileUploadForm = new FormData();
        // adicionar dentro desse formulário um campo chamado "avatar" e passando o avatarFile
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        // eu espero essa resposta me devolver o user com o avatar atualizado:
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      // o setItem serve tanto p criar um novo qnt p substituir um conteúdo existente:
      localStorage.setItem("rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token });
      alert("Perfil atualizado!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
    }
  }

  // esse useEffect vai ser carregado uma vez após a renderização do componente:
  // serve p qnd eu recarregar a pág, ele pegar as informações q salvei no localStorage e passar pro estado
  // assim qnd eu recarregar a pág nao vai voltar p tela de login (vai continuar com os dados do usuário)
  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    // garantir que tanto o user qnt o token foram informados:
    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({
        token,
        // como ali em cima eu tive que transformar o user de objeto p string, aqui tenho q voltar p um objeto:
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    // o contexto está compartilhando os dados do usuário (assim já da pra saber se o usuário ta conectado ou n na aplicação)
    <AuthContext.Provider
      value={{ signIn, signOut, updateProfile, user: data.user }}
    >
      {/* colocando o contexto assim (por volta das rotas - (children são os routes do main q to recebendo aqui como uma propriedade)) dá acesso a todas as págs, componentes... da aplicação */}
      {/* por volta das rotas to envolvendo e provendo o contexto de autenticação */}
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
