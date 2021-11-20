import React from "react";
import "../assets/css/Modal.css";
import useInfo from "../hooks/useInfo";

function Modal({ id, nombre }) {
  const Api1 = "https://pokeapi.co/api/v2/pokemon-species/" + id;
  const Api2 = "https://pokeapi.co/api/v2/pokemon/" + id;
  const ResultSpecies = useInfo(Api1);
  const ResultPokemon = useInfo(Api2);
  var height = "";
  var weight = "";
  var habitad = "";
  var color = "";
   var tipo =[]
  function isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
  
    return true;
  }
  if (!isObjEmpty(ResultSpecies) && !isObjEmpty(ResultPokemon)) {
    height = ResultPokemon.height;
    weight = ResultPokemon.weight;
    habitad = ResultSpecies.habitat.name;
    color = ResultSpecies.color.name;
    tipo = ResultPokemon.types

  }

  return (
    <div className="modalBackground">
      <div className="modalContenctGe">
        <div className="ContentImg">
          <img
            className="imgModal"
            src={
              id <= 9
                ? "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00" +
                  id +
                  ".png"
                : id <= 99
                ? "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0" +
                  id +
                  ".png"
                : "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
                  id +
                  ".png"
            }
          />
        </div>
        <div className="ContenctInfo">
          <div className="ContenctInfoTitle">
            <h2>{nombre}</h2>
            <h4 className="id">
              {id <= 9 ? "00" + id : id <= 99 ? "0" + id : id}
            </h4>
          </div>
          <table className="tabla" >
            <tr>
              <td className="celdas">Height</td>
              <td className="celdas"> {height}</td>
            </tr>
            <tr>
              <td className="celdas">Weight</td>
              <td className="celdas">{weight}</td>
            </tr>
            <tr>
              <td className="celdas">Habitad</td>
              <td className="celdas">{habitad}</td>
            </tr>
            <tr>
              <td className="celdas">Color</td>
              <td className="celdas">{color}</td>
            </tr>
          </table>
          <h2>Types</h2>

            <div className='contenctTipo'>
            {tipo.map((item, key) => (
          <>
            <div className='tipo'>
                {item.type.name}
            </div>
          </>
        ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
