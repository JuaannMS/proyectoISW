
//lo unico que hace es mostrar un texto en la pagina de dashboard

import React from 'react'
import Cookies from 'universal-cookie'
import Router from 'next/router'



const Dashboard = () => {

    // si no hay cookies lo redirijo a login
    const cookies = new Cookies;
    if (typeof window !== "undefined") {
        if (cookies.get("id") === undefined) {
            Router.push("/login");
        }
    }

    return (
        <div>
            <h1>Id usuario {cookies.get('id')}</h1>
            <h1>Rut usuario {cookies.get('rut')}</h1>
            <h1>Nombre usuario {cookies.get('nombre')}</h1>
            <h1>Correo usuario {cookies.get('correo')}</h1>
            <h1>Telefono usuario {cookies.get('telefono')}</h1>
            <h1>Direccion usuario {cookies.get('direccion')}</h1>
            <h1>Fecha cumpleaños usuario {cookies.get('fechaCumpleanio')}</h1>
        </div>
    )
}

export default Dashboard
