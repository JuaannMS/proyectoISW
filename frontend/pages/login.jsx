import { useState, useEffect } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
} from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const CFaUserAlt = chakra(FaUserAlt);

const Login = () => {

    
    const cookies = new Cookies;
    const [rutUsuario, setRutUsuario] = useState();

    const handleInput = (e) => {
        setRutUsuario(e.target.value)
    };


    const verificarRut = async (e) => {
        if (rutUsuario) {
            const response = await axios.get(`${process.env.API_URL}/usuario/usr/${rutUsuario}`).then((res) => {
                if (res.data) {
                    Swal.fire({
                        title: "Exito",
                        html: "Ingresando...",
                        icon: "success",
                      });
                    cookies.set("id", res.data._id, { path: "/" });
                    cookies.set("rut", res.data.rut, { path: "/" });
                    cookies.set("nombre", res.data.nombre, { path: "/" });
                    cookies.set("correo", res.data.correo, { path: "/" });
                    cookies.set("telefono", res.data.telefono, { path: "/" });
                    cookies.set("direccion", res.data.direccion, { path: "/" });
                    cookies.set("fechaCumpleanio", res.data.fechaCumpleanio, { path: "/" });
                    cookies.set("fechaIngreso", res.data.fechaIngreso, { path: "/" });
                    cookies.set("rol", res.data.rol, { path: "/" });
                    if (res.data.rol === "638e8c823fdb04c7747adbe8") {
                        Router.push("/publicacionesAdmi");
                    }
                    else {
                        Router.push("/publicaciones");
                    }
                    
                }
            }).catch((err) => {
                Swal.fire({
                    title: "Error",
                    html: "Usuario no encontrado",
                    icon: "error",
                });
            });
        }else {
            Swal.fire({
                title: "Advertencia",
                html: "Debe ingresar un rut",
                icon: "warning",
            });
        }
    }

    return (
        <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
            <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Bienvenido</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <CFaUserAlt color="gray.300" />
                                    </InputLeftElement>
                                    <Input placeholder="Rut usuario" onChange={handleInput} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }} />
                                </InputGroup>
                            </FormControl>
                            <Button onClick={() => { verificarRut() }}>Ingresar</Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login;
