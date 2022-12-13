import React from 'react'
import { useState,useEffect } from 'react'
import { Badge,StarIcon,Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel,Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Box,Image } from '@chakra-ui/react'

const publicacionesAdmi = () => {

    const [publicaciones, setPublicaciones] = useState([])

	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicacionesAdmi`)
		setPublicaciones(response.data)
	}

    useEffect(() => {
		getPublicaciones()
	}, [])

    const onChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

    const mostrarPublicaciones = () => {
		return publicaciones.map(publicaciones => {
			return (
      <Box  borderWidth='2px' borderRadius='lg' >
		<Select placeholder=' ' size='xs' onChange={onChange}>
		<option value='eliminar'>Eliminar</option>
  		<option value='editar'>Editar</option>
		</Select>
        <Image src= 'https://bit.ly/dan-abramov' />
				<Box p='2' key={publicaciones._id}>
          <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='200'>
                {publicaciones.createdAt}</Box>
					<Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              noOfLines='1'>
                {publicaciones.titulo}</Box>
					<Box>Descripcion: {publicaciones.descripcion}</Box>
                    <Box>Etiqueta: {publicaciones.etiqueta}</Box>
                    <Box>Estado: {publicaciones.estado}</Box>
                    <Box>Numero de dia visible: {publicaciones.diasVisible}</Box>
                    <Box>Fecha Expiracion: {publicaciones.fechaExp}</Box>
                    <Box>ID Usuario: {publicaciones.idUsuario}</Box>
				<Box
              as='span' 
              color='gray.600' 
              fontSize='sm'>
                {publicaciones.cantLikes} likes</Box>
				</Box>
      </Box>
			)
		})
	}

    return (

        <Container>
            {mostrarPublicaciones()}
        </Container>
    )
}

export default publicacionesAdmi