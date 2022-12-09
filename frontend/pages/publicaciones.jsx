
import { useState } from 'react'
import { Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel,Select, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'


const publicaciones = () => {

    const [values, setValues] = useState({
        idUsuario: "636ef3d8ef0ab5b27774fcda",
        titulo: '',
		descripcion: '',
		etiqueta: '',
        diasVisible:''
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


    return (

    <VStack>

    	<Container>
		<div className='Publicacion'>
      <div className="publicacionWrapper">
        <div className="postTop">
          <div className="postTopLeft"></div>
            <span className="postNombreUsuario">que</span>
            <span className="postTitulo"> jaja</span>
            <span className="postDescripcion">hola</span>
          <div className="postTopRight"></div>
      </div>
      <div className="publicacionCentro"></div>
      <div className="publicacionBoton"></div>
    </div>
  </div>
		</Container>

	 	<Container maxW="Container.xl" left
		Content>
				
                <Stack>
                    <FormControl isRequired>
                        <FormLabel>Titulo</FormLabel>
                        <Input placeholder='Ingrese un titulo' type={"text"} onChange={onChange} titulo={"titulo"} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Descripcion</FormLabel>
                        <Input placeholder='Ingrese una descripcion' type={"text"} onChange={onChange} descripcion={"descripcion"} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Etiqueta</FormLabel>
                        <Input placeholder='Ingrese una etiqueta' type={"text"} onChange={onChange} etiqueta={"etiqueta"} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Dias activa</FormLabel>
                        <Select placeholder='Numero de dias activa' type={"number"} >
                            <option value='4'> 4 </option>
                            <option value='7'> 7 </option>
                            <option value='14'> 14 </option>
                        </Select >
                        </FormControl>
                </Stack>
            <Button colorScheme="blue" size="md" type="submit" onClick={onSubmit}>Crear publicacion</Button>
        </Container>
	</VStack>
    )
}

export default publicaciones