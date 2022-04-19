const BASE_URL = 'https://ghibliapi.herokuapp.com/films/';
import axios from 'axios';

export async function getFilms(params) {
  let data = [];
  await axios.get(BASE_URL, { params })
  .then((result) => {
    data = result.data
  });

  return data;
}


export async function getFilm(id) {
  let data = [];
  await axios.get(`${BASE_URL}/${id}`)
  .then((result) => {
    data = result.data
  });

  return data;
}

export default {
  getFilms,
  getFilm
}