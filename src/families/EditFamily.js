import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditFamily() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [family, setFamily] = useState({
    familyName: "",
    fatherName: "",
    motherName: "",
    children: [],
    address: "",
    contactNumber: "",
    additionalNotes: ""
  });

  useEffect(() => {
    loadFamily();
  }, []);

  const onInputChange = (e) => {
    setFamily({ ...family, [e.target.name]: e.target.value });
  };

  const handleChildInputChange = (index, key, value) => {
    const updatedChildren = [...family.children];
    if (key === 'childName') {
      updatedChildren[index] = { ...updatedChildren[index], name: value };
    } else {
      updatedChildren[index] = { ...updatedChildren[index], [key]: value };
    }
    setFamily({ ...family, children: updatedChildren });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/family/${id}`, family);
    console.log(family);
    navigate("/");
  };

  const loadFamily = async () => {
    const result = await axios.get(`http://localhost:8080/family/${id}`);
    setFamily(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Modifier la famille</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="FamilyName" className="form-label">
                Nom de famille
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter family name"
                name="familyName"
                value={family.familyName}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="FatherName" className="form-label">
               Nom du père
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter father's name"
                name="fatherName"
                value={family.fatherName}
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
                placeholder="Enter mother's name"
                name="motherName"
                value={family.motherName}
                onChange={onInputChange}
              />
            </div>

            {family.children.map((child, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={`ChildName${index}`} className="form-label">
                 Nom de l'enfant {index + 1} 
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter child's name"
                  name={`childName${index}`}
                  value={child.name || ''}
                  onChange={(e) => handleChildInputChange(index, 'childName', e.target.value)}
                />
                <label htmlFor={`ChildDOB${index}`} className="form-label">
                 Date de naissance de l'enfant {index + 1} 
                </label>
                <input
                  type="date"
                  className="form-control"
                  name={`childDOB${index}`}
                  value={child.dateOfBirth || ''}
                  onChange={(e) => handleChildInputChange(index, 'dateOfBirth', e.target.value)}
                />
              </div>
            ))}

            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
               Adresse
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                name="address"
                value={family.address}
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
                placeholder="Enter contact number"
                name="contactNumber"
                value={family.contactNumber}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="AdditionalNotes" className="form-label">
              Commentaire
              </label>
              <textarea
                className="form-control"
                placeholder="Enter any additional notes"
                name="additionalNotes"
                value={family.additionalNotes}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Modifier
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
