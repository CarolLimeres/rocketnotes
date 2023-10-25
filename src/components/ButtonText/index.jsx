/* eslint-disable react/prop-types */
import { Container } from "./styles";

// receber como prorpriedades o title e qualquer restante de propriedades q a gente passar
export function ButtonText({ title, isActive = false, ...rest }) {
  return (
    // importante indicar q é type button pq existem outros tipos de botões, por ex de submit
    <Container type="button" isActive={isActive} {...rest}>
      {title}
    </Container>
  );
}
