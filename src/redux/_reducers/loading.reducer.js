import { loadingConstants } from "../_constants";



export function loading(state = false,action){ 
    switch (action.type) {
        case loadingConstants.LOADING_TRUE:
          return {
            status:true,
            success:false
          }
        case loadingConstants.LOADING_FALSE:
            return {
              status:false,
              success:action.data
            }  
        default:
          return state
      }

}