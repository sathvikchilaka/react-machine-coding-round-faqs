import { useEffect, useState } from "react";
import useDebounceEffect from "./useDebounceEffect";
import "./App.css";

function App() {
  const [productsData, setProductsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearchString = useDebounceEffect(searchInput, 1000);

  const fetchProductsData = async (searchTerm = "") => {
    const url = searchTerm
      ? `https://dummyjson.com/products/search?q=${searchTerm}`
      : 'https://dummyjson.com/products';
    
    const resp = await fetch(url);
    const data = await resp.json();
  
    if (data && resp?.ok) setProductsData(data?.products);
  };

  useEffect(() => {
    if (debouncedSearchString) {
      console.log(debouncedSearchString, "Debounce String");
      fetchProductsData(debouncedSearchString);
    } else {
      fetchProductsData();
    }
  }, [debouncedSearchString]);

  return (
    <div className="App">
      <div>
        Search Box
        <input
          placeholder="Search..."
          list="data"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        />
        {/* <div className="options-debouncing">
          {productsData.map((prod) => (
            <span key={prod.id}> {prod.title} </span>
          ))}
        </div> */}
        <div className="options">
          {productsData
            .filter(
              (prod) =>
                prod?.title?.toLowerCase()?.includes(searchInput) ||
                prod?.category?.toLowerCase()?.includes(searchInput)
            )
            .sort((a, b) => b.rating - a.rating)
            .map((prod) => (
              <span key={prod.id}> {prod.title} </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
