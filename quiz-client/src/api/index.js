import axios from "axios";
export const BASE_URL =     'http://localhost:5190/'

export const ENDPOINT = {
    participant: "Participant",
    question: "Question",
    getAnswers: 'Question/getAnswers'
}


export const createAPIEndpoint = (endpoint) => {
    let url = BASE_URL + 'api/' + endpoint + '/';
    return{
        fetch: () => axios.get(url),
        fetchById: (id) => axios.get(url + id),
        post: (newRecord) => axios.post(url, newRecord),        
        delete: (id) => axios.delete(url + id),
        put:(id, updateRecord) => axios.put(url + id, updateRecord),
    }
}