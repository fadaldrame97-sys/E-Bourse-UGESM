import { useState } from "react";
import api from "../api/axios";

function Login(){

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [erreur, setErreur]=useState('');

    function gererConnexion(e){

        e.preventDefault();
        setErreur();

        api.post('/login',{email:email, password:password})
        .then(function(reponse){
            console.log('connexion réussi',reponse.data)
        })

    }

}