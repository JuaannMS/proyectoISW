import { React, useState, useEffect, useRef } from 'react'
import { Badge, StarIcon, Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Select, VStack, Box, Image, button, Menu, MenuButton, MenuList, MenuItem, Modal } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '../components/publicaciones.module.css'
import comprobarCookies from '../utils/comprobarCookies'
import Cookies from "universal-cookie";
import Router from "next/router";
import { useDisclosure } from '@chakra-ui/react'
import {
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react'

const publicaciones = () => {

	useEffect(() => {
		comprobarCookies();
		getPublicaciones();
		setId(cookies.get("id"));
		setNombre(cookies.get("nombre"))
	}, [])

	const cookies = new Cookies;
	const ref = useRef(null);

	const [publicaciones, setPublicaciones] = useState([])
	const [id, setId] = useState()
	const [nombre, setNombre] = useState()
	const [comentariosPublicacion, setcomentariosPublicacion] = useState([])
	const [tituloModal, setTituloModal] = useState()
	const [idPublicacion, setIdPublicacion] = useState()
	const [comentario, setComentario] = useState()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [mensaje, setMensaje] = useState()

	const handleInput = (e) => {
		setComentario(e.target.value)
	};
	const mostrarPublicaciones = () => {
		return publicaciones.map(publicaciones => {

			return (
				<Box borderWidth='2px' borderRadius='lg' my={6} color='Blue' border='1px'>
					<HStack className={styles.publicacionLabelHorizontal}>
						<Box className={styles.nombreUsuario}>{publicaciones.nombreUsuario}</Box>
						<Button onClick={() => { darFavorito(publicaciones._id) }}><img src="star.png" /></Button>
						<Button  >:</Button>
					</HStack>
					<Box className={styles.publicacionTitulo}>{publicaciones.titulo}</Box>
					<Image src='https://bit.ly/dan-abramov' className={styles.postImage} />
					<Box p='2' key={publicaciones._id} >
						<HStack className={styles.publicacionLabelHorizontal}>
							<Box p='1'>#{publicaciones.etiqueta}</Box>
							<Box className={styles.publicacionFecha}>{publicaciones.fechaCreacion}</Box>
						</HStack>
						<HStack className={styles.publicacionLabelHorizontal}></HStack>
						<Box >{publicaciones.descripcion}</Box>
						<HStack className={styles.publicacionLabelHorizontal}>
							<HStack className={styles.publicacionLikes}>
								<Box
									as='span'
									color='gray.600'
									fontSize='sm'
									marginLeft='7px'>
									{publicaciones.cantLikes} likes</Box>
								<Button onClick={() => { darLike(publicaciones._id) }}><img src="like.png" /></Button>
							</HStack>
						</HStack>

						<HStack className={styles.publicacionBotonComentarios}>
						</HStack>
						<VStack className={styles.mostrarComentarios}>
							<Button onClick={() => { cargarComentarios(publicaciones._id) }}>
								Comentarios<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl">
									<ModalOverlay />
									<ModalContent>
										<ModalHeader>{tituloModal}</ModalHeader>
										<ModalCloseButton />
										<ModalBody>
											<Box>
												<FormControl>
													<FormLabel fontSize={20} my={2}>Nuevo comentario</FormLabel>
													<Input placeholder="Ingrese comentario" type={"text"} my={3} onChange={handleInput} name="contenido" />
													<Button colorScheme="red" size="md" type="submit" my={2} onClick={() => { nuevoComentario(idPublicacion, comentario) }}>Comentar</Button>
												</FormControl>
												{mensaje}
											</Box>
											<Box>
												{comentariosPublicacion.map((comentario) => {
													return (
														<Container borderWidth='2px' my={2}>
															<Text fontSize={20} my={2}>Fecha: {comentario.fecha}</Text>
															<Text fontSize={20} my={2}>Comentario: {comentario.contenido}</Text>
														</Container>
													)
												}
												)}
											</Box>
										</ModalBody>
										<ModalFooter>
											<Button colorScheme='blue' mr={3} onClick={onClose}>
												Cerrar
											</Button>
										</ModalFooter>
									</ModalContent>
								</Modal>
								<  img src="flecha.png" />
							</Button>
						</VStack>

					</Box>
				</Box>
			)
		})
	}

	const modalMsj = (mensaje) => {
		mensaje = "blabalbalba"
		return (
			<>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>

						<ModalCloseButton />
						<ModalBody>
							{mensaje}
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={onClose}>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		)
	}
	const getPublicaciones = async () => {
		const response = await axios.get(`${process.env.API_URL}/publicaciones`)
		setPublicaciones(response.data)
	}

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

	const cargarComentarios = async (idPublicacion) => {
		setTituloModal("Comentarios")
		setMensaje("")
		setIdPublicacion(idPublicacion)
		const response = await axios.get(`${process.env.API_URL}/comentario/getFromPublicacion/${idPublicacion}`).then((res) => {
			setcomentariosPublicacion(res.data)
			onOpen()
		})
	}

	const nuevoComentario = async (idPublicacion, comentario) => {
		const json = JSON.stringify({ idPublicacion: idPublicacion, contenido: comentario, idUsuario: id })
		if (comentario && comentario.length > 0) {
			const response = await axios.post(`${process.env.API_URL}/comentario`, json, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(() => {
				setMensaje('Comentario creado')
			}).catch((err) => {
				setMensaje('Error al crear el comentario')
			})
		} else {
			setMensaje('Debe ingresar un comentario')
		}
		return modalMsj(mensaje, isOpen, onclose)
	}

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
			idUsuario: id,
			nombreUsuario: nombre

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

	const pushVerMisPublicaciones = () => {
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
					<MenuItem onClick={pushCrearPublicacion}>Crear Publicacion</MenuItem>
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