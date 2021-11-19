import "./App.css";
import Pokemons from "./components/Pokemons";
import Filters from "./components/Filters";
import TodoState from "./context/TodoState";

function App() {
  return (
    <div style={{display: 'flex', flexDirection:'row'}} className="App">
      <TodoState>
      <Filters/>
      <Pokemons /> 
      </TodoState>
    </div>
  );
}

export default App;