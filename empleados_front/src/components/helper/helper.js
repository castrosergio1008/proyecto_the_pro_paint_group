import { isUndefined } from "util";
import axios from 'axios';
import Cookies from "universal-cookie/es6";
import app from '../../app.json';
const cookies = new Cookies();

const {APIHOST} = app;
export function calcularExpiracionSesion(){
    const now = new Date().getTime();
    const newDate = now + 60 * 30 * 1000;
    return new Date(newDate);
}

export async function getSession(){
    return await isUndefined(cookies.get('_s')) ? false: cookies.get('_s');
}

function renovarSesion() {
    const sesion = getSession();
    if(!sesion) window.location.href = "/login";

    cookies.set("_s", sesion, {
        path: "/",
        expires: calcularExpiracionSesion(),
    });
    return sesion;
}

export const request = {
    get: async function (services) {
        let token = renovarSesion();
        return await axios.get(`${APIHOST}${services}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
    },

    post: async function(services,data){
        let token = renovarSesion();
        return await axios.post(`${APIHOST}${services}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },

    put: async function(services, data){
        let token = renovarSesion();
        return await axios.put(`${APIHOST}${services}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
    });
},

delete: function(services){
    let token = renovarSesion();
    return axios.delete(`${APIHOST}${services}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
},
}