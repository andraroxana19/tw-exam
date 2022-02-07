import {useState, useEffect} from 'react';
import SpacecraftRow from './SpacecraftRow';

function Board() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const loadSpacecrafts = async () => {
    const response = await fetch ('/api/spacecrafts/');
    if (response.status === 200) {
      setSpacecrafts(await response.json());
    }
  };
  useEffect(() => loadSpacecrafts(), []);
  return (
  <div className="container" >
    {
      spacecrafts.map((spacecraft, index) => <SpacecraftRow key={index} spacecraft={spacecraft} index={index} width={100 / spacecraft.length - 1} />)
    }
  </div>
  )
}

export default Board;
