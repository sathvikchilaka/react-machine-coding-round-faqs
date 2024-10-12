import { useState } from "react";
import "./App.css";
import { data } from "./data";

function App() {
  const [inputSearch, setInputSearch] = useState("");

  return (
    <div className="App">
      <form>
        <h1>Filter this table</h1>
        <input
          placeholder="Search..."
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </form>

      <table>
        <thead>
          <tr>
            {Object.keys(data[0])
              .filter((col) => col !== "id")
              .map((prop) => (
                <th key={`${prop}-${Date.now()}`}>
                  {prop.replace("_", " ").toUpperCase()}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => {
              const inputSearchText = inputSearch.toLowerCase();

              const filteredItemEntries = Object.entries(item).filter(
                ([key, _]) => key.toLowerCase() !== "id"
              );

              if (inputSearchText.length === 0) return true;

              return Object.entries(filteredItemEntries).some(([_, x]) =>
                String(x).toLowerCase().includes(inputSearchText)
              );
            })
            .map((row) => (
              <tr key={row.id}>
                {Object.entries(row)
                  .filter(([key, _]) => key !== "id")
                  .map(([_, val], i) => (
                    <td key={i}>{val}</td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
