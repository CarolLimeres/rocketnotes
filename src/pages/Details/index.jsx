import { useState, useEffect } from "react";
import { Container, Links, Content } from "./styles";
// buscar pelos parâmetros que existem na rota:
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Tags } from "../../components/Tags";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

// pra q essa interface possa ser utilizada em outro lugar precisa colocar o export
export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  // botão de voltar (função p voltar p página inicial onde tem todas as notas):
  // com o -1 no meu histórico de navegação eu vou voltar p rota anterior (ao invés de adicionar mais uma rota)
  // como ta fazendo antes com navigate("/")
  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    // aqui vai guardar um verdadeiro ou falso:
    const confirm = window.confirm("Deseja realmente remover a nota?");

    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  // useEffect p buscar informações da nota:
  // nao vou colocar dependencias pq quero que carregue apenas uma vez
  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      // colocar dentro de setData os detalhes da nota:
      setData(response.data);
    }

    fetchNote();
  }, []);
  // dentro do return fica o conteúdo da nossa interface

  // regra react: um componente pode retornar no máx um único elemento, mas dentro desse único elemento podem ter qnts elementos quiser
  // p resolver essa regra eu posso usar uma div p envolver todos os elementos (qnd quero ja aplicar algum estilo específico)
  // ou qnd nao quero botar estilo eu uso o fragment: <> </>
  return (
    <Container>
      <Header></Header>
      {
        // só vou mostrar o main se tiver conteúdo dentro dele:
        data && (
          <main>
            <Content>
              <ButtonText
                title="Excluir Nota"
                onClick={handleRemove}
              ></ButtonText>

              <h1>{data.title}</h1>

              <p>{data.description}</p>
              {
                // só renderizo essa sessão se existirem links p renderizar:
                data.links && (
                  <Section title="Links úteis">
                    <Links>
                      {data.links.map((link) => (
                        <li key={String(link.id)}>
                          <a href={link.url} target="_blank">
                            {link.url}
                          </a>
                        </li>
                      ))}
                    </Links>
                  </Section>
                )
              }

              {data.tags && (
                <Section title="Marcadores">
                  {data.tags.map((tag) => (
                    <Tags key={String(tag.id)} title={tag.name}></Tags>
                  ))}
                </Section>
              )}

              {/* pra definir uma propriedade p um componente, tem q colocar na tag de abertura, da forma q ta aqui embaixo: */}
              {/* o loading é um boolean, então basta colocar a palavra loading só */}

              <Button title="Voltar" onClick={handleBack}></Button>
            </Content>
          </main>
        )
      }
    </Container>
  );
}
