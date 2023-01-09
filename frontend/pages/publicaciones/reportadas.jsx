import React from 'react'
import { useState, useEffect } from 'react'
import { Badge, StarIcon, Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Select, VStack, AspectRatio } from '@chakra-ui/react'
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
    const [rol, setRol] = useState([])
    const cookies = new Cookies();
    const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicacionesAdmi`)
		setPublicaciones(response.data)
	}

    useEffect(() => {
		getPublicaciones(),
        setRol(cookies.get("rol"))
	}, [])

    const eliminarPInactivas = async () => {

    const response = await axios.delete(`${process.env.API_URL}/publicacionesDelete`).then((response)=> {
        Swal.fire({
          title: "Exito",
          html: "Publicaciones inactivas eliminadas",
          icon: "success",
        })
      }).catch((err) => {
        Swal.fire({
          title: "Error",
          html: "Error al eliminar",
          icon: "error",
        })
      })
    }
      
    const restaurarPublicacion = async (idP) => {

      const response = await axios.put(`${process.env.API_URL}/publicacionRestaurar/${idP}`).then((response)=> {
          Swal.fire({
            title: "Exito",
            html: "Publicacion restaurada",
            icon: "success",
          })
        }).catch((err) => {
          Swal.fire({
            title: "Error",
            html: "Error al restaurar",
            icon: "error",
          })
        })
      }

    const mostrarPublicaciones = () => {
		return publicaciones.map(publicacion => {
			return (
        
      <Box  borderWidth='2px' borderRadius='lg' >
        <Box color='red'>Estado: {publicacion.estado}</Box>
        <Box color='red'>Numero de Reportes: {publicacion.numReportes}</Box>
        <Box  align="center" marginTop={"15%"}>
            <AspectRatio maxW='95%' ratio={1} >
            <iframe title='imagen' src={`/imagenPublicacion/${publicacion._id}`} />
            </AspectRatio>
            </Box>
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
                <Button onClick={()=> restaurarPublicacion(publicacion._id)}> Restaurar</Button>
              </HStack>
				</Box>
      </Box>
			)
		})
	}

  if (rol === "638e8c823fdb04c7747adbe8") {
    return (
      <VStack>
          <Button onClick={()=> eliminarPInactivas()} >Eliminar Publicaciones Inactivas</Button>
          {mostrarPublicaciones()}
      </VStack>
  )
    } else {
        return (
          <div>sin permisos</div>
        )
    }

    
}

export default publicacionesReportadas