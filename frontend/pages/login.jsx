
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
import comprobarCookies from "../utils/comprobarCookies";

const CFaUserAlt = chakra(FaUserAlt);



const Login = () => {


    const cookies = new Cookies;
    const [rutUsuario, setRutUsuario] = useState();

    useEffect(() => {
        comprobarCookies();
    }, []);


    const handleInput = (e) => {
        setRutUsuario(e.target.value)
    };


    const verificarRut = async (e) => {

        const response = await axios.get(`${process.env.API_URL}/usuario/usr/${rutUsuario}`).then((res) => {
            console.log(res.data.rut);
            if (res.data != null) {
                //console.log("Usuario encontrado");
                cookies.set("id", res.data._id, { path: "/" });
                cookies.set("rut", res.data.rut, { path: "/" });
                cookies.set("nombre", res.data.nombre, { path: "/" });
                cookies.set("correo", res.data.correo, { path: "/" });
                cookies.set("telefono", res.data.telefono, { path: "/" });
                cookies.set("direccion", res.data.direccion, { path: "/" });
                cookies.set("fechaCumpleanio", res.data.fechaCumpleanio, { path: "/" });
                cookies.set("fechaIngreso", res.data.fechaIngreso, { path: "/" });
                cookies.set("rol", res.data.rol, { path: "/" });
                Router.push("../");
            } else {
                alert("Usuario no encontrado");
            }
        }).catch((err) => {
            console.log(err);
        });

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
