// arquivo p deixar as configurações do axios:

import axios from "axios";

export const api = axios.create({
  // com a propriedade baseUrl eu posso incluir a parte do endereço da api que se repete em todas as requisições:
  //   pq ai qnd for fazer as requisições eu nao preciso ficar digitando esse localhost
  baseURL: "http://localhost:3333",
});
