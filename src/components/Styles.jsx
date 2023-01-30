import styled from 'styled-components';

export const ListaDeMusicas = styled.div`
    
    height:70px;
    display: flex;
    align-items: center;
    transition: 0.2s ease;
    border-top: 2px solid #f1f3f4;
    border-bottom: 2px solid #f1f3f4;
    :hover{
        border-top: 2px solid #999;
        border-bottom: 2px solid #999;
    }
    div{
        flex: 1;
        display: flex;
        align-items: center;
        font-family: 'Roboto';
        padding-left: 10px;
    }

    a{
        text-decoration:none;
        color: black;
        align-items: center;
        display: flex;
        transition: 0.2s ease;
    }
    a:hover{
        color: #999;
    }
    video{
        width: 180px;
        height: 30px;
    }
`
export const TituloDeMusica = styled.div`
    height:70px;
    display: flex;
    align-items: center;
    transition: 0.2s ease;
    border-top: 2px solid #f1f3f4;
    border-bottom: 2px solid #f1f3f4;
    div{
        flex: 1;
        display: flex;
        align-items: center;
        font-family: 'Roboto';
        padding-left: 10px;
    }
    .musicatitulo{
        flex: 2;
    }
    .artistatitulo{
        flex: 2;
    }
    .favtitulo{
        flex: 2;
    }
`
export const CorpoMeio = styled.div `
    width: 100%;
`

export const CapaAlbum = styled.img`
    height: 50px;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    flex-direction: column;
    width: 100%;   
`;

export const Busca = styled.input`
  border-color: tomato;
  height: 40px;
  width: 300px;
  border-radius: 7px;
  padding-left: 10px;
  outline: none;
  font-size: 16px;
`;

