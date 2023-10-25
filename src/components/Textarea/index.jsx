/* eslint-disable react/prop-types */
import { Container } from "./styles";

export function Textarea({ value, ...rest }) {
  return (
    <Container {...rest}>
      {/* valor q vai ser digitado no textarea: */}
      {value}
    </Container>
  );
}
