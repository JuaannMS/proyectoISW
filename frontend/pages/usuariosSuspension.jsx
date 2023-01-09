import { React, useState, useEffect } from 'react'
import { Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react'
import axios from 'axios'
import { Router, useRouter } from 'next/router'
import {
  HStack, useDisclosure, Container, Input, Text, Textarea, Heading, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter
} from "@chakra-ui/react";
import styles from "../components/publicaciones.module.css";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";



const usuarios = () => {

  const cookies = new Cookies();
  const [usuarios, setUsuarios] = useState([])
  const [values, setValues] = useState([])
  const [id, setId] = useState([])
  const [rol, setRol] = useState([])
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const onCambio = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const getUsuarios = async () => {
    const response = await axios.get(`${process.env.API_URL}/usuarios`)
    setUsuarios(response.data)
  }

  useEffect(() => {
    getUsuarios()
    setRol(cookies.get("rol"))
  }, [])

  const idUsuario = async (id, estado) => {
    const json = JSON.stringify({ estado: estado })
    const response = await axios.put(`${process.env.API_URL}/baneo/${id}`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
    console.log(id)
  }

  const capturarId = async (id) => {
    setId(id)
    onEditOpen()
  }

  const editarUsuario = async (id) => {

    try {
      const response = await axios.put(
        `${process.env.API_URL}/usuario/update/${id}`,
        values
      );
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          title: "Usuario modificado",
          text: "El usuario se ha modificado correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {

        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

  }





  const showUsuarios = () => {
    return usuarios.map(usuarios => {
      let estado
      let guardarMensaje
      if (usuarios.estado) {
        estado = "Activo"
        guardarMensaje = "Suspender"

      } else {
        estado = "Suspendido"
        guardarMensaje = "Habilitar"
      }

      return (
        <Tr key={usuarios._id}>
          <Td>{usuarios.rut}</Td>
          <Td>{usuarios.nombre}</Td>
          <Td>{usuarios.direccion}</Td>
          <Td>{usuarios.correo}</Td>
          <Td>{usuarios.telefono}</Td>
          <Td>{estado}</Td>
          <Td><Button colorScheme="teal" size="md" onClick={() => { idUsuario(usuarios._id, !usuarios.estado), window.location.reload(true) }}>{guardarMensaje}</Button></Td>
          <Td><Button colorScheme="teal" size="md" onClick={() => { capturarId(usuarios._id) }}>Editar Usuario</Button><Modal

            isOpen={isEditOpen}
            onClose={onEditClose}
            scrollBehavior="inside"
          >
            <ModalOverlay />
            <ModalContent>
              <HStack className={styles.usuarioLabelHorizontal}>
                <ModalHeader>Editar_Usuario</ModalHeader>

                <ModalFooter>
                  <Button colorScheme="red" onClick={onEditClose}>
                    X
                  </Button>
                </ModalFooter>
              </HStack>

              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Ingrese un Nombre"
                  type={"text"}
                  onChange={onCambio}
                  name={"nombre"}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Direccion</FormLabel>
                <Textarea
                  placeholder="Ingrese una direccion"
                  type={"text"}
                  onChange={onCambio}
                  name="direccion"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Correo</FormLabel>
                <Input
                  placeholder="Ingrese un correo"
                  type={"text"}
                  onChange={onCambio}
                  name="correo"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Telefono</FormLabel>
                <Input
                  placeholder="Ingrese un numero"
                  type={"number"}
                  onChange={onCambio}
                  name="telefono"
                />
              </FormControl>

              <Button
                colorScheme="blue"
                size="md"
                type="submit"
                my={2}
                onClick={() => {
                  editarUsuario(id);
                  onEditClose();
                }}
              >
                Guardar
              </Button>
            </ModalContent>
          </Modal></Td>
        </Tr>
      )
    })
  }

  if (rol === "638e8c823fdb04c7747adbe8") {
    return (
      <Container maxW="container.xl" centerContent>
        <Heading textAlign={"center"} my={10}>Usuarios</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
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
  } else {
    return (
      <div>sin permisos</div>
    )
  }
}


export default usuarios