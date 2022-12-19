import Cookies from "universal-cookie";
import Router from "next/router";


const comprobarCookies = () => {

    const cookies = new Cookies;
    if (!cookies.get("id")) {
        Router.push("/login");

    } else {
        Router.push("../");
    }
    const session = {
        id: cookies.get("id"),
        rut: cookies.get("rut"),
        nombre: cookies.get("nombre"),
        correo: cookies.get("correo"),
        telefono: cookies.get("telefono"),
        direccion: cookies.get("direccion"),
        fechaCumpleanio: cookies.get("fechaCumpleanio"),
        fechaIngreso: cookies.get("fechaIngreso"),
        rol: cookies.get("rol")
    }

    return session
}

export default comprobarCookies