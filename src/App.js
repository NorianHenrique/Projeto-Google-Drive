import logo from './logo.svg';
import React,{useEffect,useState} from 'react';
import Home from './Home';
import {auth, provider} from './firebase';
import './App.css';
import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';

function App() {
  const[user,setUser] = useState(null);

  useEffect(()=>{
     auth.onAuthStateChanged((val)=>{
        setUser({
        nome: val.displayName,
        email: val.email,
        imagem: val.photoURL,
        uid: val.uid,
      });
        

     })
  },[])
  

  function handleLogin(e){
      e.preventDefault();
      auth.signInWithPopup(provider)
      .then(function(result){
           if(result){
              setUser(result.user.email);
           }
      })

  }

  return (
    <div className="App">
      {(user)?(
        <Router>

           <Routes>
             
           <Route path="/" element={<Home user={user} />}>
           </Route>

           <Route path="/" element={<Home user={user} />}>
           </Route>
           
  
            

           </Routes>
        </Router>
      ):
        <div className="btnLogin"><a onClick={(e)=>handleLogin(e)} href='#'>Fazer Login</a></div>
      }
      
    </div>
  );
}

export default App;
