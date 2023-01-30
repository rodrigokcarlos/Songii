import axFetch from "./Api";

export default function Pesquisar() {

    const buscarMusica = "/search";

    const options = {
      method: "GET",
      url: buscarMusica,
      params: { q: param },
      headers: {
        "X-RapidAPI-Key": "9815fa8f84msh2b22f10503aa3a4p1a9e95jsn3697d76ee3a1",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    axFetch
      .request(options)
      .then(function (saida) {
        const data = saida.data.data;
        setMusica(data);
      })
      .catch(function (error) {
        console.error(error);
      });
}