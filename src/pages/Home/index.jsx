import { useState, useEffect } from "react";
// p levar o user p outra página (tem q importar o useNavigate):
import { useNavigate } from "react-router-dom";
// ícones:
import { FiPlus, FiSearch } from "react-icons/fi";

import { api } from "../../services/api";

import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";

import { Input } from "../../components/Input";
import { Note } from "../../components/Note";

import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([]);
    }

    // verificar se o tagName existe dentro da lista de tags:
    // p saber se a tag já está selecionada
    const alreadySelected = tagsSelected.includes(tagName);

    if (alreadySelected) {
      // esse filter vai percorrer cada tag e vai me retornar todas as tags q sejam diferentes de tagName
      // o filteredTags vai devolver todas as tags menos a tag desmarcada
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName);
      setTagsSelected(filteredTags);
    } else {
      // com o prevState e despejando (com o ...) dentro do array eu garanto
      // que as tags selecionadas previamente continuem selecionadas qnd selecionar outras
      setTagsSelected((prevState) => [...prevState, tagName]);
    }
  }

  function handleDetails(id) {
    // levar o usuário p outra interface:
    navigate(`/details/${id}`);
  }

  // useEffect é uma função que é executada de forma automática quando o componente é carregado, qnd a interface é renderizada
  // qnd nao coloca nenhum estado dependente ele executa apenas uma vez
  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);

  // colocando os estados de tagsSelected e search dependentes desse useEffect
  // qnd mudar o conteúdo desses estados o useEffect é executado novamente
  // então esse useEffect vai ser executado dnv qnd o usuário selecionar uma tag nova (pq quero q a pesquisa recarregue com o filtro q o usuário ta aplicando)
  // e p search p conforme ele for digitando p essa informação ja refletir na interface
  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      );
      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header></Header>

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagSelected("all")}
            // o tagsSelected é o estado que armazeno as tags selecionadas
            // se o tamanho desse array for igual a 0
            // significa q nao tem nada dentro desse array, então é a tag de Todos q ta selecionada
            isActive={tagsSelected.length === 0}
          ></ButtonText>
        </li>
        {
          // se tiver conteúdo dentro do estado tags então vai usar as tags p fazer o map:
          tags &&
            tags.map((tag) => (
              <li key={String(tag.id)}>
                <ButtonText
                  title={tag.name}
                  onClick={() => handleTagSelected(tag.name)}
                  // se a tag existe dentro do array tagsSelected significa q ela ta selecionada
                  isActive={tagsSelected.includes(tag.name)}
                ></ButtonText>
              </li>
            ))
        }
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          // assim o conteúdo da caixa de texto vai ser armazenado no estado setSearch:
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
      </Search>

      <Content>
        {/* o objeto data (q criei no componente Note), vai ter um título e um vetor de tags q vai ter o nome da tag: */}
        {/* como esse componente ta sendo gerado por uma estrutura de repetição, por padrão eu tenho q colocar uma chave */}
        <Section title="Minhas Notas">
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            ></Note>
          ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus></FiPlus>
        Criar Nota
      </NewNote>
    </Container>
  );
}
