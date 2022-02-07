import React from 'react';

function AstronautRow(props) {
	return (
		<div className={"card background"} >
			<p>
				<a href={`#/astronauts/${props.astronaut.id}`}>{props.astronaut.name}</a>
			</p>
		</div>		
	);
}

export default AstronautRow;