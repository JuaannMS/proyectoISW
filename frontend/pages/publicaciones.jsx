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
import { FaBlackTie } from 'react-icons/fa'
import Router from "next/router";


const publicaciones = () => {

	const cookies = new Cookies;
	const comprobarCookies = () => {
		const cookies = new Cookies;
		if (!cookies.get("id")) {
			Router.push("/login");
		}
		else if (cookies.get("id") && window.location.pathname == "/login") {
			Router.push("../");
		}
	}


	const [publicaciones, setPublicaciones] = useState([])
	const [id, setId] = useState()
	const [nombre, setNombre] = useState()


	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicaciones`)
		setPublicaciones(response.data)
	}


	useEffect(() => {
		comprobarCookies();
		getPublicaciones();
		setId(cookies.get("id"));
		setNombre(cookies.get("nombre"))
	}, [])

	const darLike = async (idPublicacion) => {
		const json = JSON.stringify({ idPublicacion: idPublicacion, idUsuario: id })
		const response = await axios.post(`${process.env.API_URL}/like`, json, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		
		alert(response.data.message, null)
		}

		
	const darFavorito = async (idPublicacion) => {
		const json = JSON.stringify({ idPublicacion: idPublicacion, idUsuario: id })
		const response = await axios.put(`${process.env.API_URL}/favorito/put/createFavorito`, json, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		alert(response.data.message, null)
	}

	const mostrarPublicaciones = () => {
		return publicaciones.map(publicaciones => {

			return (
				<Box borderWidth='2px' borderRadius='lg' my={6} color='Blue' border='1px'>
					<HStack className={styles.publicacionLabelHorizontal}>
					<Box className={styles.nombreUsuario}>{publicaciones.nombreUsuario}</Box>
					<Button  >Reportar</Button>
					</HStack>
					<HStack className={styles.publicacionLabelHorizontal}>
					<Box p='1'>#{publicaciones.etiqueta}</Box>
					<Box className={styles.publicacionFecha}>
						{publicaciones.fechaCreacion}</Box>
					</HStack>
					<Image src='https://bit.ly/dan-abramov' className={styles.postImage} />
					<Box p='2' key={publicaciones._id} >
						<HStack className={styles.publicacionLabelHorizontal}>
							<Box className={styles.publicacionTitulo}>
							{publicaciones.titulo}</Box>
						</HStack>
						<Box >{publicaciones.descripcion}</Box>
						<HStack className={styles.publicacionLabelHorizontal}>
						<Box
							as='span'
							color='gray.600'
							fontSize='sm'>
							{publicaciones.cantLikes} likes</Box>
						<HStack>
						<button onClick= {() => {darLike(publicaciones._id)}}><img src ="like.png" /></button>
						<button onClick={() => {darFavorito(publicaciones._id)}}><img src ="star.png" /></button>
						</HStack>
						</HStack>
						
						</Box>
						<HStack className={styles.publicacionBotonComentarios}>
						<button onClick={() => { nuevoComentario(publicaciones._id) }}>
							Nuevo comentario
						</button>
						<button onClick={() => { cargarComentarios(publicaciones._id) }}>
							Ver comentarios
						</button>
						</HStack>
				</Box>
			)
		})
	}

	const cargarComentarios = async (idPublicacion) => {
		const response = await axios.get(`${process.env.API_URL}/comentario/getFromPublicacion/${idPublicacion}`)
		console.log(response.data)
	}

	const nuevoComentario = async (idPublicacion) => {
		var comentario = prompt("Comentario", '');
		const json = JSON.stringify({ idPublicacion: idPublicacion, contenido: comentario, idUsuario: id })
		if (comentario) {
			const response = await axios.post(`${process.env.API_URL}/comentario`, json, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(() => {
				alert("Comentario agregado")
			})

		}
	}

	const [values, setValues] = useState({
		idUsuario: '',
		nombreUsuario: '',
		titulo: '',
		descripcion: '',
		etiqueta: '',
		diasVisible: ''
	})

	const [tag, setTag] = useState({
		etiqueta: ''
	})

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
					router.push('/publicaciones') //refrescar pagina
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
			[e.target.name]: e.target.value,
			idUsuario:id,
			nombreUsuario:nombre

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

	const busquedaEtiqueta = async (e) => {
		e.preventDefault()
		//console.log(tag.etiqueta)
		try {

			const response = await axios.get(`${process.env.API_URL}/publicacionesx/${tag.etiqueta}`)
			//console.log(response.status)
			if (response.status === 200) {
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

	const pushCrearPublicacion = () => {
		Router.push("/crearPublicacion")
	}

	const pushVerMisPublicaciones = () =>{
		Router.push("/verMisPublicaciones")
	}
	return (



		<VStack>

			<Menu>
				<MenuButton as={Button} right="49%">
					=
				</MenuButton>
				<MenuList>
					<MenuItem onClick={pushVerMisPublicaciones}>Ver mis publicaciones</MenuItem>
					<MenuItem  onClick={pushCrearPublicacion}>Crear Publicacion</MenuItem>
					<MenuItem >Mi perfil</MenuItem>
					<MenuItem></MenuItem>
				</MenuList>
			</Menu>

			<Container borderWidth='2px'>
				<FormControl>
					<FormLabel fontSize={20} my={2}>Filtrar por Etiqueta</FormLabel>
					<HStack>
						<Input placeholder="Ingrese etiqueta" type={"text"} my={3} onChange={onEtiqueta} name="etiqueta" />
						<Button colorScheme="red" size="md" ml='400' type="submit" my={2} onClick={busquedaEtiqueta}>Buscar</Button>
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