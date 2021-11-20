import React, {
  useState,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import usePokemons from "../hooks/usePokemons";
import "../assets/css/Cards.css";
import { slice, concat } from "lodash";
import Modal from "./Modal";
import Modali, { useModali } from "modali";
import ToDoContext from "../context/ToDoContext";
import Search from "./Search";
const API = "https://pokeapi.co/api/v2/pokedex/national";

const Pokemons = () => {
  const Pokemons = usePokemons(API);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);
  
  const [exampleModal, toggleExampleModal] = useModali({animated: true,
    large: true});
  const [id,setId] =useState("")
  const [nombre,setNom] =useState("")
  const { ToDoList, deleteTodo } = useContext(ToDoContext);
  const [modalOpen, setModalOpen] = useState(false);



  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filteresPokemons = () => {
    if (ToDoList.length == 0) {
      return Pokemons;
    } else if (ToDoList.length[0] == 0) {
      return Pokemons;
    } else if (Pokemons.length > 0 && ToDoList[0].length > 0) {
       const newPokemons = Pokemons.filter((item) => {
        return ToDoList[0].includes(item.pokemon_species.name);
      });
      return newPokemons
    } else {
      return Pokemons;
    }
  };

  const filteredUsersSearshe = () => {
    const FIltroPokemon = filteresPokemons();
    if (Array.isArray(FIltroPokemon) && Pokemons.length != 0) {
      if (FIltroPokemon.length > 0) {
        return  FIltroPokemon.filter((user) => {
          return user.pokemon_species.name
            .toLowerCase()
            .includes(search.toLowerCase());
        });
      } else {
        return Pokemons.filter((user) => {
          return user.pokemon_species.name
            .toLowerCase()
            .includes(search.toLowerCase());
        });
      }
    } else {
      return [];
    }
  };

  const [ListaFilterPokemon,setListaFilterPokemon] = useState(filteredUsersSearshe())
  const LIMIT = 20;
  const LENGTH = ListaFilterPokemon.length;
  const [showMore, setShowMore] = useState(true);
  const [list, setList] = useState(slice(ListaFilterPokemon, 0, LIMIT));
  const [index, setIndex] = useState(LIMIT);
   const loadMore = () => { 
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < LENGTH - 1;
    const newList = concat(list, slice(Pokemons, index, newIndex));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
  };
  

  return (
    <div style={{ width: "80%" }}>
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      <ul className="ContenedorList">
        {filteredUsersSearshe().map((item, key) => (
          <>
            <div
              className="DivCardPokemon"
              key={key}
              onClick={() => {
                toggleExampleModal();
                setId(item.entry_number);
                setNom(item.pokemon_species.name)
              }}
            >
              <img
                src={
                  item.entry_number <= 9
                    ? "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00" +
                      item.entry_number +
                      ".png"
                    : item.entry_number <= 99
                    ? "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0" +
                      item.entry_number +
                      ".png"
                    : "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
                      item.entry_number +
                      ".png"
                }
              />
              {item.pokemon_species.name}
            </div>
          </>
        ))}
      </ul>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      {showMore && <button onClick={loadMore}> Load More </button>}
      <Modali.Modal {...exampleModal}>
        <Modal {...{
            id,
            nombre
        }} />
      </Modali.Modal>
    </div>
  );
};

export default Pokemons;
