// importar useState p poder criar estados:
// se eu quero as infos de nome, email e senha atualizados (de acordo com oq o usuário digitou no momento)
// eu preciso criar um estado p pegar isso de forma dinâmica p mim
import { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

// p mandar as infos p backend eu começo importando a api aqui:
import { api } from "../../services/api";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Background } from "./styles.js";

export function SignUp() {
  // criando um estado:
  // o valor inicial desse estado vai ser um texto vazio (pq qnd abro a interface nao tem nada escrito ali inicialmente):
  // nesse vetor o useState me entrega duas coisas:
  // 1- o estado - p eu acessar qual o valor atual do estado
  // 2- consigo acessar a função p atualizar o estado
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      // p nao deixar a função prosseguir eu coloco o return:
      return alert("Preencha todos os campos!");
    }

    // acessar a api
    // post("users") é a rota de cadastrar usuário
    // o .then() executa se deu tudo certo
    // o .catch() executa se algo deu errado
    api
      .post("/users", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso.");
        // aqui leva o usuário p pág de login p poder se autenticar com email e senha q acabou de criar:
        navigate("/");
      })
      .catch((error) => {
        // com o response eu capturo aquelas mensagens de erro q criei no backend e exibo aqui:
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível cadastrar");
        }
      });
  }

  return (
    <Container>
      <Background></Background>
      <Form>
        <h1>Rocket Notes</h1>

        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie a sua conta</h2>

        {/* p cada Input eu passo a função onChange. Com essa função, toda vez q o valor do input muda ela dispara um evento. */}
        {/* eu capturo esse evento com a variável event, ou apenas a letra e */}
        {/* passo oq tem no event pros meus sets */}
        {/* acesso o valor do e através de e.target.value */}
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        ></Input>

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>

        {/* toda vez q clicar nesse botão chama a função handleSignUp */}
        <Button title="Cadastrar" onClick={handleSignUp}></Button>

        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  );
}
