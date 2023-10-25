/* eslint-disable react/prop-types */
// importar os estilos:
import { Container } from "./styles";

// p recuperar uma propriedade passada p um componente eu tenho q colocar entre os () { nomepropriedade }
// ou entre os () colocar a palavra props
// nesse caso as propriedades tão definidas no index.jsx de details
// o ...rest serve p nao precisar dizer todas as propriedades do botao
// caso a propriedade loading nao seja informada, o valor padrão vai ser de false (boa prática)
export function Button({ title, loading = false, ...rest }) {
  return (
    <Container
      type="button"
      // se o loading for verdadeiro desabilita o botão:
      disabled={loading}
      {...rest}
    >
      {/* aqui tem q colocar {nomepropriedade} p exibir o conteúdo de uma propriedade */}
      {/* ou colocar {props.nomepropriedade} p exibir o conteúdo de uma propriedade */}
      {/* se loading for verdadeiro eu quero q apareça a mensagem Carregando, senao aparece o conteudo da propriedade title */}
      {loading ? "Carregando..." : title}
    </Container>
  );
}
