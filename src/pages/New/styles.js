import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  /* uma linha de 105px pro cabeçalho e automatico p restante: */
  grid-template-rows: 105px auto;
  grid-template-areas:
    "header"
    "content";

  /* fazendo isso, só o conteúdo tem scroll e o cabeçalho fica fixo na tela: */
  > main {
    grid-area: content;
    overflow-y: auto;
  }

  .tags {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export const Form = styled.form`
  max-width: 550px;
  margin: 38px auto;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 36px;

    button {
      font-size: 20px;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }
  }
`;
