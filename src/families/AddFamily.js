import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddFamily() {
  let navigate = useNavigate();

  const [family, setFamily] = useState({
    familyName: "",
    fatherName: "",
    motherName: "",
    children: [],
    address: "",
    contactNumber: "",
    additionalNotes: ""
  });

  const { familyName, fatherName, motherName, address, contactNumber, additionalNotes } = family;

  const onInputChange = (e) => {
    setFamily({ ...family, [e.target.name]: e.target.value });
  };

  const handleChildInputChange = (index, key, value) => {
    const updatedChildren = [...family.children];
  
    // Update the corresponding field based on the key
    updatedChildren[index] = { ...updatedChildren[index], [key]: value };
  
    // Update the family state with the updated children
    setFamily({ ...family, children: updatedChildren });
  };
  

  const handleAddChild = () => {
    const newChild = { name: "", dateOfBirth: "" };
    setFamily({ ...family, children: [...family.children, newChild] });
  };

  const handleRemoveChild = (index) => {
    const updatedChildren = family.children.filter((_, i) => i !== index);
    setFamily({ ...family, children: updatedChildren });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the family data to check the structure
      console.log("Family Data:", family);
  
      const response = await axios.post("http://localhost:8080/family", family);
      console.log("Réponse du serveur:", response);
  
      // Check the server response for debugging
      console.log("Server Response Data:", response.data);
  
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la famille:", error.response ? error.response.data : error.message);
      // Gérer les erreurs
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Ajouter une Famille</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="FamilyName" className="form-label">
                Nom de Famille
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nom de Famille"
                name="familyName"
                value={familyName}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="FatherName" className="form-label">
              Prénom du père
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Prénom du père"
                name="fatherName"
                value={fatherName}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="MotherName" className="form-label">
               Nom de la mère
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nom de la mère"
                name="motherName"
                value={motherName}
                onChange={onInputChange}
              />
            </div>

            {/* Liste des enfants */}
            {family.children.map((child, index) => (
              <div key={index} className="mb-3">
                {/* Champs d'entrée pour les enfants */}
                <label htmlFor={`name${index}`} className="form-label">
                Prénom de l'enfant {index + 1} 
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Prénom de l'enfant"
                  name={`name${index}`}
                  value={child.name}
                  onChange={(e) => handleChildInputChange(index, "name", e.target.value)}
                />

                <label htmlFor={`ChildDOB${index}`} className="form-label">
                  Date de naissance de l'enfant {index + 1} 
                </label>
                <input
                  type="date"
                  className="form-control"
                  name={`childDOB${index}`}
                  value={child.dateOfBirth}
                  onChange={(e) => handleChildInputChange(index, "dateOfBirth", e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveChild(index)}
                >
                 Supprimer
                </button>
              </div>
            ))}

            {/* Bouton pour ajouter un enfant */}
            <button type="button" className="btn btn-primary" onClick={handleAddChild}>
              Ajouter un enfant
            </button>

            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
               Adresse
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Adresse"
                name="address"
                value={address}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ContactNumber" className="form-label">
              Numéro de téléphone
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Numéro de téléphone"
                name="contactNumber"
                value={contactNumber}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="AdditionalNotes" className="form-label">
              Commentaire
              </label>
              <textarea
                className="form-control"
                placeholder=" Commentaire"
                name="additionalNotes"
                value={additionalNotes}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
             Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
             Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
