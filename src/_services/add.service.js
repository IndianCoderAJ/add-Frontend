import axios from "axios"
import { hostname } from "../config/config"


export const getAddService = (data) => {
    return axios.post(`${hostname}/add/list`,data)
}

export const deleteAddService = (data) => {
    return axios.delete(`${hostname}/add`,{
        headers: {
        },
        data:data
      })
}

export const addAddServer = (data) => {
    return axios.post(`${hostname}/add/`,data)
}

export const getAddByIdService = (data) => {
    return axios.get(`${hostname}/add/${data._id}`)
}

export const updateAddService = (data) => {
    return axios.put(`${hostname}/add`,data)
}

