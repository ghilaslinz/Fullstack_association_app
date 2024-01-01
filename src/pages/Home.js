import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    loadFamilies();
  }, []);

  const loadFamilies = async () => {
    const result = await axios.get("http://localhost:8080/families");
    setFamilies(result.data);
  };

  const deleteFamily = async (id) => {
    await axios.delete(`http://localhost:8080/family/${id}`);
    loadFamilies();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom de Famile</th>
              <th scope="col">Numéro de téléphone</th>
              <th scope="col">Addresse</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {families.map((family, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{family.familyName}</td>
                <td>{family.contactNumber}</td>
                <td>{family.address}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewfamily/${family.id}`}>
                    Voir
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editfamily/${family.id}`}>
                    Modifier
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteFamily(family.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
