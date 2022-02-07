import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, useLocation} from "react-router-dom";

function AstronautForm(props) {
	const navigate = useNavigate();
	const {astronautId} = useParams();
	const {search} = useLocation();
	const queryParameters = new URLSearchParams(search);
	const spacecraftId = queryParameters.get('spacecraftId');
	const [astronaut, setAstronaut] = useState({
		name: '',
		role: '',
		spacecraftId: spacecraftId ? spacecraftId : 'new',
	});
	const [spacecrafts, setSpacecrafts] = useState([]);
	const loadAstronauts = async (astronautId) => {
		if (astronautId && astronautId !== 'new') {
			const response = await fetch(`/api/astronauts/${astronautId}`);
			if (response.status === 200) {
				setAstronaut(await response.json());
			}
		}
	}
	const loadSpacecrafts = async () => {
		const response = await fetch(`/api/spacecrafts`);
		if (response.status === 200) {
			setSpacecrafts(await response.json());
		}
	};
	useEffect(() => loadSpacecrafts(), [spacecrafts]);
	useEffect(() => loadAstronauts(astronautId), [astronautId]);
	function set(property, value) {
		const record = {...astronaut};
		record[property] = value;
		setAstronaut(record);
	}
	async function saveAstronaut() {
		if (astronautId === 'new') {
			const response = await fetch(`/api/astronauts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(astronaut)
			});
			if (response.status === 201) {
				navigate('/');
			}
		} else {
			const response = await fetch(`/api/astronauts/${astronautId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(astronaut)
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	async function deleteAstronaut() {
		if (astronaut.id && astronautId !== 'new') {
			const response = await fetch(`/api/astronauts/${astronautId}`, {
				method: 'DELETE'
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	return (
		<div className="form">
			<h1>Astronaut</h1>
			<form onSubmit={saveAstronaut} onReset={() => navigate('/')}>

				<label>Name</label>
				<input type="text" value={astronaut.name}
					onChange={event => set('name', event.target.value)}/>


    			<label>Role</label>
                <input type="text" value={astronaut.role}
					onChange={event => set('role', event.target.value)}/>
                    
				<label>Spacecraft</label>
				<div className="select">
					<select value={astronaut.spacecraftId}
						onChange={event => set('spacecraftId', event.target.value)}>
						<option value="new">-- New --</option>
						{
							spacecrafts.map((spacecraft, index) =>
								(<option key={index} value={spacecraft.id}>{spacecraft.name}</option>))
						}
					</select>
				</div>

				<div className="buttons">
					<input type="submit" value="Save"/>
					{astronautId && astronautId !== 'new' && <input type="button" className="delete"
						value="Delete" onClick={deleteAstronaut}/>}
					<input type="reset" value="Cancel"/>
				</div>
			</form>
		</div>
	);
}

export default AstronautForm;
