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

     return (
        <div>

            <h2>Mon billet retour</h2>

            {billet === null ? (
                <p>Aucune demande de billet retour.</p>
            ) : (
                <div>

                    <p>
                        Statut : {billet.statut}
                    </p>

                    <p>
                        Date de demande : {billet.date_demande}
                    </p>

                </div>
            )}

        </div>
    );
}

export default MonBilletsRetour;