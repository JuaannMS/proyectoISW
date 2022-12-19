import { useState, useEffect } from 'react'
import { Button, Container, Input, Stack, Text, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading, } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'



const usuarios = () =>{

const [usuarios , setUsuarios]= useState([])

const getUsuarios = async () =>{
    const response = await axios.get(`${process.env.API_URL}/usuarios`)
    setUsuarios(response.data)
}

useEffect(() =>{
    getUsuarios()
},[])

const idUsuario = async (id,estado) =>{
    const json = JSON.stringify({ estado:estado })
    const response = await axios.put(`${process.env.API_URL}/baneo/${id}`, json, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
    console.log(id)
}





const showUsuarios = () => {
    return usuarios.map(usuarios =>{
        var estado
        var guardarMensaje
        if(usuarios.estado ){
            estado="Activo"
            guardarMensaje="Suspender"

        }else{
            estado="Suspendido"
            guardarMensaje="Habilitar"
        }
        
        return(
            <Tr key={usuarios._id}>
                <Td>{usuarios._id}</Td>
                <Td>{usuarios.rut}</Td>
                <Td>{usuarios.nombre}</Td>
                <Td>{usuarios.direccion}</Td>
                <Td>{usuarios.correo}</Td>
                <Td>{usuarios.telefono}</Td>
                <Td>{estado}</Td>
                <Td><Button colorScheme="teal" size="md" onClick={() => { idUsuario(usuarios._id,!usuarios.estado)}}>{guardarMensaje}</Button></Td>
            </Tr>
        )
    })
}

return (
    <Container maxW="container.xl" centerContent>
        <Heading textAlign={"center"} my={10}>Usuarios</Heading>
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Td>id</Td>
                    <Td>Rut</Td>
                    <Td>Nombre</Td>
                    <Td>Direccion</Td>
                    <Td>Correo</Td>
                    <Td>Telefono</Td>
                    <Td>Estado</Td>
                    <Td></Td>
                </Tr>
            </Thead>
            <Tbody>
                {showUsuarios()}
            </Tbody>
        </Table>
    </Container>
)
}

export default usuarios