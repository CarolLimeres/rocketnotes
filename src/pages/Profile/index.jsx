import { useState } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/avatar-svgrepo-com.svg";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { Container, Form, Avatar } from "./styles";

export function Profile() {
  // acessar o usuário dentro do contexto de autenticação p já vim preenchido nos estados:
  // (os inputs já vem preenchidos comas informações do usuário)
  const { user, updateProfile } = useAuth();

  // criação dos estados:
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  // verificar se o usuário tem avatar
  // se tem então vou mostrar (montar URL q vai buscar avatar do usuário no backend)
  // caso contrário exibo o avatarPlaceholder
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  // se o usuário já tiver um avatar eu coloco aqui esse avatar:
  const [avatar, setAvatar] = useState(avatarUrl);
  // o avatarFile serve p carregar a nova foto selecionada pelo usuário:
  const [avatarFile, setAvatarFile] = useState(null);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    };

    // o Object.assign vai servir aqui p juntar os dois objetos
    // juntar oq ja tem (avatar qnd nao quero mudar) com os dados atualizados
    const userUpdated = Object.assign(user, updated);

    await updateProfile({ user: userUpdated, avatarFile });
  }

  // o event é o evento de alteração do avatar
  // o onChange vai transferir de forma automática p ele esse evento
  function handleChangeAvatar(event) {
    // dentro do evento eu extraio o arquivo:
    // primeira posição p pegar só um arquivo q o usuário passar:
    const file = event.target.files[0];
    // colocar o arquivo q o usuário acabou de selecionar:
    setAvatarFile(file);

    // exibir o avatar:
    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft size={24}></FiArrowLeft>
        </button>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />

          <label htmlFor="avatar">
            <FiCamera></FiCamera>
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          // função p atualizar o estado:
          onChange={(e) => setName(e.target.value)}
        ></Input>

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordOld(e.target.value)}
        ></Input>

        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordNew(e.target.value)}
        ></Input>

        <Button title="Salvar" onClick={handleUpdate}></Button>
      </Form>
    </Container>
  );
}
