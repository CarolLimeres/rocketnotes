/* eslint-disable react/prop-types */
import { Container } from "./styles";

// como to passando uma chave la no index.jsx de Note, aqui tb tenho q passar o ...rest (p pegar essa propriedade de chave q torna o elemento único)
export function Tags({ title, ...rest }) {
  return <Container {...rest}>{title}</Container>;
}
