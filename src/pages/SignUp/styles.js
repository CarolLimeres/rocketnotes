import styled from "styled-components";
import backgroundImg from "../../assets/photo.jpg";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Form = styled.form`
  /* 0 em cima e embaixo e 136 dos lados: */
  padding: 0 136px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  > h1 {
    font-size: 48px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > h2 {
    font-size: 24px;
    /* 48px cima e baixo e 0 dos lados */
    margin: 48px 0;
  }

  > p {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  > a {
    margin-top: 124px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`;

export const Background = styled.div`
  /* flex de 1 p q a imagem possa ocupar todo o espaço q tem disponível ali: */
  flex: 1;
  /* p pegar a imagem q ja importei ali em cima: */
  background: url(${backgroundImg}) no-repeat center center;
  /* cover pra q a imagem fique bem preenchida: */
  background-size: cover;
`;
