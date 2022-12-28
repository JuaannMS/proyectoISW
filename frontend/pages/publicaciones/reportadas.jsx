import React from 'react'
import { useState, useEffect } from 'react'
import { Badge, StarIcon, Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Box, Image, button } from '@chakra-ui/react'
import styles from '../../components/publicaciones.module.css'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import comprobarCookies from '../../utils/comprobarCookies'
import Cookies from "universal-cookie";
import { FaBlackTie } from 'react-icons/fa'
import Router from "next/router";

const publicacionesReportadas = () => {

    const [publicaciones, setPublicaciones] = useState([])

    const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicaciones`)
		setPublicaciones(response.data)
	}

    useEffect(() => {
		getPublicaciones()
	}, [])

    const mostrarPublicaciones = () => {
		return publicaciones.map(publicacion => {
			return (
      <Box  borderWidth='2px' borderRadius='lg' >
        <Box color='red'>Estado: {publicacion.estado}</Box>
        <Box color='red'>Numero de Reportes: {publicacion.numReportes}</Box>
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
                <Button onClick={() => onEliminar(publicacion._id)}> Eliminar</Button>
              </HStack>
				</Box>
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

export default publicacionesReportadas