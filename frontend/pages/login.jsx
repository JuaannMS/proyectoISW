
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
            if (res.data.length > 0) {
                //console.log("Usuario encontrado");
                cookies.set("id", res.data[0]["_id"], { path: "/" });
                cookies.set("rut", res.data[0]["rut"], { path: "/" });
                cookies.set("nombre", res.data[0]["nombre"], { path: "/" });
                cookies.set("correo", res.data[0]["correo"], { path: "/" });
                cookies.set("telefono", res.data[0]["telefono"], { path: "/" });
                cookies.set("direccion", res.data[0]["direccion"], { path: "/" });
                cookies.set("fechaCumpleanio", res.data[0]["fechaCumpleanio"], { path: "/" });
                cookies.set("fechaIngreso", res.data[0]["fechaIngreso"], { path: "/" });
                cookies.set("rol", res.data[0]["rol"], { path: "/" });
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
