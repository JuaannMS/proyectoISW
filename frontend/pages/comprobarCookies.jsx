import Cookies from "universal-cookie";
import Router from "next/router";


const comprobarCookies = () => {

    const cookies = new Cookies;
    if (!cookies.get("id")) {
        Router.push("/login");

    } else {
        Router.push("../");
    }
}

export default comprobarCookies