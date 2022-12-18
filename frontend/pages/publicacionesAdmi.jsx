import React from 'react'
import { useState,useEffect } from 'react'
import { Badge,StarIcon,Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel,Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Box,Image } from '@chakra-ui/react'
import publicacion from '../../backend/models/publicacion'
import {Menu,MenuButton,MenuList,MenuItem} from '@chakra-ui/react'


const publicacionesAdmi = () => {

    const [publicaciones, setPublicaciones] = useState([])

	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicacionesAdmi`)
		setPublicaciones(response.data)
	}

    useEffect(() => {
		getPublicaciones()
	}, [])




  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState({
		idPubli: ''
	})


  const onSelect = async (e) => {


    e.preventDefault()
    console.log("aa"+publicacionSeleccionada.idPubli)
    console.log(publicacionSeleccionada.idPubli)
    
		if(e.target.value=="eliminar"){
			//const response = await axios.delete(`${process.env.API_URL}/publicacion/`)
      try {
        const response = await axios.delete(`${process.env.API_URL}/publicacion/`, values) //values tiene que tener idPublicacion para eliminar
        console.log(response)
        if (response.status === 201) {
          Swal.fire({
            title: 'Publicacion eliminada',
            text: 'La publicacion se ha eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            router.push('/')
          })
  
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un errorzzz', //
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }

		}
		if(e.target.value=="editar"){
			console.log("vamos a editar")
		}
		// sirve para que los atributos del useState sean inicializados desde el placeholder
	}

  

    const mostrarPublicaciones = () => {
		return publicaciones.map(publicacion => {
			return (
      <Box  borderWidth='2px' borderRadius='lg' >
		<Select placeholder=' ' size='xs' onChange={onSelect}>
		<option value='eliminar'>Eliminar</option>
  		<option value='editar'>Editar</option>
		</Select>
        <Image src= 'https://bit.ly/dan-abramov' left="50%"/>
				<Box p='2' key={publicacion._id} >
          <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='200'>
                {publicacion.createdAt}</Box>
					<Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              noOfLines='1'>
                ID Publicacion: {publicacion._id}</Box>
                <Box>Titulo: {publicacion.titulo}</Box>
					<Box>Descripcion: {publicacion.descripcion}</Box>
                    <Box>Etiqueta: {publicacion.etiqueta}</Box>
                    <Box>Estado: {publicacion.estado}</Box>
                    <Box>Numero de dia visible: {publicacion.diasVisible}</Box>
                    <Box>Fecha Expiracion: {publicacion.fechaExp}</Box>
                    <Box>ID Usuario: {publicacion.idUsuario}</Box>
				<Box
              as='span'
              color='gray.600'
              fontSize='sm'>
                {publicacion.cantLikes} likes</Box>
				</Box>
      </Box>
			)
		})
	}

    return (
<VStack>
  <Menu>
    <MenuButton as={Button} right="49%">
      =
    </MenuButton>
      <MenuList>
        <MenuItem>Ver publicaciones reportadas</MenuItem>
        <MenuItem>Mi perfil</MenuItem>
        <MenuItem></MenuItem>
      </MenuList>
  </Menu>

      <Container>
        {mostrarPublicaciones()}
      </Container>
</VStack>

    )
}

export default publicacionesAdmi