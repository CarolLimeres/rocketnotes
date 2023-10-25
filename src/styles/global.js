// estilos p toda a aplicação
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
/* css reset: */
* {
    margin: 0;
    padding: 0;
    /* box sizing border box p evitar q qnd, por ex, eu aplique um padding interno q isso influencie no tamanho total do elemento */
    box-sizing: border-box;
}

body {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    color: ${({ theme }) => theme.COLORS.WHITE};

    /* deixar as fontes mais suaves: */
    -webkit-font-smoothing: antialiased;
}

body, input, button, textarea {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
    /* remover qualquer linha em contornos em volta: */
    outline: none;
}

a {
    text-decoration: none;
}

button, a {
    cursor: pointer;
    transition: filter 0.2s;
}

button:hover, a:hover {
    /* vai dar uma escurecida no hover dos botões e dos links: */
  filter: brightness(0.9);
}
`;
