import http from "./httpService";
import config from "../config.json";



export function registered(user){
   const apiEndpoint= config.apiUrl+"/users";
   return http.post(apiEndpoint,user);
}


export function login(user){
   return http.post(config.apiUrl+"/auth",{email:user.username,password:user.password});
}