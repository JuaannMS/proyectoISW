/* eslint-disable react-hooks/rules-of-hooks */
import { React, useState, useEffect, useRef } from "react";
import {Button,Container,Input,Stack,Text,HStack,Heading,FormControl,FormLabel,Select,VStack,Box,Image,button,
Menu,MenuButton,MenuList,MenuItem,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Divider,
} from "@chakra-ui/react";
import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,
} from '@chakra-ui/react'
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../components/publicaciones.module.css";
import comprobarCookies from "../utils/comprobarCookies";
import Cookies from "universal-cookie";
import Router from "next/router";
import { useDisclosure } from "@chakra-ui/react";

const publicaciones = () => {

  const cookies = new Cookies();
  const [id, setId] = useState();
  const [publicaciones, setPublicaciones] = useState([]);
  const [nombre, setNombre] = useState();
  const [comentariosPublicacion, setcomentariosPublicacion] = useState([]);
  const [tituloModal, setTituloModal] = useState();
  const [idPublicacion, setIdPublicacion] = useState();
  const [comentario, setComentario] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();



  useEffect(() => {
    comprobarCookies();
    getPublicaciones();
    setId(cookies.get("id"));
    setNombre(cookies.get("nombre"));
  }, []);

  const handleInput = (e) => {
    setComentario(e.target.value);
  };

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

  const buscarImagen = async (idP) => {

    const response = await axios.get(`${process.env.API_URL}/get/file/${idP}`)

  }

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
              </Select> 
            </HStack>
            <Box className={styles.publicacionTitulo}  >
              {publicaciones.titulo} 
            </Box>
            <Image
              src="https://bit.ly/dan-abramov"
              className={styles.postImage}
              alt="post image"
            />
            <Box p="2" key={publicaciones._id} >
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
                    isOpen={isOpen}
                    onClose={onClose}
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
                                  onClose();
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
                        <Button colorScheme="blue" mr={3} onClick={onClose} >
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

  const getPublicaciones = async () => {
    const response = await axios.get(`${process.env.API_URL}/publicaciones`);
    console.log(response.data)
    setPublicaciones(response.data);

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
        onOpen();
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

  const [tag, setTag] = useState({
    etiqueta: "",
  });

  const router = useRouter();

  const onEtiqueta = (e) => {
    setTag({
      ...tag,
      [e.target.name]: e.target.value,
    });

    // sirve para que los atributos del useState sean inicializados desde el placeholder
  }

  const busquedaEtiqueta = async (e) => {
    e.preventDefault();
    //console.log(tag.etiqueta)
    try {
      const response = await axios.get(
        `${process.env.API_URL}/publicacionesx/${tag.etiqueta}`
      );
     
      if (response.status === 200) {
        router.push(`/publicaciones/etiqueta/${tag.etiqueta}`)
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

  const pushCrearPublicacion = () => {
    Router.push("/crearPublicacion")
  }

  const pushVerMisPublicaciones = () => {
    router.push(`/publicaciones/personales/${id}`)
  }

  const pushVerMiPerfil = () => {
    router.push(`/`)
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
  


  return (

    <VStack>
      
      <Menu>
        <MenuButton as={Button} right="49%">
          =
        </MenuButton>
        <MenuList>
          <MenuItem onClick={pushVerMisPublicaciones}>Ver mis publicaciones</MenuItem>
          <MenuItem onClick={pushCrearPublicacion}>Crear Publicacion</MenuItem>
          <MenuItem onClick={pushVerMiPerfil}>Mi perfil</MenuItem>
          <MenuItem onClick={cerrarSesion}>Cerrar Sesion</MenuItem>
        </MenuList>
      </Menu>

      <Container borderWidth="2px">
        <FormControl>
          <FormLabel fontSize={20} my={2} >
            Filtrar por Etiqueta
          </FormLabel>
          <HStack>
            <Input
              placeholder="Ingrese etiqueta"
              type={"text"}
              my={3}
              onChange={onEtiqueta}
              name="etiqueta"
            />
            <Button
              colorScheme="red"
              size="md"
              ml="400"
              type="submit"
              my={2}
              onClick={busquedaEtiqueta}
            >
              Buscar
            </Button>

          </HStack>
        </FormControl>
      </Container>
      <Container>{mostrarPublicaciones()}</Container>
    </VStack>
  );
};

export default publicaciones;