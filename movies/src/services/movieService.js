import http from "./httpService";
import config from "../config.json";

export function getmovies() {
  return http.get(config.apiUrl + "/movies");
}

export function deleteMovies(movieId){
    return http.delete(config.apiUrl + "/movies/" +movieId)
}

export function postMovies(data){
  return http.post(config.apiUrl+ "/movies",data)
  
}

export function updateMovie(movieId, data){
  return http.put(config.apiUrl+ "/movies/"+movieId, data)
}