// importar o useState p eu criar estados p armazenar as informações
// de email e senha q o usuário digitar nos inputs
import { useState } from "react";

import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Background } from "./styles.js";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // objeto p desestruturar a função de signIn:
  const { signIn } = useAuth();

  function handleSignIn() {
    signIn({ email, password });
  }

  return (
    <Container>
      <Form>
        <h1>Rocket Notes</h1>

        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seu login</h2>
        {/* o onChange fica observando qnd o conteúdo do input muda */}
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

        <Button title="Entrar" onClick={handleSignIn}></Button>

        <Link to="/register">Criar Conta</Link>
      </Form>

      <Background></Background>
    </Container>
  );
}
