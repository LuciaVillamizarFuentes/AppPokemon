import { useState, useEffect } from 'react';

const usePokemons = url => {
    const [Pokemons, setPokemons] = useState([]);
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setPokemons(data.pokemon_entries))
    }, []);
    return Pokemons;
};


export default usePokemons;