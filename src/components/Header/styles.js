import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  /* p header ficar fixo na tela, por mais q faça scroll p baixo: */
  grid-area: header;

  height: 105px;
  /* p ocupar 100% do q tiver disponível na tela */
  width: 100%;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  /* p q os elementos na horizontal fiquem cada um em uma extremidade */
  justify-content: space-between;

  padding: 0 80px;
`;

export const Profile = styled(Link)`
  display: flex;
  /* p garantir q a imagem e o texto vao ficar centralizados */
  align-items: center;

  /* o > serve p garantir q vou estilizar a imagem q ta dentro do componente de Profile (p garantir q nao vou mexer com imagens de outros contextos): */
  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    /* aqui nao preciso colocar o > pq ja ta com um nível de especeficidade grande (ja indiquei q é o span da div q ta dentro de Profile) */
    span {
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    strong {
      font-size: 18px;
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`;

export const Logout = styled.button`
  border: none;
  background: none;

  /* RiShutDownLine - ícone de desligar: */
  > svg {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 36px;
  }
`;
