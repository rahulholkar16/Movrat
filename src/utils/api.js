import axios from 'axios'

// const BASE_URL = "https://api.themoviedb.org/3/";
// const TMDB_TOKEN = import.meta.env.VITE_APP_API_TOKEN
// const headers = {
//     Authorizatio : 'bearer'  + TMDB_TOKEN
// }

// export const fetchDataFromapi = async(url, params)=>{
//     try {
//         const {data} = await axios.get(BASE_URL + url, {heder: headers, param: params})
//         return data;
//     } catch (err) {
//         console.log(err)
//         return err;
//     }
// }

// **************************************OR*************************************


export const fetchDataFromapi = async (BASE_URL)=>{
    const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/'+BASE_URL,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN
    },
};

    return new Promise((resolv, reject)=> {
        axios
        .request(options)
        .then(function (response) {
            resolv(response.data);
            return response.data
        })
        .catch(function (error) {
            console.error(error);
            reject(error)
            return error
        });
    })
}