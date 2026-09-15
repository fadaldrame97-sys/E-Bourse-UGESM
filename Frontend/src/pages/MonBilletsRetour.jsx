import { useEffect, useState } from "react";
import axios from "axios";

function MonBilletsRetour() {

    const [billets, setBillets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        axios.get("/api/billets-retour")
            .then(response => {
                setBillets(response.data.billets);
            })
            .catch(() => {
                setError("Impossible de récupérer vos demandes.");
            })
           

    }, []);

  

    if (error) {
        return <p>{error}</p>;
    }

    }
