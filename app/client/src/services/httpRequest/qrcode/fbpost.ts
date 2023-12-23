import axios from 'axios';


export const fbPost = async () => {

    try {

       await axios.post('http://localhost:5000/fb/post', { url: 'https://docs.nestjs.com/techniques/http-module#getting-started' })

    } catch (error) {
        console.error(error)
    }
}
