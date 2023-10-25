/* eslint-disable react/prop-types */
import { Container } from "./styles";
import { Tags } from "../Tags";

// como são várias propriedades q vou querer receber, eu vou criar um objeto chamado data, e todo restante vou acessar pelo ...rest
export function Note({ data, ...rest }) {
  return (
    <Container {...rest}>
      {/* título da nota: */}
      <h1>{data.title}</h1>

      {/* renderizar as tags somente se elas existirem: (com o &&) */}
      {data.tags && (
        <footer>
          {/* caso as tags existam, vou fazer um map: vou percorrer cada tag */}
          {/* p cada tag eu vou ter um componente Tags e é importante ter a key qnd estamos trabalhando com listas
            p identificar q cada elemento é único (cada tag vai ter um id) */}
          {data.tags.map((tag) => (
            <Tags key={tag.id} title={tag.name} />
          ))}
        </footer>
      )}
    </Container>
  );
}
