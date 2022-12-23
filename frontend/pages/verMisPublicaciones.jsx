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

const verMisPublicaciones = () =>{

    const [publicaciones, setPublicaciones] = useState([])

    const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicaciones`)
		setPublicaciones(response.data)
	}

    useEffect(() => {
		getPublicaciones()
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

	const mostrarPublicaciones = () => {
		return publicaciones.map(publicacion => {

			return (
				<Box borderWidth='2px' borderRadius='lg' my={6} color='Blue' border='1px'>
					<HStack className={styles.publicacionLabelHorizontal}>
					<Box className={styles.nombreUsuario}>{publicacion.nombreUsuario}</Box>
					<Button>Editar</Button>
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
							{publicaciones.cantLikes} likes</Box>
						<HStack>
						<button onClick= {() => {darLike(publicacion._id)}}><img src ="like.png" /></button>
						<button onClick={() => {darFavorito(publicacion._id)}}><img src ="star.png" /></button>
						</HStack>
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