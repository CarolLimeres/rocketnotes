/* eslint-disable react/prop-types */
import { FiPlus, FiX } from "react-icons/fi";

import { Container } from "./styles";

// propriedade isNew é p saber se é p adicionar um novo item
export function NoteItem({ isNew, value, onClick, ...rest }) {
  return (
    // com o isNew={isNew} eu to passando uma propriedade p dentro do componente no styled component
    // assim eu to passando essa propriedade p meu Container q vou usar no styled component
    <Container isNew={isNew}>
      {/* o readyOnly é somente leitura, ou seja, dps q eu adicionar eu nao posso editar */}
      <input type="text" value={value} readOnly={!isNew} {...rest} />

      <button
        type="button"
        onClick={onClick}
        className={isNew ? "button-add" : "button-delete"}
      >
        {/* se é novo, aparece o ícone de adicionar, senão aparece o de fechar: */}
        {isNew ? <FiPlus></FiPlus> : <FiX></FiX>}
      </button>
    </Container>
  );
}
