// Styled Components
import styled from "styled-components";

// dessa forma que crio um componente utilizando styled component:
// dentro dessa const to armazenando um elemento html (uma div)
// e ai posso estilizar essa div como eu quiser:
// preciso colocar o export pra dps importar onde eu quiser utilizar:
export const Container = styled.div`
  /* quero q meu container ocupe 100% da pagina: */
  width: 100%;
  height: 100vh;

  /* criar display grid aqui p dizer aonde cada parte do layout vai se encaixar */
  display: grid;
  /* uma linha p cabeçalho e uma linha p conteúdo: */
  /* a primeira vai ter uma altura de 105 e o restante vai ser definido automaticamente pelo conteúdo q tiver: */
  grid-template-rows: 105px auto;
  /* nomes das linhas: */
  grid-template-areas:
    "header"
    "content";

  > main {
    grid-area: content;
    /* qnd o conteúdo nao couber mais na vertical, quero q apareça uma barra pra fazer scroll: */
    overflow-y: scroll;
    padding: 64px 0;
  }
`;

export const Links = styled.ul`
  list-style: none;

  /* p cada item da lista: */
  > li {
    margin-top: 12px;

    /* cor dos links da lista: */
    a {
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`;

// fiz um Content aqui separado pq a main vai ocupar a tela toda como uma referência
// mas o Content vai ter uma largura máx de 550px:
export const Content = styled.div`
  max-width: 550px;
  /* estratégia p levar todo o conteúdo p centro da tela: */
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  /* primeiro filho do Content (q é um botão): */
  > button:first-child {
    align-self: end;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500;
    padding-top: 64px;
  }

  > p {
    font-size: 16px;
    margin-top: 16px;
    text-align: justify;
  }
`;
