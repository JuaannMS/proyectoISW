import { ReactNode } from 'react';
import {Box,Flex,Avatar,HStack,Link,IconButton,Button,Menu,MenuButton,MenuList,MenuItem,MenuDivider,
  useDisclosure,useColorModeValue,Stack, VStack, Container,} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import Router from "next/router";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { React, useState, useEffect, useRef } from "react";
import comprobarCookies from "../utils/comprobarCookies";
import axios from "axios";
import styles from "../components/publicaciones.module.css";
import {Input,Text,Textarea,Heading,FormControl,FormLabel,Select,Image,button,
  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Divider,
  } from "@chakra-ui/react";
  import Swal from "sweetalert2";

export default function withAction() {

  const [idPublicacion, setIdPublicacion] = useState();

  const [values, setValues] = useState()
  const [tituloModal, setTituloModal] = useState();
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isComentOpen , onOpen: onComentOpen, onClose: onComentClose } = useDisclosure()
  const [publicaciones, setPublicaciones] = useState([]);
  const [nombre, setNombre] = useState();
  const [id, setId] = useState();
  const cookies = new Cookies()
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comentariosPublicacion, setcomentariosPublicacion] = useState([]);

  const handleInput = (e) => {
    setComentario(e.target.value);
  };

  useEffect(() => {
    comprobarCookies();
    getPublicaciones();
    setId(cookies.get("id"));
    setNombre(cookies.get("nombre"));
  }, []);

  const getPublicaciones = async () => {
    const response = await axios.get(`${process.env.API_URL}/publicaciones`);
    console.log(response.data)
    setPublicaciones(response.data);

  };

  const pushCrearPublicacion = () => {
    Router.push("/crearPublicacion")
  }

  const pushVerMisPublicaciones = () => {
    router.push(`/publicaciones/personales/${id}`)
  }

  const pushVerMiPerfil = () => {
    router.push(`/`)
  }

  const onCambio = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		})
	}
  const cerrarSesion = () => {

      cookies.remove("id");
      cookies.remove("rut");
      cookies.remove("nombre");
      cookies.remove("correo");
      cookies.remove("telefono");
      cookies.remove("direccion");
      cookies.remove("fechaCumpleanio");
      cookies.remove("fechaIngreso");
      cookies.remove("rol");
      Router.push("/login");
  }

  const onChange = async (event,idPublicacion)=> {

    if(event.target.value=='reportar'){

    }

    if(event.target.value=='favoritos'){

      const json = JSON.stringify({
        idPublicacion: idPublicacion,
        idUsuario: id,
      });
      const response = await axios
        .put(`${process.env.API_URL}/favorito/put/createFavorito`, json, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          Swal.fire({
            title: "Exito",
            html: res.data.message,
            icon: "success",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            html: err.response.data.message,
            icon: "error",
          });
        });

    }
    
  }

  const capturarId = async (idP) => {
    setIdPublicacion(idP)
    onEditOpen()
  }

  const cargarComentarios = async (idPublicacion) => {
    setTituloModal("Comentarios");
    setcomentariosPublicacion([]);
    setIdPublicacion(idPublicacion);
    const response = await axios
      .get(
        `${process.env.API_URL}/comentario/getFromPublicacion/${idPublicacion}`
      )
      .then((res) => {
        let comentarios = res.data.map((comentario) => {
          return (
            <>
              <Container borderWidth="2px" my={2} maxW="initial">
                <Text fontSize={20} my={2}>
                  Fecha: {comentario.fecha}
                </Text>
                <Text fontSize={20} my={2}>
                  Comentario: {comentario.contenido}
                </Text>
              </Container>
            </>
          );
        });
        setcomentariosPublicacion(comentarios);
        onComentOpen();
      });
  };

  const nuevoComentario = async (idPublicacion, comentario) => {
    const json = JSON.stringify({
      idPublicacion: idPublicacion,
      contenido: comentario,
      idUsuario: id,
    });
    if (comentario && comentario.length !== 0) {
      const response = await axios
        .post(`${process.env.API_URL}/comentario`, json, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          Swal.fire({
            title: "Exito",
            html: "Comentario agregado",
            icon: "success",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            html: "Error al agregar comentario",
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Alerta",
        html: "El comentario no puede estar vacio",
        icon: "warning",
      });
    }
  };

  const mostrarPublicaciones = () => {
    return publicaciones.map((publicaciones) => {
      return (
        <>
          <Box borderWidth="2px" borderRadius="lg" my={6} border="1px">
            <HStack className={styles.publicacionLabelHorizontal}>
              <Box className={styles.nombreUsuario}>
                {publicaciones.nombreUsuario}
              </Box>
              <Select placeholder=' ' width='60px'  onChange={() => onChange(event,publicaciones._id)} name="opcionElegida" >
              <option value='reportar'>Reportar</option>
              <option value='favoritos'>Favoritos</option>
              <option value='eliminar'>Eliminar</option>
              </Select> 
            </HStack>
            <Box className={styles.publicacionTitulo}>
              {publicaciones.titulo}
            </Box>
            <Image
              src="https://bit.ly/dan-abramov"
              className={styles.postImage}
              alt="post image"
            />
            <Box p="2" key={publicaciones._id}>
              <HStack className={styles.etiquetayfecha}>
                <Box className={styles.publicacionEtiqueta}>#{publicaciones.etiqueta}</Box>
                <Box className={styles.publicacionFecha}>{publicaciones.fechaCreacion}</Box>
              </HStack>
              <HStack className={styles.publicacionLabelHorizontal}></HStack>
              <Box>{publicaciones.descripcion}</Box>
              <HStack className={styles.publicacionLabelHorizontal}>
                  <Button marginLeft='-10px'  variant={"ghost"}
                    onClick={() => {
                      darLike(publicaciones._id);
                    }}
                  >
                    <Image src="like.png" alt="like" />
                    <Box as="span" color="gray.600" fontSize="sm">
                      {publicaciones.cantLikes} likes
                    </Box>
                  </Button>
                  <Button onClick={()=> {capturarId(publicaciones._id)}}  >Editar</Button>

                  <Modal
                  isOpen={isEditOpen}
                  onClose={onEditClose}
                  scrollBehavior="inside"
                  >
        <ModalOverlay />
        <ModalContent>
          <HStack className={styles.publicacionLabelHorizontal}>
            <ModalHeader>
                        Editar_Publicacion
                        </ModalHeader>
            
            <ModalFooter>
                        <Button colorScheme="red" onClick={onEditClose}>
                        X
                        </Button>
                    </ModalFooter>
          
          </HStack>
        
        <FormControl isRequired>
          <FormLabel>Titulo</FormLabel>
          <Input placeholder="Ingrese un titulo" type={"text"} onChange={onCambio} name={"titulo"} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Descripcion</FormLabel>
          <Textarea placeholder="Ingrese una descripcion" type={"text"} onChange={onCambio} name="descripcion" />
        </FormControl>

        <FormControl>
          <FormLabel>Etiqueta</FormLabel>
          <Input placeholder="Ingrese una etiqueta" type={"text"} onChange={onCambio} name="etiqueta" />
        </FormControl>
        
        <Button
                            colorScheme="blue"
                            size="md"
                            type="submit"
                            my={2}
                            onClick={() => {
                              onGuardar(idPublicacion)
                              onEditClose()
                            }}
                            
                          >
                            Guardar
                          </Button>
        </ModalContent>
        </Modal>

              </HStack>
              <VStack className={styles.mostrarComentarios} align="normal">
                <Button  variant={"ghost"}
                  onClick={() => {
                    cargarComentarios(publicaciones._id);
                  }}
                >
                  Comentarios
                  <Image src="flecha.png" alt="flecha" />
                  <Modal
                    isOpen={isComentOpen}
                    onClose={onComentClose}
                    scrollBehavior="inside"
                    size="full"
                  >
                    <ModalOverlay>
                      <ModalContent>
                      <ModalHeader>
                        <Text>Comentarios</Text>
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalHeader>
                          <FormControl>
                            <FormLabel fontSize={20} my={2}>
                              Nuevo comentario
                            </FormLabel>
                            <Input
                              placeholder="Ingrese comentario"
                              type={"text"}
                              my={3}
                              onChange={handleInput}
                              name="contenido"
                            />
                            <Button
                              colorScheme="red"
                              size="md"
                              type="submit"
                              my={2}
                              onClick={() => {
                                nuevoComentario(idPublicacion, comentario),
                                  onComentClose();
                              }}
                            >
                              Comentar
                            </Button>
                          </FormControl>
                          <Divider />
                      </ModalHeader>
                      <ModalBody maxW="initial">
                        {comentariosPublicacion}
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onComentClose} >
                          Cerrar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                    </ModalOverlay>
                  </Modal>
                </Button>
              </VStack>
            </Box>
          </Box>
        </>
      );
    });
  };

  const darLike = async (idPublicacion) => {
    const json = JSON.stringify({
      idPublicacion: idPublicacion,
      idUsuario: id,
    });
    const response = await axios
      .post(`${process.env.API_URL}/like`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Exito",
          html: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          html: err.response.data.message,
          icon: "error",
        });
      });
  };

  const pushPublicacionesReportadas = () => {
		Router.push("/publicaciones/reportadas")
	}

  const onGuardar = async (idPublicacion) => {
    console.log(values)
    console.log("jaja")
    console.log(idPublicacion)
    try {
      const response = await axios.put(`${process.env.API_URL}/publicacion/update/${idPublicacion}`, values)
      console.log(response)
      if (response.status === 200) {
        Swal.fire({
          title: 'Publicacion modificada',
          text: 'La publicacion se ha modificado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          //router.push('/publicacionesAdmi') //refrescar pagina
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

  return (
    <>
      <Box position='fixed' width='100%'  bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>  </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Button onClick={pushVerMisPublicaciones}>Mis publicaciones</Button>
              <Button onClick={pushCrearPublicacion}>Crear Publicacion</Button>
              <Button onClick={pushVerMiPerfil}>Ver mi perfil</Button>
              <Button onClick={pushPublicacionesReportadas}>Publicaciones Reportadas</Button>
              
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'red'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />} onClick={cerrarSesion}>
              Cerrar Sesion
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

        <VStack>
          <Container position='relative' marginTop={100}>
          {mostrarPublicaciones()} 
          </Container>
        </VStack>
    </>
  );
}