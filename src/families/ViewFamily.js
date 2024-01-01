import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewFamily() {
  const [family, setFamily] = useState({
    familyName: "",
    fatherName: "",
    motherName: "",
    children: [],
    address: "",
    contactNumber: "",
    additionalNotes: ""
  });

  const { id } = useParams();

  useEffect(() => {
    loadFamily();
  }, [id]);  // Ajout de id comme dépendance pour réagir aux changements d'ID

  const loadFamily = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/family/${id}`);
      setFamily(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement de la famille:", error);
      // Gestion des erreurs ou affichage d'un message
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Les informations de la famille</h2>

          <div className="card">
            <div className="card-header">
             {/* Details of family id : {family.id}  */}
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>Nom de Famille:</b> {family.familyName}</li>
                <li className="list-group-item"><b>Prénom du père:</b> {family.fatherName}</li>
                <li className="list-group-item"><b>Nom de la mère:</b> {family.motherName}</li>
                <li className="list-group-item">
                  <b>Enfants:</b> 
                  <ol>
                  {family.children && family.children.map((child, index) => (
                    <div key={index}>
                      <li> {child.name} <span>&nbsp;&nbsp;</span>
                       Née le : {child.dateOfBirth}</li>
                    </div>
                  ))}
                  </ol>
                </li>
                <li className="list-group-item"><b>Addresse:</b> {family.address}</li>
                <li className="list-group-item"><b>Numéro de téléphone:</b> {family.contactNumber}</li>
                <li className="list-group-item"><b>Commentaire:</b> {family.additionalNotes}</li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
          Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
