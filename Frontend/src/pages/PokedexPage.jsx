import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchPokemon } from '../utils/fetchData';
import { transformPokemonName } from '../utils/transformPokemonName';

function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchingPokemon = async () => {
      setPokemonList(await fetchPokemon());
    };
    fetchingPokemon();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-100 to-purple-200 text-black p-6">
  {/* Header */}
  <div className="flex flex-col items-center mb-4">
    <img src="/PokeBrawlLogo.png" alt="" className="w-70 drop-shadow-xl mb-3" />
    <button
      onClick={() => navigate('/')}
      className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 cursor-pointer mb-3"
    >
      Back to Home
    </button>
    <h1
      className="text-2xl font-semibold text-center"
      style={{ fontFamily: 'PokemonFont, sans-serif' }}
    >
      Pokedex
    </h1>
  </div>

  {/* Main content */}
  <div className="flex flex-1 overflow-hidden">
    {/* Left panel - scrollable */}
    <div className="w-1/2 p-4 overflow-y-auto border-r border-blue-300">
      {pokemonList.map((pokemon, index) => (
        <button
          onClick={() => setSelectedPokemon(pokemon)}
          key={index}
          className="flex items-center w-full mb-4 bg-white rounded-lg shadow p-3 hover:bg-blue-100 transition"
        >
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-30 ml-10 mr-4 object-contain mx-auto pixelated"
          />
          <div className="flex-1">
            <p className="text-lg text-gray-600"># {pokemon.id}</p>
            <p className="text-3xl font-semibold capitalize">{pokemon.name}</p>
          </div>
        </button>
      ))}
    </div>

    {/* Right panel - match height */}
    <div className="w-1/2 p-6  flex">
      {selectedPokemon ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full overflow-y-auto flex flex-col">
          <div className="text-center">
            <img
              src={`https://play.pokemonshowdown.com/sprites/gen5ani/${transformPokemonName(
                selectedPokemon.name
              )}.gif`}
              alt={selectedPokemon.name}
              className="w-32 h-32 mx-auto mb-4 pixelated"
            />
            <h2 className="text-3xl font-bold capitalize mb-2">{selectedPokemon.name}</h2>
            <p className="text-gray-600 text-lg mb-2"># {selectedPokemon.id}</p>
          </div>
          <div className="mb-4 flex gap-2 flex-wrap justify-center">
            {selectedPokemon.types.map((typeObj, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-200 text-indigo-800 text-sm rounded-full capitalize"
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 text-xl mt-auto">
            <p><strong>HP:</strong> {selectedPokemon.stats[0].base_stat}</p>
            <p><strong>Speed:</strong> {selectedPokemon.stats[1].base_stat}</p>
            <p><strong>Attack:</strong> {selectedPokemon.stats[2].base_stat}</p>
            <p><strong>Defense:</strong> {selectedPokemon.stats[3].base_stat}</p>
            <p><strong>Special-Attack:</strong> {selectedPokemon.stats[4].base_stat}</p>
            <p><strong>Special-Defense:</strong> {selectedPokemon.stats[5].base_stat}</p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl m-auto">
          Select a Pokemon to view details
        </div>
      )}
    </div>
  </div>
</div>

   
  );
}

export default PokedexPage;
