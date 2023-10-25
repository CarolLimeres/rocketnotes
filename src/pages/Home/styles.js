import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  /* duas colunas: a primeira vai ter 250px (menu) e o resto vai ser automático */
  grid-template-columns: 250px auto;
  /* 4 linhas: a primeira vai ser de 105px, a segunda vai ser o search, a penultima vai ser auto e a última (botao criar) 64px */
  grid-template-rows: 105px 128px auto 64px;
  /* dizer como vou distribuir as áreas do meu grid: */
  grid-template-areas:
    "brand header"
    "menu search"
    "menu content"
    "newnote content";

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
`;

export const Brand = styled.div`
  /* aqui to dizendo em qual área do grid ele vai ficar: (defini as áreas no Container): */
  grid-area: brand;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  > h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`;

export const Menu = styled.ul`
  grid-area: menu;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  padding-top: 64px;
  text-align: center;

  > li {
    margin-bottom: 24px;
  }
`;

export const Search = styled.div`
  grid-area: search;
  /* espaçamento de 64 em cima 64 dos lados e 0 embaixo: */
  padding: 64px 64px 0;
`;

export const Content = styled.div`
  grid-area: content;
  padding: 0 64px;
  /* o auto vai fazer com q a barra de scroll só apareça qnd tiver conteúdo p isso */
  overflow-y: auto;
`;

export const NewNote = styled(Link)`
  grid-area: newnote;

  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 8px;
  }
`;
