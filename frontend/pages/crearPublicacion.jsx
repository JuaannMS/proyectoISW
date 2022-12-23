import React from 'react'
import { useState, useEffect } from 'react'
import { Badge, StarIcon, Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from "universal-cookie";
import Router from "next/router";

const crearPublicacion = () =>{

    useEffect(() => {
		comprobarCookies();
		setId(cookies.get("id"));
		setNombre(cookies.get("nombre"))
	}, [])

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
	const [id, setId] = useState()
    const [nombre, setNombre] = useState()

    const router = useRouter()

    const onChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
			idUsuario:id,
			nombreUsuario:nombre

		})
		// sirve para que los atributos del useState sean inicializados desde el placeholder
	}

    const [values, setValues] = useState({
		idUsuario: '',
		nombreUsuario: '',
		titulo: '',
		descripcion: '',
		etiqueta: '',
		diasVisible: ''
	})

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

return(
<VStack>
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

</VStack>

)
}

export default crearPublicacion