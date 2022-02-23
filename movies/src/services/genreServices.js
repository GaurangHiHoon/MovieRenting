import http from "./httpService";
import config from "../config.json";

export function genreServices(){
    return http.get(config.apiUrl+"/genres");
}