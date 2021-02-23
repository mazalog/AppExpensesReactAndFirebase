import React from 'react'
import {Grid} from '@material-ui/core'
import ReactDOM from 'react-dom';
import Ingreso from './Components/Ingreso'
import {  useFirebaseApp } from 'reactfire'
import Contenedor from './Components/Contenedor'
import {FirebaseAppProvider} from 'reactfire'
import firebaseConfig from './Firebase-config'
import Verificacorreo from './Components/VerificaCorreo'

function App() {

  //firebase
  const firebase=useFirebaseApp();
  function Observador (){
    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         mostrarContenido(user)
       } else {
         ReactDOM.render((
         <FirebaseAppProvider firebaseConfig={firebaseConfig} >
                <Ingreso></Ingreso>
           </FirebaseAppProvider>
         ), document.getElementById('estado'));
       }
     });
   }

  //
  function mostrarContenido(user){
     if(user.emailVerified){
      ReactDOM.render((
        <FirebaseAppProvider firebaseConfig={firebaseConfig} >  
             <Contenedor userEmail={user.email}/>
       </FirebaseAppProvider> 
      ), document.getElementById('estado'));
     }
     else{
      ReactDOM.render((
       <FirebaseAppProvider firebaseConfig={firebaseConfig} >  
           <Verificacorreo/>
       </FirebaseAppProvider> 
      ), document.getElementById('estado'));
     }
    }


  return (
    <div>
    <Grid container  justify="center">
      <Grid item xs={1} sm={2} md={2}>
      </Grid>
      <Grid item xs={10} sm={8} md={8}  >
       {
        Observador()
       }
       <div id="estado"></div>
      </Grid>
      <Grid item xs={1} sm={2}  md={2}></Grid>
    </Grid>
    </div>
  );
}

export default App;
