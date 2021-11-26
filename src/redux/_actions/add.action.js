
import { toast } from 'react-toastify';
import domino from 'domino';
import { getMetadata } from 'page-metadata-parser'
import { loadingConstants, addConstants, messageConstants } from '../_constants'
import { getAddService, deleteAddService, addAddServer, getAddByIdService, updateAddService } from '../../_services/add.service'




export const getAdd = (data) => {
    return (dispatch) => {
        dispatch({ type: loadingConstants.LOADING_TRUE })
        getAddService(data).then(response => {
            console.log(response);
            dispatch({ type: loadingConstants.LOADING_FALSE, data: true })
            dispatch({ type: addConstants.GET_ADDS, data: { ...response.data.data } })
        }).catch(err => {
            dispatch({ type: loadingConstants.LOADING_FALSE });
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error("Somthing went wrong, please try again")
            }
        })
    }
}

export const deletAdds = (_id, pageData) => {
    return (dispatch) => {
        dispatch({ type: loadingConstants.LOADING_TRUE })
        deleteAddService({ _id }).then(response => {
            dispatch({ type: loadingConstants.LOADING_FALSE, data: true })
            dispatch({ type: messageConstants.MESSAGE, data: { message: response.data.data.message } })
            toast.success("Record deleted successfully")
            getAddService(pageData).then(response => {
                dispatch({ type: loadingConstants.LOADING_FALSE, playload: false })
                dispatch({ type: addConstants.GET_ADDS, data: { ...response.data.data } })
            })
        }).catch(err => {
            dispatch({ type: loadingConstants.LOADING_FALSE, data: false });
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error("Somthing went wrong.")
            }
        })
    }
}

export const addAdd = (data, pageData) => {
    return (dispatch) => {
        dispatch({ type: loadingConstants.LOADING_TRUE })
        addAddServer(data)
            .then((response) => {
                dispatch({ type: loadingConstants.LOADING_FALSE, data: true });
                toast.success("Record created successfully.")
                dispatch({ type: loadingConstants.LOADING_TRUE })
                getAddService(pageData).then(response => {
                    dispatch({ type: loadingConstants.LOADING_FALSE, playload: false })
                    dispatch({ type: addConstants.GET_ADDS, data: { ...response.data.data } })
                })
            })
            .catch(err => {
                dispatch({ type: loadingConstants.LOADING_FALSE });
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error("Somthing went wrong.")
                }
            })
    }
}

export const getAddById = (data) => {
    return (dispatch) => {
        dispatch({ type: loadingConstants.LOADING_TRUE })
        getAddByIdService(data).then(response => {
            dispatch({ type: loadingConstants.LOADING_FALSE })
            dispatch({ type: addConstants.GET_SINGLE_ADDS, data: { ...response.data.data } })
        }).catch(err => {
            dispatch({ type: loadingConstants.LOADING_FALSE });
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error("Somthing went wrong, please try again")
            }
        })
    }
}

export const update = (data) => {
    return (dispatch) => {
        dispatch({ type: loadingConstants.LOADING_TRUE })
        updateAddService(data).then(response => {
            dispatch({ type: loadingConstants.LOADING_FALSE, data: true })
            toast.success("Record updated successfully.");
            dispatch({ type: loadingConstants.LOADING_TRUE })
            getAddByIdService(data).then(response => {
                dispatch({ type: loadingConstants.LOADING_FALSE })
                dispatch({ type: addConstants.GET_SINGLE_ADDS, data: { ...response.data.data } })
            })
        }).catch(err => {
            dispatch({ type: loadingConstants.LOADING_FALSE });
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error("Somthing went wrong, please try again")
            }
        })
    }
}


