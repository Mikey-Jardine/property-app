import axios from "axios";

const baseUrl = "https://localhost:44335";

export default {

    home(url = `${baseUrl}/GetAllHomes`){
        return {
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(`${baseUrl}/GetHome/${id}`),
            create : newRecord => axios.post(`${baseUrl}/CreateHome`, newRecord),
            update: (id, updateRecord) => axios.put(`${baseUrl}/UpdateHome/${id}`, updateRecord),
            delete: id => axios.delete(`${baseUrl}/DeleteHome/${id}`)
        }
    }
}