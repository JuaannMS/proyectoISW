
import React from 'react'
import { useState,useEffect } from 'react'
import { Badge,StarIcon,Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel,Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Box,Image } from '@chakra-ui/react'
import styles from '../components/publicaciones.module.css'



const publicaciones = () => {

  const [publicaciones, setPublicaciones] = useState([])

	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicaciones`)
		setPublicaciones(response.data)
	}

	useEffect(() => {
		getPublicaciones()
	}, [])

  const mostrarPublicaciones = () => {
		return publicaciones.map(publicaciones => {
			return (
      <Box  borderWidth='2px' borderRadius='lg'>
        <Image src= 'https://bit.ly/dan-abramov' left='50%'/>
				<Box p='2' key={publicaciones._id}>
          <Box 
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='200'>
                {publicaciones.fechaExp}</Box>
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

  

    const [values, setValues] = useState({
        idUsuario: '636ef3d8ef0ab5b27774fcda',
        titulo: '',
		    descripcion: '',
		    etiqueta: '',
        diasVisibles:''
	})

    const router = useRouter()


    const onSubmit = async (e) => { 
		e.preventDefault()
		console.log("jaja  "+values)
		try {
			const response = await axios.post(`${process.env.API_URL}/publicacion`, values)
			console.log("que su   "+response)
			if (response.status === 201) {
				Swal.fire({
					title: 'Publicacion creada',
					text: 'La publicacion se ha creado correctamente',
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
				text: 'Ha ocurrido un error',
				icon: 'error',
				confirmButtonText: 'Ok'
			})
		}
	}

    const onChange = (e) => {
		    setValues({
			      ...values,
			      [e.target.name]: e.target.value // sirve para que los atributos del useState sean inicializados desde el placeholder
		    })
	}



    return(

  <VStack>

    <Container>
		{mostrarPublicaciones()}
		  </Container>

	<Container maxW="Container.xl" width={500} >
                <Stack>
                    <FormControl isRequired>
                        <FormLabel>Titulo</FormLabel>
                        <Input placeholder='Ingrese un titulo' type={"text"} onChange={onChange} titulo={"titulo"} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Descripcion</FormLabel>
                        <Textarea placeholder='Ingrese una descripcion' type={"text"} onChange={onChange} descripcion={"descripcion"} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Etiqueta</FormLabel>
                        <Input placeholder='Ingrese una etiqueta' type={"text"} onChange={onChange} etiqueta={"etiqueta"} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Dias activa</FormLabel>
                        <Select placeholder='Numero de dias activa' type={"number"}  onChange={onChange}>
                            <option values='4'> 4 </option>
                            <option values='7'> 7 </option>
                            <option values='14'> 14 </option>
                        </Select >
                        </FormControl>
                </Stack>
            <Button colorScheme="blue" size="md" type="submit" my={5} onClick={onSubmit}>Crear publicacion</Button>
        </Container>
	</VStack>
    )


}

export default publicaciones