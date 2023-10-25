// sempre começar os estilos com essa importação:
import styled from "styled-components";

export const Container = styled.button`
  width: 100%;
  /* desestruturar o tema (acessar as propriedades dele, nesse caso, a cor laranja q defini em theme) */
  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

  height: 56px;
  border: 0;
  /* 0 em cima e embaixo e 16 dos lados */
  padding: 0 16px;
  margin-top: 16px;
  border-radius: 10px;
  /* tamanho médio de texto, nem bold e nem regular */
  font-weight: 500;

  /* qnd botão tiver desabilitado: */
  &:disabled {
    opacity: 0.5;
  }
`;
