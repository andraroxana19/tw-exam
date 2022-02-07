import React, {useState, useEffect} from 'react';
import AstronautRow from './AstronautRow';

function SpacecraftRow(props) {
    const {spacecraft} = props;
	const [astronauts, setAstronauts] = useState([]);
	const style = {
		width: `${props.width}%`,
	};
	const loadAstronauts = async (spacecraftId) => {
		const response = await fetch(`/api/astronauts?spacecraftId=${spacecraftId}`);
		if (response.status === 200) {
			setAstronauts(await response.json());
		}
	};
	useEffect(() => loadAstronauts(spacecraft.id), [spacecraft.id]);
	return (
		
		<div  className={'column background'} style={style}>
			
			<p className="column-title">
				<a href={`#/spacecrafts/${props.spacecraft.id}`}>{props.spacecraft.name}</a>
			</p>
			<div  className="cards">
				{
					astronauts.map((astronaut, index) => <AstronautRow astronaut={astronaut} index={index} key={index}/>)
				}
			</div>
			<div className="addnew">
			<a href={`#/spacecrafts/new`}>Add Spacecraft</a>
		
			</div>
			<div className="addnew">
			<a href={`#/astronauts/new?spacecraftId=${props.spacecraft.id}`}>Add Astronaut</a>
		
			</div>
			
			
		</div>
	);
}

export default SpacecraftRow;