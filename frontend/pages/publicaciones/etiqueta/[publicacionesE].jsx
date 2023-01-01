import React from 'react'
import { useState, useEffect } from 'react'
import { Textarea, Button, Container, Input, Stack, Text, HStack, Heading, FormControl, FormLabel, Select, VStack, AspectRatio } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Box, Image, button } from '@chakra-ui/react'
import styles from '../../../components/publicaciones.module.css'
import comprobarCookies from '../../../utils/comprobarCookies'
import Cookies from "universal-cookie";
import Router from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Divider} from "@chakra-ui/react";
import {getPublicacionesP} from '../../../data/publicaciones'


export async function getServerSideProps(context) {
  try {
      const response = await axios.get(`${process.env.API_URL}/publicacionesx/${context.query.publicacionesE}`);
      return {
          props: {
              data: response.data
          }
      }
  } catch (err) {
      return {
          redirect: {
              destination: '/publicaciones',
              permanent: true
          }
      }
  }
}

const publicacionesE = ({data}) => {

    const cookies = new Cookies();
    const [id, setId] = useState();
    const [comentario, setComentario] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
	  const router = useRouter();
	  const [publicaciones] = useState(data)
    const [values, setValues] = useState();
    const [comentariosPublicacion, setcomentariosPublicacion] = useState([]);
    const [tituloModal, setTituloModal] = useState();
    const [idPublicacion, setIdPublicacion] = useState();

    useEffect(() => {
      comprobarCookies();
      setId(cookies.get("id"));
    }, []);

    const handleInput = (e) => {
        setComentario(e.target.value);
      };

      const onCambio = (e) => {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        });

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


    return(
        publicaciones.map((publicacion) => {
            return (
                <Container>
                <Box borderWidth="2px" borderRadius="lg" my={6} border="1px">
            <HStack className={styles.publicacionLabelHorizontal}>
              <Box className={styles.nombreUsuario}>
                {publicacion.nombreUsuario}
              </Box>

              <Select placeholder=' ' width='60px' onChange={() => onChange(event,publicacion._id)} name="opcionElegida" >
              <option value='reportar'>Reportar</option>
              <option value='favoritos'>Favoritos</option>
              </Select> 

            </HStack>
            <Box className={styles.publicacionTitulo}>
              {publicacion.titulo}
            </Box>
            <AspectRatio maxW='99%' ratio={1}>
            <iframe title='imagen' src={`/imagenPublicacion/${publicacion._id}`}  />
            </AspectRatio>
            <Box p="2" key={publicacion._id}>
              <HStack className={styles.etiquetayfecha}>
                <Box className={styles.publicacionEtiqueta}>#{publicacion.etiqueta}</Box>
                <Box className={styles.publicacionFecha}>{publicacion.fechaCreacion}</Box>
              </HStack>
              <HStack className={styles.publicacionLabelHorizontal}></HStack>
              <Box>{publicacion.descripcion}</Box>
              <HStack className={styles.publicacionLabelHorizontal}>
                  <Button variant={"ghost"}
                    onClick={() => {
                      darLike(publicacion._id);
                    }}
                  >
                    <Image src="/like.png" alt="like" />
                    <Box as="span" color="gray.600" fontSize="sm">
                      {publicacion.cantLikes} likes
                    </Box>
                  </Button>

              </HStack>
              <VStack className={styles.mostrarComentarios} align="normal">
                <Button  variant={"ghost"}
                  onClick={() => {
                    cargarComentarios(publicacion._id);
                  }}
                >
                  Comentarios
                  <Image src="/flecha.png" alt="flecha" />
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
              
                </Container>
                
            )


        })
     
    )

}


export default publicacionesE