import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Center } from '@chakra-ui/react'

const imagenPublicacion = () => {
    const router = useRouter()
    const id = router.query.imagenPublicacion
    const [imagen, setImagen] = useState()
    //  const base64 = Buffer.from(response.data, 'binary').toString('base64')

    // const response = await axios.get(`${process.env.API_URL}/file/get/download/${context.query.imagenId}`, { responseType: 'arraybuffer' })

    const cargarImagen = async (idImagen) => {
        const response = await axios.get(`${process.env.API_URL}/file/get/download/${idImagen}`, { responseType: 'arraybuffer' }).then((response) => {
            const base64 = Buffer.from(response.data, 'binary').toString('base64')
            setImagen(base64)
        }).catch((err) => {
            console.log(err)
        })
    }

    const imagenesPublicacion = async () => {
        if (!id) return
        const response = await axios.get(`${process.env.API_URL}/file/get/${id}`).then((res) => {
            cargarImagen(res.data[0]._id)
        }).catch((err) => {
            console.log(err)
        })
    }

    imagenesPublicacion()

    return (<>
    <Center>
        <img src={`data:image/jpeg;base64,${imagen}`} display='auto'/>
    </Center>
        
    </>)

}

export default imagenPublicacion