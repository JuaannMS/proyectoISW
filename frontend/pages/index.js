import React from 'react'
import { useState,useEffect } from 'react'
import { Badge,StarIcon,Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel,Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Box,Image } from '@chakra-ui/react'
//import styles from '../styles/publicaciones.css'

export default function Home() {

  	const [publicaciones, setPublicaciones] = useState([])
	const router = useRouter()

	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicaciones`)
		setPublicaciones(response.data)
	}

	const [values, setValues] = useState({
		idPubli:'',
	})

	const [publicacionSeleccionada, setPublicacionSel] = useState({
		id:''
	})

	useEffect(() => {
		getPublicaciones()
	}, [])

	

	const onChange = async (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
			
		})

		console.log("aa"+e.target.name)

		if(e.target.value=="Eliminar"){

			console.log("vamos a eliminar")
			const response = await axios.delete(`${process.env.API_URL}/publicacion/delete/${publicacionSeleccionada.id}`, values)
		}
		if(e.target.value=="Editar"){

			console.log("vamos a editar")
			//const response = await axios.put(`${process.env.API_URL}/publicacion/`, values)
		}
		// sirve para que los atributos del useState sean inicializados desde el placeholder
	}


	const mostrarPublicaciones = () => {
		return publicaciones.map(publicaciones => {
			return (
      <Box  borderWidth='2px' borderRadius='lg' >
		<Select placeholder=' ' size='xs' onChange={onChange}>
		<option values='eliminar'>Eliminar</option>
  		<option values='editar'>Editar</option>
		</Select>
        <Image src= 'https://bit.ly/dan-abramov' />
				<Box p='2' key={publicaciones._id}  >
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
					<Box >{publicaciones.descripcion}</Box>
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
