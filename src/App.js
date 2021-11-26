
import './App.css';
import { Route,Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'  
import Listadd from './components/add/Listadd';
import Add from './components/add/Add';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


function App() {
  return (
    <>
    <Router>
       <Switch>
          <Route exact path="/adds/:id" component={Add} />
          <Route exact path="/adds" component={Listadd} />
          <Redirect from="*" to="/adds" />
       </Switch>
    </Router> 
    
   </>
  );
}

export default App;
