import React, { useState, useEffect, useContext } from "react";
import useFilter from "../hooks/useFilter";
import ToDoContext from "../context/ToDoContext";
import "../assets/css/Filters.css";
const ApiTipo = "https://pokeapi.co/api/v2/type";
const ApiColor = "https://pokeapi.co/api/v2/pokemon-color";
const ApiGender = "https://pokeapi.co/api/v2/gender";
function Filters() {
  const FiltroTipo = useFilter(ApiTipo);
  const FiltroColor = useFilter(ApiColor);
  const FiltroGender = useFilter(ApiGender);
  const [Select, setSelect] = useState([]);
  const [SelectColor, setSelectColor] = useState([]);
  const [SelectGender, setSelectGender] = useState([]);
  const resultadoFiltro = [];
  const { setToDo, ToDoList } = useContext(ToDoContext);

  var llamar = async () => {
    const reesult1 = Select.map((item) => {
      return fetch("https://pokeapi.co/api/v2/type/" + item).then((response) =>
        response.json()
      );
    });
    const reesultColor = SelectColor.map((itemco) => {
      return fetch("https://pokeapi.co/api/v2/pokemon-color/" + itemco).then(
        (response) => response.json()
      );
    });
    const reesultGender = SelectGender.map((itemge) => {
      return fetch("https://pokeapi.co/api/v2/gender/" + itemge).then(
        (response) => response.json()
      );
    });
    const promisesResults = await Promise.allSettled(reesult1);
    const promisesResultsColor = await Promise.allSettled(reesultColor);
    const promisesResultsGennder = await Promise.allSettled(reesultGender);

    const resulpokemon = promisesResults.map((item) => {
      return item.value.pokemon.map((item2) => {
        return item2.pokemon.name;
      });
    });
    const resulpokemonColor = promisesResultsColor.map((item) => {
      return item.value.pokemon_species.map((item2) => {
        return item2.name;
      });
    });
    const resulpokemonGender = promisesResultsGennder.map((item) => {
      return item.value.pokemon_species_details.map((item2) => {
        return item2.pokemon_species.name;
      });
    });

    var int = [];
    var rseultado = resultadoFiltro.concat(
      resulpokemon,
      resulpokemonColor,
      resulpokemonGender
    );

    if (rseultado.length > 0) {
      int = rseultado.reduce((p, c) => p.filter((e) => c.includes(e)));
    }

    setToDo(int);
  };

  useEffect(() => {
    llamar();
  }, [Select, SelectColor, SelectGender]);

  const togglePermission = (permissionsAlreadyAccepted, checkPermitName) => {
    const newPermissionsAccepted = [...permissionsAlreadyAccepted];
    const position = newPermissionsAccepted.indexOf(checkPermitName);
    if (position === -1) {
        newPermissionsAccepted.push(checkPermitName);
    } else {
        newPermissionsAccepted.splice(position, 1);
    }
    return newPermissionsAccepted;
};

  return (
    <div style={{ width: "20%" }}>
      <h2>TIPO</h2>
      <ul className="DivFiltroTipo">
        {FiltroTipo.map((itemc, keyc) => (
          <div style={{ display: "flex", flexDirection: "row", width: "50%" }}>
            <input
              value={keyc + 1}
              type="checkbox"
              key={keyc}
              onClick={() =>setSelect(togglePermission(Select, keyc+1))}
            />
            <div>{itemc.name}</div>
          </div>
        ))}
      </ul>
      <h2>COLOR</h2>
      <ul>
        {FiltroColor.map((item, key) => (
          <div style={{ display: "flex", flexDirection: "row", width: "10%" }}>
            <input
              value={key + 1}
              type="checkbox"
              id="squaredThree"
              name="check"
              key={key}
              onClick={() =>setSelectColor(togglePermission(SelectColor, key+1))}
            ></input>
            <div>{item.name}</div>
          </div>
        ))}
      </ul>
      <h2>GENERO</h2>
      <ul>
        {FiltroGender.map((itemg, keyg) => (
          <div style={{ display: "flex", flexDirection: "row", width: "10%" }}>
            <input
              value={keyg + 1}
              type="radio"
              key={keyg}
              onClick={() => setSelectGender([keyg + 1])}
              name="gener"
            ></input>
            <div>{itemg.name}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Filters;
