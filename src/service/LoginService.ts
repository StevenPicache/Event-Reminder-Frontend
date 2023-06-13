import axios from 'axios';

const API_URL = '/login'


export default  {
    async loginUser(userName: string, password:string) {

        console.log(`REACHED THE SERVICE ${userName}${password}`);
        const path = `${API_URL}/${userName}${password}`;
        return axios.get('https://jsonplaceholder.typicode.com/posts');
    }
}