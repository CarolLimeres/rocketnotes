import styled from "styled-components";

export const Container = styled.button`
  background: none;
  /* aqui to recuperando a propriedade q passei pro componente no index.jsx */
  /* se tiver ativo vai ser laranja, senao vai ser outra cinza: */
  color: ${({ theme, isActive }) =>
    isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};

  border: none;
  font-size: 16px;
`;
