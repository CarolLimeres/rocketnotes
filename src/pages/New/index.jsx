import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { ButtonText } from "../../components/ButtonText";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { api } from "../../services/api";

import { Container, Form } from "./styles";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // estado p armazenar os links:
  const [links, setLinks] = useState([]);
  // estado p guardar o link adicionado:
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    // função q atualiza o estado:
    // acessar o estado/conteúdo anterior armazenado nesse estado (prevState) e montar um novo vetor (despejando tudo q tinha antes com ... e o novo link):
    // isso serve p manter todos os links já adicionados anteriormente e o novo link:
    setLinks((prevState) => [...prevState, newLink]);
    // limpar o setNewLink p ter o estado "resetado":
    setNewLink("");
  }

  // o deleted vai ser o link que quero remover da minha lista
  function handleRemoveLink(deleted) {
    // no prevState eu tenho todo o conteúdo atual desse estado antes dele ser atualizado
    // com o filter eu retorno pro setLinks a lista nova com todos os links exceto oq quero remover:
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    // limpar input:
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Digite o título da nota");
    }

    if (newLink) {
      return alert(
        "Você deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio."
      );
    }

    if (newTag) {
      return alert(
        "Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio."
      );
    }

    // passar objeto que quero mandar p cadastrar nota:
    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    });

    alert("Nota criada com sucesso!");
    // esse navigate vai fazer com que volte para a home depois de cadastrar a nota
    // mas ao invés de adicionar mais uma camada no meu histórico de navegação eu volto na rota anterior
    navigate(-1);
  }

  return (
    <Container>
      <Header></Header>
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack}></ButtonText>
          </header>

          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>

          <Section title="Links úteis">
            {
              // links é um vetor em q vou guardando todos os links q vou adicionando:
              // percorrer todos utilizando map:
              // sempre q tenho um componente que ta sendo renderizado por uma lista eu tenho q colocar uma key:
              // o map devolve o index (posição do elemento na lista) daí eu forço p q a chave seja uma string passando o index
              // a chave tem q ser no formato de texto
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                ></NoteItem>
              ))
            }
            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            ></NoteItem>
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                ></NoteItem>
              ))}
              <NoteItem
                isNew
                placeholder="Nova tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              ></NoteItem>
            </div>
          </Section>
          <Button title="Salvar" onClick={handleNewNote}></Button>
        </Form>
      </main>
    </Container>
  );
}
