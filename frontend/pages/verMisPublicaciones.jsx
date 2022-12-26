import React from 'react'
import { useState, useEffect } from 'react'
import { Badge, StarIcon, Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Box, Image, button } from '@chakra-ui/react'
import styles from '../components/publicaciones.module.css'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import comprobarCookies from '../utils/comprobarCookies'
import Cookies from "universal-cookie";
import Router from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Divider} from "@chakra-ui/react";

const verMisPublicaciones = () =>{
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cookies = new Cookies();
	const [idU, setIdU] = useState();
	const [values, setValues] = useState()
	const router = useRouter();

	useEffect(() => {
		comprobarCookies();
		setIdU(cookies.get("id"));
		getPublicaciones();
	}, [])

	console.log(idU)

    const [publicaciones, setPublicaciones] = useState([])

    const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicaciones`)
		setPublicaciones(response.data)
	}

    const onChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		})
	}

    const onEliminar = async (idPublicacion) => {
        //console.log(idPublicacion)
              //const response = await axios.delete(`${process.env.API_URL}/publicacion/`)
        try {
          const response = await axios.delete(`${process.env.API_URL}/publicacion/delete/${idPublicacion}`) //values tiene que tener idPublicacion para eliminar
          //console.log(response)
          if (response.status === 200) {
            Swal.fire({
              title: 'Publicacion eliminada',
              text: 'La publicacion se ha eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              router.push('/verMisPublicaciones')
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

	  const onGuardar = async (idPublicacion,e) => {
	//	e.preventDefault()
		console.log(values)
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
					router.push('/verMisPublicaciones') //refrescar pagina
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
				text: 'Ha ocurrido un error',
				icon: 'error',
				confirmButtonText: 'Ok'
			})
		}
	}

	const mostrarPublicaciones = () => {
		return publicaciones.map(publicacion => {

			return (
				<Box borderWidth='2px' borderRadius='lg' my={6} color='Blue' border='1px'>
					<HStack className={styles.publicacionLabelHorizontal}>
					<Box className={styles.nombreUsuario}>{publicacion.nombreUsuario}</Box>
					<Button onClick={onOpen}>Editar</Button>
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
						<Input placeholder="Ingrese un titulo" type={"text"} onChange={onChange} name={"titulo"} />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Descripcion</FormLabel>
						<Textarea placeholder="Ingrese una descripcion" type={"text"} onChange={onChange} name="descripcion" />
					</FormControl>

					<FormControl>
						<FormLabel>Etiqueta</FormLabel>
						<Input placeholder="Ingrese una etiqueta" type={"text"} onChange={onChange} name="etiqueta" />
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
                    <Button onClick={() => onEliminar(publicacion._id)}>Eliminar </Button>
					</HStack>
					<HStack className={styles.publicacionLabelHorizontal}>
					<Box p='1'>#{publicacion.etiqueta}</Box>
					<Box className={styles.publicacionFecha}>
						{publicacion.fechaCreacion}</Box>
					</HStack>
					<Image src='https://bit.ly/dan-abramov' className={styles.postImage} />
					<Box p='2' key={publicacion._id} >
						<HStack className={styles.publicacionLabelHorizontal}>
							<Box className={styles.publicacionTitulo}>
							{publicacion.titulo}</Box>
						</HStack>
						<Box >{publicacion.descripcion}</Box>
						<HStack className={styles.publicacionLabelHorizontal}>
						<Box
							as='span'
							color='gray.600'
							fontSize='sm'>
							{publicacion.cantLikes} likes</Box>
						
						</HStack>
						</Box>
						<HStack className={styles.publicacionBotonComentarios}>
						<button onClick={() => { nuevoComentario(publicacion._id) }}>
							Nuevo comentario
						</button>
						<button onClick={() => { cargarComentarios(publicacion._id) }}>
							Ver comentarios
						</button>
						</HStack>
				</Box>
			)
		})
	}

    return (
        <VStack>
        
        {mostrarPublicaciones()}
        </VStack>
        
    )


}

export default verMisPublicaciones