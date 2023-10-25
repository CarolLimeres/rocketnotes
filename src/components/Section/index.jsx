/* eslint-disable react/prop-types */
import { Container } from "./styles";

// propriedades title e children:
export function Section({ title, children }) {
  return (
    <Container>
      <h2>{title}</h2>
      {/* o children vai pegar tudo que tem no section (dps do title), entao ta pegando tudo q tem dentro e repassando dps do h2 */}
      {children}
    </Container>
  );
}
