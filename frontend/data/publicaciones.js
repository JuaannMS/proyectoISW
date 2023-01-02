import axios from 'axios'


const getPublicacionesP = async(id) => {
    const response = await axios.get(`${process.env.API_URL}/publicacionesP/${id}`)
    console.log(response.data)
    return response
}

module.exports = (
    getPublicacionesP
)