import axFetch from "./Api";


export default function puxarDados(props) {
    const playListBase = "/playlist/1111141961";
  
    const options = {
    method: "GET",
    url: playListBase,
    headers: {
      "X-RapidAPI-Key": "9815fa8f84msh2b22f10503aa3a4p1a9e95jsn3697d76ee3a1",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
    };
    axFetch
    .request(options)
    .then(function (saida) {
      const data = saida.data.tracks.data;
      props.setMusica(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}