/* eslint-disable react-hooks/rules-of-hooks */
import { React, useState, useEffect, useRef } from "react";
import {
  Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Select, VStack, Box, Image, button,
  Menu, MenuButton, MenuList, MenuItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Divider, StackDivider, useColorModeValue, Flex, IconButton, FormHelperText, RadioGroup,Radio, Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, AspectRatio
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

  axios.put(`${process.env.API_URL}/publcacionesInactivas`)

  const cookies = new Cookies();
  const [id, setId] = useState();
  const [publicaciones, setPublicaciones] = useState([]);
  const [nombre, setNombre] = useState();
  const [comentariosPublicacion, setcomentariosPublicacion] = useState([]);
  const [tituloModal, setTituloModal] = useState();
  const [idPublicacion, setIdPublicacion] = useState();
  const [comentario, setComentario] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imagenes, setImagenes] = useState([]);

//---------------reporte----------------
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose,
  } = useDisclosure();
   const [reporte, setReporte] = useState();
  const [motivo, setMotivo] = useState();
  const [gravedad, setGravedad] = useState();
  const [values, setValues] = useState();
//--------------------------------------


  useEffect(() => {
    comprobarCookies();
    getPublicaciones();
    imagenes
    setId(cookies.get("id"));
    setNombre(cookies.get("nombre"));
  }, []);

  const handleInput = (e) => {
    setComentario(e.target.value);
  };

  const onChange = async (event, idPublicacion) => {

    if (event.target.value == 'reportar') {

    }

    if (event.target.value == 'favoritos') {

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

  const mostrarPublicaciones = () => {
    return publicaciones.map((publicaciones) => {

      return (
        <>

          <Box borderWidth="2px" borderRadius="lg" my={6} border="1px">
            <HStack className={styles.publicacionLabelHorizontal}>
              <Box className={styles.nombreUsuario}>
                {publicaciones.nombreUsuario}
              </Box>
              <Select placeholder=' ' width='60px' onChange={() => onChange(event, publicaciones._id)} name="opcionElegida" >
                <option value='reportar'>Reportar</option>
              </Select>
            </HStack>
            <Box className={styles.publicacionTitulo}  >
              {publicaciones.titulo}
            </Box>
            <Box  align="center" marginTop={"10%"}>
            <AspectRatio maxW='90%' ratio={1} >
            <iframe title='imagen' src={`/imagenPublicacion/${publicaciones._id}`} />
            </AspectRatio>
            </Box>

            <Box p="2" key={publicaciones._id} >
              <HStack className={styles.etiquetayfecha}>
                <Box className={styles.publicacionEtiqueta}>#{publicaciones.etiqueta}</Box>
                <Box className={styles.publicacionFecha}>{publicaciones.fechaCreacion}</Box>
              </HStack>
              <HStack className={styles.publicacionLabelHorizontal}></HStack>
              <Box>{publicaciones.descripcion}</Box>
              <HStack className={styles.publicacionLabelHorizontal } >
              <Button
                  marginLeft="-10px"
                  variant={"ghost"}
                  onClick={() => {
                    darLike(publicaciones._id);
                  }}
                >
                  <Image src="like.png" alt="like" />
                  <Box as="span" color="gray.600" fontSize="sm">
                    {publicaciones.cantLikes} likes
                  </Box>
                </Button>

              <Button
                  onClick={() => {
                    conseguirId(publicaciones._id);
                  }}
                >
                  Reportar
                </Button>

                <Modal
                  isOpen={isReportOpen}
                  onClose={onReportClose}
                  scrollBehavior="inside"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Reportar La Publicaci??n</ModalHeader>

                    <ModalBody>
                      <Stack divider={<StackDivider />} spacing="6">
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Motivo
                          </Heading>
                          <Text pt="2" fontSize="sm">
                          <FormControl isRequired>
                                    <Input type={"text"}
                                    name={"motivo"}
                                    value={motivo}
                                    onChange={onEntrada}
                                    />
                                    <FormHelperText>
                                      Ingrese el motivo de la denuncia.
                                    </FormHelperText>
                                  </FormControl>
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                          Gravedad del incidente
                          </Heading>
                          <FormControl as="gravedad">
                                  <FormLabel as="gravedad">
                                    La publicacion es una falta:
                                  </FormLabel>
                                  <RadioGroup>
                                    <HStack spacing="24px">
                                      <Radio value="leve" name="gravedad"  onChange={onEntrada}>leve</Radio>
                                      <Radio value="moderada" name="gravedad"  onChange={onEntrada}>moderada</Radio>
                                      <Radio value="grave" name="gravedad"  onChange={onEntrada}>grave</Radio>
                                    </HStack>
                                  </RadioGroup>
                                  <FormHelperText>
                                    Seleccione una alternativa
                                  </FormHelperText>
                                </FormControl>
                        </Box>
                      </Stack>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={() => {
                        onEnviar(idPublicacion);
                        onReportClose();
                      }}>
                        Enviar
                      </Button>
                      <Button variant="ghost" onClick={onReportClose}>Cancelar</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>


                <Button variant={"ghost"} align="flex-end"
                      onClick={() => {
                        darFavorito(publicaciones._id);
                      }}
                    >
                      <Image src="star.png" alt="favorito" />
                    </Button>

              </HStack>
              <VStack className={styles.mostrarComentarios} align="normal">
                <Button variant={"ghost"}
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
    setPublicaciones(response.data);
  };


  const darFavorito = async (idPublicacion) => {
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

//-----------reporte------------------
 const onEntrada = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };


 const conseguirId = async (idP) => {
    setIdPublicacion(idP);
    onReportOpen();
  };


 const onEnviar = async (idPublicacion) => {

    try {
      const json = JSON.stringify({
        idPublicacion: idPublicacion,
        "motivo": values.motivo,
        "gravedad": values.gravedad,
      });

    try {
      const response = await axios
        .post(`${process.env.API_URL}/reporte`, json, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          Swal.fire({
            title: "Exito",
            html: "reporte enviado para su revisi??n",
            icon: "success",
          });
        })
    } catch (error) {
      Swal.fire({
        title: "Error",
        html: "Error al realizar el reporte",
        icon: "error",
      });
    }
    } catch (error) {
      Swal.fire({
        title: "Error",
        html: "Reporte sin contenido",
        icon: "error",
      });
    }



  };

//-------------------------------




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
        text: "No se encuentra ninguna publicacion con esa etiqueta",
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
    router.push("/")
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

    <>

      <Box position='fixed' width='100%' bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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

    
      </Box>

      <VStack>

        <Container position='relative' marginTop={100} borderWidth="2px">
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
        <Container >{mostrarPublicaciones()}</Container>
      </VStack>

    </>

  );
};

export default publicaciones;