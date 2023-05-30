//variables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Event Listener 
eventListeners();

function eventListeners() {
  //cuando el usuario agrega nuevo tuit 
  formulario.addEventListener('submit', agregarTweet)

  // cuando el doc está listo 
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    console.log(tweets)
    crearHTML();
  });
}


// Funciones 
function agregarTweet(e) {
  e.preventDefault();

  //textarear donde el usuario escribe 
  const tweet = document.querySelector('#tweet').value;

  //validacion 
  if (tweet === '') {
    mostrarError('Un mensaje no puede ir vacio');
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet
  }

  tweets = [...tweets, tweetObj];

  crearHTML();
  formulario.reset();
}

//mostrar mensaje de error 

function mostrarError(error) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  //insertar en el contenido 
  const contenido = document.querySelector('#contenido');

  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearHTML() {

  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach(tweet => {
      // creando boton de eliminar 

      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.innerText = 'X';

      //añadiendo la funcion de eliminar 
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      }

      //creando el html 
      const li = document.createElement('li');

      //añadiendo el texto 
      li.innerText = tweet.tweet;

      //asigna boton eliminar 
      li.appendChild(btnEliminar);

      //insertar en el html 
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter(tweet => tweet.id != id)
  crearHTML();
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

