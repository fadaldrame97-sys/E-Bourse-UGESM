import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function DemandeBourse(){

    const [type, setType] = useState('premiere_attribution');
    const [erreur, setErreur] = useState('');
    const [succes, setSucces] = useState('');


    const navigate = useNavigate();

}