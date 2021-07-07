import React, {Component} from 'react';
import Buscador from './Componentes/Buscador';
import Resultado from './Componentes/Resultado';

class App extends Component {

  // state es un objeto muchos ponen constructor(){} y dentro de los parentesis el state
  state = {
    termino : '',
    imagenes : [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }


  paginaAnterior = () => {
    //leerel state de la pagina actual
    let pagina = this.state.pagina;
    // si la pagina es uno, ya no ir hacia atras
    if(pagina === 1) return null;
    // resta 1 a la apagina actual
    pagina -=1;
    // agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    //console.log(pagina);

  }
  paginaSiguiente = () => {
    //leerel state de la pagina actual
    let pagina = this.state.pagina;
    // sumar 1 a la apagina actual
    pagina ++;
    // agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    //console.log(pagina);


  }


  //verificar por que no toma la imagen
  consultarApi = () => {
    const termino = this.state.termino;

    const pagina = this.state.pagina;

    const url = `https://pixabay.com/api/?key=22238594-3e8f0a433b8c2457428cdf082&q=${termino}&per_page=40&page=${pagina}`;

    console.log(url);
    fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => this.setState({imagenes : resultado.hits}) )

    

  }

  datosBusqueda = (termino) => {
   this.setState({
     termino : termino,
     pagina : 1
     }, () => {
     this.consultarApi();
   })
  }
  render() {
  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Buscador 
        datosBusqueda={this.datosBusqueda}
        
        />
      </div>
     <div className="row justify-content-center">
        <Resultado 
        imagenes={this.state.imagenes}
        paginaAnterior={this.paginaAnterior}
        paginaSigueinte={this.paginaSiguiente}


        
        />
     </div>
    </div>
  );
  }

}



export default App;
