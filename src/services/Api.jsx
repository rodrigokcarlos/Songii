import axios from "axios";

export const axFetch = axios.create({
  baseURL: 'https://deezerdevs-deezer.p.rapidapi.com',
});
export function gerarOpcoes(opcao = '') {
  return {params: { q: opcao },
  headers: {
    "X-RapidAPI-Key":
      "9815fa8f84msh2b22f10503aa3a4p1a9e95jsn3697d76ee3a1",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  }}
};
