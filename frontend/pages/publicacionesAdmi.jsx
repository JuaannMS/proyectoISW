import React from 'react'
import { useState,useEffect } from 'react'
import { useDisclosure,ChakraProvider,Badge,StarIcon,Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel,Select, VStack, Modal, ModalHeader,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,ModalFooter} from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Box,Image } from '@chakra-ui/react'
import {Menu,MenuButton,MenuList,MenuItem,Lorem} from '@chakra-ui/react'
import styles from '../components/publicaciones.module.css'
import Router from "next/router";

const publicacionesAdmi = () => {

    const [publicaciones, setPublicaciones] = useState([])

	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicacionesAdmi`)
		setPublicaciones(response.data)
	}

    useEffect(() => {
		getPublicaciones();
	}, [])
  

  const onEliminar = async (idPublicacion) => {
      console.log(idPublicacion)
			//const response = await axios.delete(`${process.env.API_URL}/publicacion/`)
      try {
        const response = await axios.delete(`${process.env.API_URL}/publicacion/delete/${idPublicacion}`) //values tiene que tener idPublicacion para eliminar
        console.log(response)
        if (response.status === 200) {
          Swal.fire({
            title: 'Publicacion eliminada',
            text: 'La publicacion se ha eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            //router.push('/publicaciones')
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



  const pushCrearPublicacion = () => {
		Router.push("/crearPublicacion")
	}

  const pushPublicacionesReportadas = () => {
		Router.push("/publicacionesReportadas")
	}

  const pushVerMisPublicaciones = () =>{
		Router.push("/verMisPublicaciones")
	}

  const editarPublicacion = () => {
    Router.push("/verMisPublicaciones")
  }

    const mostrarPublicaciones = () => {
		return publicaciones.map(publicacion => {
			return (
      <Box  borderWidth='2px' borderRadius='lg' >
         <Select placeholder=' '>
            <option value='option1'>Reportar</option>
            <option value='option2'>Editar</option>
            <option onChange={() => onEliminar(publicacion._id)}>Eliminar</option>
            <option value='option3'>Favoritos</option>
          </Select> 
        <Box color='red'>Estado: {publicacion.estado}</Box>
        <Image src= 'https://bit.ly/dan-abramov' className={styles.postImage}/>
				<Box p='2' key={publicacion._id} >
          <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='200'>
                {publicacion.fechaCreacion}</Box>
					        <Box
                  mt='1'
                  fontWeight='semibold'
                  as='h4'
                  lineHeight='tight'
                  noOfLines='1'>
                  ID Publicacion: {publicacion._id}</Box>
                  <Box>Usuario Nombre: {publicacion.nombreUsuario}</Box>
                  <Box>Titulo: {publicacion.titulo}</Box>
					        <Box>Descripcion: {publicacion.descripcion}</Box>
                  <Box>Etiqueta: {publicacion.etiqueta}</Box>
                  <Box>Numero de dia visible: {publicacion.diasVisible}</Box>
                  <Box>Fecha Expiracion: {publicacion.fechaExp}</Box>
                    
				<Box
              as='span'
              color='gray.600'
              fontSize='sm'>
                {publicacion.cantLikes} likes</Box>
              <HStack className={styles.publicacionLabelHorizontal}>
                <Button > Editar</Button>
                <Button  onClick={() => onEliminar(publicacion._id)}> Eliminar</Button>
                <Button> Reportar</Button>
              </HStack>
				</Box>
      </Box>
			)
		})
	}

  function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Lorem count={2} />
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

    return (
<VStack>
  <Menu>
    <MenuButton as={Button}  className={styles.botonIzquierdaSup}>
      =
    </MenuButton>
      <MenuList>
        <MenuItem onClick={pushPublicacionesReportadas}>Ver publicaciones reportadas</MenuItem>
        <MenuItem onClick={pushCrearPublicacion}>Crear Publicacion</MenuItem>
        <MenuItem onClick={pushVerMisPublicaciones}>Mis Publicaciones</MenuItem>
        <MenuItem>Mi perfil</MenuItem>
      </MenuList>
  </Menu>
      <ChakraProvider>
        <BasicUsage/>
      </ChakraProvider>
      <Container>
        {mostrarPublicaciones()}
      </Container>
</VStack>

    )
}


export default publicacionesAdmi