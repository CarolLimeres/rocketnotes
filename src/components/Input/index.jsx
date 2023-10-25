/* eslint-disable react/prop-types */
import { Container } from "./styles";

// p eu conseguir usar o ícone e cumprir a regra do react de usar componente com letra maiúscula eu faço isso do icon: Icon
export function Input({ icon: Icon, ...rest }) {
  return (
    <Container>
      {/* o && faz com q só mostre o ícone se de fato ele existir */}
      {Icon && <Icon size={20} />}
      {/* aqui to passando todo restante de propriedades pro input (por ex, tipo do input se é text, email...) */}
      <input {...rest} />
    </Container>
  );
}
