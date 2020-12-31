import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl)//fetch is a promised base api 
    .then(handleResponse)
    .catch(handleError);
}
