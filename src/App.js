import './App.css';
import {useState} from 'react'

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  console.log(explorerData, "Explorer Data");
  const [isFolder, setIsFolder] = useState(explorerData?.isFolder);

  const [name, setName] = useState(explorerData?.name);


  return (
    <div className="App">
      {/* <ExplorerStructure isFolder={isFolder} explorerData={explorerData} name={name} /> */}
    </div>
  );
}

export default App;
