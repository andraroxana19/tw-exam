import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";

function RoomForm(props) {
	const navigate = useNavigate();
	const {spacecraftId} = useParams();
	const [spacecraft, setSpacecraft] = useState({
		name: '',
        maxSpeed: 0,
		weight: 0
	});
	const loadSpacecraft = async (spacecraftId) => {
		if (spacecraftId && spacecraftId !== 'new') {
			const response = await fetch(`/api/spacecrafts/${spacecraftId}`);
			if (response.status === 200) {
				setSpacecraft(await response.json());
			}
		}
	}
	useEffect(() => loadSpacecraft(spacecraftId), [spacecraftId]);
	async function saveSpacecraft() {
		if (spacecraftId === 'new') {
			const response = await fetch('/api/spacecrafts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(spacecraft)
			});
			if (response.status === 201) {
				navigate('/');
			}
		} else {
			const response = await fetch(`/api/spacecrafts/${spacecraftId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(spacecraft)
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	async function deleteSpacecraft() {
		if (spacecraftId && spacecraftId !== 'new') {
			const response = await fetch(`/api/spacecrafts/${spacecraftId}`, {
				method: 'DELETE'
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	function set(property, value) {
		const record = {...spacecraft};
		record[property] = value;
		setSpacecraft(record);
	}
	return (
		<div className="form">
			<h1>Spacecraft</h1>
			<form onSubmit={saveSpacecraft} onReset={() => navigate('/')}>
				
                <label>Name</label>
				<input type="text" value={spacecraft.name}
					onChange={event => set('name', event.target.value)}/>
				
                <label>Maximum Speed</label>
				<input type="number" value={spacecraft.maxSpeed}
					onChange={event => set('maxSpeed', event.target.value)}/>
                
                <label>Weight</label>
				<input type="number" value={spacecraft.weight}
					onChange={event => set('weight', event.target.value)}/>

				<div className="buttons">
					<input type="submit" value="Save"/>
					{spacecraftId && spacecraftId !== 'new' && <input type="button" className="delete"
						value="Delete" onClick={deleteSpacecraft}/>}
					<input type="reset" value="Cancel"/>
				</div>
			</form>
		</div>		
	);
}

export default RoomForm;