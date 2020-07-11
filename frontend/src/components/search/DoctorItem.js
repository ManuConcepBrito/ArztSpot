import React, { useContext } from "react";
import SearchContext from "../../context/Search/searchContext";
import {Link} from "react-router-dom";

const DoctorItem = ({doctor}) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    specialization,
    avatar,
    languages,
    hospital
  } = doctor;
  const {street, city} = hospital.address_geojson;
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-1 mt-5 offset-1 offset-0">
          <img src={require('../../default.png')} className="rounded-circle" style={{ width: "60px" }} alt="..."/>
        </div>
        <div className="col-9 offset-1 offset-0">
          <div className="card-body">
            <h5 className="card-title">{firstname + ' ' + lastname}</h5>
            <small>{specialization.charAt(0).toUpperCase() + specialization.slice(1)}</small>
            <p className="mt-1 mb-0"><strong>Languages:</strong> {languages.map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(', ')}</p>
            <p className=""><strong>Address:</strong> {street + ', ' + city}</p>
            <Link><button className="btn btn-success offset-9 offset-0">Book!</button></Link>

          </div>
        </div>
      </div>
    </div>
  )
};

export default DoctorItem;
