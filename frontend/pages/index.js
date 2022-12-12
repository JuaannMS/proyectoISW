import { useState, useEffect } from 'react'
import { Button, Container, Input, Stack, Text, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading, } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
//import styles from '../styles/publicaciones.css'

export default function Home() {

  	const [publicaciones, setPublicaciones] = useState([])
	const router = useRouter()

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
				<Tr key={publicaciones._id}>
					<Td>{publicaciones.titulo}</Td>
					<Td>{publicaciones.descripcion}</Td>
					<Td>{publicaciones.cantLikes}</Td>
					<Td><Button onClick={() => router.push(`/publicaciones/${publicaciones._id}`)}>Ver mas</Button></Td>
				</Tr>
			)
		})
	}

  return (
    <Container>
          <Heading textAlign={"center"} my={10}>Publicaciones</Heading>
          <Table variant = "simple"> 
              <Thead>
                <Tr> 
                  <Td> Titulo</Td>
                  <Td> Descripcion</Td>
                  <Td> Numero de Likes</Td>
                </Tr>
                {mostrarPublicaciones() }
              </Thead>
          </Table>

		  
    </Container>

	
  )

}
