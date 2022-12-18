import React from 'react'
import { useState,useEffect } from 'react'
import { Badge,StarIcon,Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel,Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Box,Image } from '@chakra-ui/react'
import styles from '../components/publicaciones.module.css'
import {Menu,MenuButton,MenuList,MenuItem} from '@chakra-ui/react'



const publicaciones = () => {


  const [publicaciones, setPublicaciones] = useState([])

	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicaciones`)
		setPublicaciones(response.data)
	}


	useEffect(() => {
		getPublicaciones()
	}, [])


	const onSelect = async (e) => {
		if(e.target.value=="eliminar"){
			const response = await axios.delete(`${process.env.API_URL}/publicacion/`)

		}
		if(e.target.value=="editar"){
			console.log("vamos a editar")
		}
		// sirve para que los atributos del useState sean inicializados desde el placeholder
	}

  	const mostrarPublicaciones = () => {
		return publicaciones.map(publicaciones => {
			return (
      <Box  borderWidth='2px' borderRadius='lg' my={8}>
		<Button  size='xs' colorScheme='blackAlpha' left="85%" >Reportar</Button>
        <Image src= 'https://bit.ly/dan-abramov' className={styles.postImage} /> //css de imagen
				<Box p='2' key={publicaciones._id} >
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
				<Box>#{publicaciones.etiqueta}</Box>
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
		idUsuario:'636ef3d8ef0ab5b27774fcda',
        titulo: '',
		descripcion: '',
		etiqueta: '',
        diasVisible: ''
	})

	const[tag, setTag]= useState({})

    const router = useRouter()


    const onSubmit = async (e) => {
		e.preventDefault()
		console.log(values)
		try {
			const response = await axios.post(`${process.env.API_URL}/publicacion`, values)
			console.log(response)
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
			[e.target.name]: e.target.value
		})
		// sirve para que los atributos del useState sean inicializados desde el placeholder
	}

	const onEtiqueta = (e) => {
		setTag({
			...tag,
			[e.target.name]: e.target.value
		})
		// sirve para que los atributos del useState sean inicializados desde el placeholder
	}

	const busquedaEtiqueta = async(e)=>{
		e.preventDefault()
		console.log(tag)
		try {

			if (response.status === 201) {
				router.push(`/publicacionesEtiqueta/${e.target.value}`)

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

    return(



  <VStack>

<Menu>
  <MenuButton as={Button} right="49%">
    =
  </MenuButton>
  <MenuList>
    <MenuItem>Ver mis publicaciones</MenuItem>
    <MenuItem>Mi perfil</MenuItem>
    <MenuItem></MenuItem>
  </MenuList>
</Menu>

	<Container maxW="Container.xl" width={500} >
                <Stack>
				<FormLabel fontSize={25}>Crea una publicacion</FormLabel>
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

                    <FormControl isRequired>
                        <FormLabel>Dias activa</FormLabel>
                        <Select my={2} placeholder="Numero de dias activa" type={"number"} onChange={onChange} name="diasVisible">
                            <option values='4'> 4 </option>
                            <option values='7'> 7 </option>
                            <option values='14'> 14 </option>
                        </Select >
                        </FormControl>
					<Button type="submit" size="sm" width="40%">Seleccionar imagen</Button>
                </Stack>
            <Button colorScheme="blue" size="md" type="submit" my={5} onClick={onSubmit}>Crear publicacion</Button>
        </Container>

		<Container borderWidth='2px'>
				<FormControl>
                    <FormLabel fontSize={20} my={2}>Filtrar por Etiqueta</FormLabel>
					<HStack>
					<Input placeholder="Ingrese etiqueta" type={"text"}my={3} onChange={onEtiqueta} name="etiqueta" />
					<Button colorScheme="red" size="md" ml='400'type="submit" my={2} onClick={busquedaEtiqueta}>Buscar</Button>
					</HStack>
                </FormControl>
				
		</Container>

		<Container>
		{mostrarPublicaciones()}
		  </Container>
	</VStack>
    )


}

export default publicaciones