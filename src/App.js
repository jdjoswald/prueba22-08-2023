import logo from './logo.svg';
import './App.css';
import jsonData from './data.json'; 
import React, { useState, useEffect } from 'react'
import moment from 'moment-timezone';

function App() {
  const [peopleData, setPeopleData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [studiesData, setStudiesData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [bloodTypeData, setBloodTypeData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [currentTimes, setCurrentTimes] = useState({}); // 

  useEffect(() => {
   
    setPeopleData(jsonData.people);
    setCitiesData(jsonData.cities);
    setStudiesData(jsonData.studies);
    setGenderData(jsonData.gender);
    setBloodTypeData(jsonData.bloodType);
    setCountriesData(jsonData.countries);
    const initialTimes = {};
    citiesData.forEach(city => {
      const countryName = countriesData.find(country => country.country_id === city.country_id)?.countryName;
      if (countryName && timeZones[countryName]) {
        const date = new Date().toLocaleString('es-ES', { timeZone: timeZones[countryName] });
        initialTimes[city.city_id] = date;
      }
  }, []);


  setCurrentTimes(initialTimes);
  const intervalId = setInterval(() => {
    const newTimes = { ...currentTimes };
    citiesData.forEach(city => {
      const countryName = countriesData.find(country => country.country_id === city.country_id)?.countryName;
      if (countryName && timeZones[countryName]) {
        const date = new Date().toLocaleString('es-ES', { timeZone: timeZones[countryName] });
        newTimes[city.city_id] = date;
      }
    });
    setCurrentTimes(newTimes);
  }, 1000);
  return () => clearInterval(intervalId);
}, [citiesData, countriesData, currentTimes]);

















  const getCityNameById = cityId => {
    const city = citiesData.find(city => city.city_id === cityId);
    return city ? city.cityName : 'N/A';
  };

  const getStudyLevelById = studyId => {
    const study = studiesData.find(study => study.study_id === studyId);
    return study ? study.level : 'N/A';
  };

  const getGenderTypeById = genderId => {
    const gender = genderData.find(gender => gender.gender_id === genderId);
    return gender ? gender.type : 'N/A';
  };

  const getBloodTypeNameById = bloodTypeId => {
    const bloodType = bloodTypeData.find(bloodType => bloodType.bloodType_id === bloodTypeId);
    return bloodType ? bloodType.bloodName : 'N/A';
  };
  const getTimeByCountryId = cityId => {
    const city = citiesData.find(city => city.city_id === cityId);
    if (city) {
      const countryName = countriesData.find(country => country.country_id === city.country_id)?.countryName;
      if (countryName && timeZones[countryName]) {
        const date = new Date().toLocaleString('es-ES', { timeZone: timeZones[countryName] });
        return date;
      }
    }
    return 'N/A';
  };

  const timeZones = {
    'España': 'Europe/Madrid',
    'Francia': 'Europe/Paris',
    'Colombia': 'America/Bogota',
    'Japón': 'Asia/Tokyo',
  };
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tabla de Personas</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>Ciudad</th>
              <th>Estudio</th>
              <th>Género</th>
              <th>Tipo de Sangre</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {peopleData.map(person => (
              <tr key={person.person_id}>
                <td>{person.person_id}</td>
                <td>{person.name}</td>
                <td>{person.surname1}</td>
                <td>{person.age}</td>
                <td>{person.height}</td>
                <td>{person.weight}</td>
                <td>{getCityNameById(person.city_id)}</td>
                <td>{getStudyLevelById(person.study_id)}</td>
                <td>{getGenderTypeById(person.gender_id)}</td>
                <td>{getBloodTypeNameById(person.bloodtype_id)}</td>
                <td>{currentTimes[person.city_id] || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
