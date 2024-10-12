import { useEffect, useState } from "react";
import "./App.css";
import { MdClose } from "react-icons/md";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [recipesList, setRecipesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const fetchProductsData = async (searchQuery = "") => {
    const resp = await fetch("https://dummyjson.com/recipes");
    const data = await resp.json();

    if (resp.ok && data) setRecipesList(data?.recipes);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Backspace" && searchInput.length === 0)
      setSelectedRecipes(selectedRecipes.slice(0, -1));
  }

  function handleClickRecipe(recipe) {
    setShowRecipes(false);
    setSelectedRecipes([...selectedRecipes, recipe]);
    // console.log(selectedRecipes, "Selected Recipes");
  }

  return (
    <div className="App">
      <div className="inputContainer">
        <div className="inputContainer__selectedChips">
          {selectedRecipes?.map((recipe) => (
            <div key={recipe.id} className="inputContainer--single">
              {recipe.name}
              <MdClose
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setSelectedRecipes(
                    selectedRecipes.filter((recp) => recp.id !== recipe.id)
                  )
                }
              />
            </div>
          ))}
        </div>
        <input
          className="inputContainer__inputField"
          placeholder="Search.."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowRecipes(true)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
      {showRecipes && (
        <div className="resultantFields">
          {recipesList
            ?.filter(
              (recipe) =>
                !selectedRecipes.some(
                  (selected) => selected.name === recipe.name
                )
            )
            .filter((recipe) =>
              recipe.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((recipe) => (
              <div
                onClick={() => handleClickRecipe(recipe)}
                className="resultantFields__recipe"
                key={recipe.id}
              >
                <img
                  alt={recipe.name}
                  src={recipe.image}
                  className="resultantFields__recipe--image"
                />
                {recipe.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;