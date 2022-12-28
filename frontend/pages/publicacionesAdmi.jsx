import React from 'react'
import { useState,useEffect } from 'react'
import {ChakraProvider,Badge,StarIcon,Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel,Select, VStack, Modal, ModalHeader,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,ModalFooter} from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Box,Image } from '@chakra-ui/react'
import {Menu,MenuButton,MenuList,MenuItem,Lorem} from '@chakra-ui/react'
import styles from '../components/publicaciones.module.css'
import Router from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import comprobarCookies from "../utils/comprobarCookies";
import Cookies from "universal-cookie";

const publicacionesAdmi = () => {

  const cookies = new Cookies();
  const [id, setId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [publicaciones, setPublicaciones] = useState([])
  const [values, setValues] = useState()
  const router = useRouter();


	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicacionesAdmi`)
		setPublicaciones(response.data)
	}

    useEffect(() => {
		getPublicaciones();
    setId(cookies.get("id"));
	}, [])


  const onCambio = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		})
	}

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

  const onChange = async (event,idPublicacion)=> {

    if(event.target.value=='eliminar'){

      try {
        const response = await axios.delete(`${process.env.API_URL}/publicacion/delete/${idPublicacion}`) //values tiene que tener idPublicacion para eliminar
        console.log(response)
        if (response.status === 200) {
          Swal.fire({
            title: 'Publicacion eliminada',
            text: 'La publicacion se ha eliminado correctamente',
            icon: 'success',
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

    if(event.target.value=='reportar'){

    }

    if(event.target.value=='favoritos'){

    }
    
  }

  const pushCrearPublicacion = () => {
		Router.push("/crearPublicacion")
	}

  const pushPublicacionesReportadas = () => {
		Router.push("/publicaciones/reportadas")
	}

  const pushVerMisPublicaciones = () =>{
		router.push(`/publicaciones/personales/${id}`)
	}

  const editarPublicacion = () => {
    Router.push("/verMisPublicaciones")
  }

  const onGuardar = async (idPublicacion) => {
      console.log(values)
      console.log("jaja")
      console.log(idPublicacion)
      try {
        const response = await axios.put(`${process.env.API_URL}/publicacion/update/${idPublicacion}`, values)
        console.log(response)
        if (response.status === 200) {
          Swal.fire({
            title: 'Publicacion modificada',
            text: 'La publicacion se ha modificado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            //router.push('/publicacionesAdmi') //refrescar pagina
          })
  
        }
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  

    const mostrarPublicaciones = () => {
		return publicaciones.map(publicacion => {
			return (
        
      <Box  borderWidth='2px' borderRadius='lg' >
         <Select placeholder=' ' onChange={() => onChange(event,publicacion._id)} name="opcionElegida" >
            <option value='reportar'>Reportar</option>
            <option value='eliminar'>Eliminar</option>
            <option value='favoritos'>Favoritos</option>
          </Select> 
        <Box color='red'>Estado: {publicacion.estado}</Box>
        <Image src= 'https://bit.ly/dan-abramov' className={styles.postImage}/>
				<Box p='2' key={publicacion._id} >
                
					        <Box
                  mt='1'
                  fontWeight='semibold'
                  as='h4'
                  lineHeight='tight'
                  noOfLines='1'>
                  ID Publicacion: {publicacion._id}</Box>
                  <Box>Nombre Usuario: {publicacion.nombreUsuario}</Box>
                  <Box>Fecha creacion:{publicacion.fechaCreacion}</Box>
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

                <Button onClick={onOpen} > Editar</Button>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    scrollBehavior="inside"
                  	>
					<ModalOverlay />
					<ModalContent>
						<HStack className={styles.publicacionLabelHorizontal}>
							<ModalHeader>
                        	Editar_Publicacion
                      		</ModalHeader>
							
							<ModalFooter>
                        	<Button colorScheme="red" onClick={onClose}>
                          X
                        	</Button>
                      </ModalFooter>
						
						</HStack>
					
					<FormControl isRequired>
						<FormLabel>Titulo</FormLabel>
						<Input placeholder="Ingrese un titulo" type={"text"} onChange={onCambio} name={"titulo"} />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Descripcion</FormLabel>
						<Textarea placeholder="Ingrese una descripcion" type={"text"} onChange={onCambio} name="descripcion" />
					</FormControl>

					<FormControl>
						<FormLabel>Etiqueta</FormLabel>
						<Input placeholder="Ingrese una etiqueta" type={"text"} onChange={onCambio} name="etiqueta" />
					</FormControl>
          
					<Button
                              colorScheme="blue"
                              size="md"
                              type="submit"
                              my={2}
                              onClick={() => {
                                onGuardar(publicacion._id)
                                  onClose();
                              }}
                            >
                              Guardar
                            </Button>
					</ModalContent>
					</Modal>

          
                <Button> Reportar</Button>
              </HStack>
				</Box>
      </Box>
			)
		})
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
      
      <Container>
        {mostrarPublicaciones()}
      </Container>
</VStack>

    )
}


export default publicacionesAdmi