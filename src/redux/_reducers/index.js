import { combineReducers } from 'redux';
import { add} from './add.reducer'
import { loading } from './loading.reducer'
 
const rootReducer = combineReducers({
    add,
    loading
});

export default rootReducer;