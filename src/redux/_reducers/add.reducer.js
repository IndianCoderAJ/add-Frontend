import { addConstants } from "../_constants";


const initalState = {
  list:{},
  singleAdd:{
     _id:'',
     name:'',
     type:'',
     content_url:'',
     heading:'',
     primary_text:'',
     destination_url:'',
    }
}
export function add(state = {...initalState},action){
    switch (action.type) {
        case addConstants.GET_ADDS:
          return {
            ...state,
            list:action.data
          };
        case addConstants.GET_SINGLE_ADDS:
          return {
            ...state,
            singleAdd:{...action.data}
          }
        case addConstants.RESET_SINGLE_ADD:
           return {
             ...state,
             singleAdd:{
              _id:'',
              name:'',
              type:'',
              content_url:'',
              heading:'',
              primary_text:'',
              destination_url:'',
             }
           }
        default:
          return state
      }
}