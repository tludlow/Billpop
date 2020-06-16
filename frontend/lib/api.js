import axios from 'axios'

//The URL for the API which is the standard part, all endpoints are additions to this API
//const LOCAL_TESTING = "http://localhost:6789"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN
//Request/response default settings
let config = {
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
}

//Create a new instance of the axios library using these settings configured.
let instance = axios.create(config)
export default instance
