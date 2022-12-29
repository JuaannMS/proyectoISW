
//lo unico que hace es mostrar un texto en la pagina de dashboard

import React from 'react'
import Cookies from 'universal-cookie'
import { useEffect, useState } from 'react'
import Router from 'next/router';
import { Button } from '@chakra-ui/react';

const Dashboard = () => {
    // si no hay cookies lo redirijo a login
    const cookies = new Cookies;
    const [id, setId] = useState();
    const [rut, setRut] = useState();
    const [nombre, setNombre] = useState();
    const [correo, setCorreo] = useState();
    const [telefono, setTelefono] = useState();
    const [direccion, setDireccion] = useState();
    const [fechaCumpleanio, setFechaCumpleanio] = useState();
    const [fechaIngreso, setFechaIngreso] = useState();
    const [rol, setRol] = useState();


    //let id = session["id"];


    useEffect(() => {
        setId(cookies.get("id"));
        setRut(cookies.get("rut"));
        setNombre(cookies.get("nombre"));
        setCorreo(cookies.get("correo"));
        setTelefono(cookies.get("telefono"));
        setDireccion(cookies.get("direccion"));
        setFechaCumpleanio(cookies.get("fechaCumpleanio"));
        setFechaIngreso(cookies.get("fechaIngreso"));
        setRol(cookies.get("rol"));
    }, []);

    const eliminarCookies = () => {
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
        <div >
            <h1>Dashboard</h1>
            <h2>id: {id}</h2>
            <h2>rut: {rut}</h2>
            <h2>nombre: {nombre}</h2>
            <h2>correo: {correo}</h2>
            <h2>telefono: {telefono}</h2>
            <h2>direccion: {direccion}</h2>
            <h2>fechaCumpleanio: {fechaCumpleanio}</h2>
            <h2>fechaIngreso: {fechaIngreso}</h2>
            <h2>rol: {rol}</h2>
            <Button onClick={() => {
                eliminarCookies();
            }}>Cerrar Sesion</Button>

        </div>
    )
}

export default Dashboard
