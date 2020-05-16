import React, { useState, Fragment } from 'react'
import AddcompForm from './forms/AddcompForm'
import EditcompForm from './forms/EditcompForm'
import UserTable from './tables/UserTable'
import Sample from './sample'
import graphqlQueries from './graphqlQueries';


let firstInit = false;

let App = () => {

	let [ compInfo, setUserInfo] = useState({isAuth : localStorage.getItem("token") != null, nick : localStorage.getItem("nick"), token : localStorage.getItem("token")});

	// Data
	let compsData = [];

	if (firstInit !== true && compInfo.isAuth){
		let requestBody = {
			query: graphqlQueries.FETCH_COMPS
		};
		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				console.log(data.data);
				setcomps(data.data.getComps);
			})
			firstInit = true;
		})
	}

	let initialFormState = { id: null, mark: '', model: '', year: ''};

	// Setting state
	let [ comps, setcomps ] = useState(compsData);
	let [ currentcomp, setCurrentcomp ] = useState(initialFormState);
	let [ editing, setEditing ] = useState(false);


	// CRUD operations
	let addcomp = comp => {
		comp.id = comps.length + 1;

		const requestBody = {
			query: graphqlQueries.CREATE_COMP,
			variables: {
			  mark: comp.mark,
			  model: comp.model,
			  year: comp.year,
			}
		};




		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
			  'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				comps.push(data.data.createComp);
				setcomps(comps.slice());
			})			
		})
	}

	let deletecomp = id => {
		setEditing(false)

		const requestBody = {
			query: graphqlQueries.DELETE_COMP,
			variables: {
			  id: id
			}
		};

		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
			  'Content-Type': 'application/json'
			}
		}).then(() => {
			let requestBody = {
				query: graphqlQueries.FETCH_COMPS
			};

			fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				console.log(data.data);
				setcomps(data.data.getComps);
			})			
		})
		})
	}

	let updatecomp = (id, updatedcomp) => {
		setEditing(false);

		const requestBody = {
			query: graphqlQueries.UPDATE_COMP,
			variables: {
				id : id,
			  	mark: updatedcomp.mark,
			  	model: updatedcomp.model,
			  	year: updatedcomp.year,
			}
		};

		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(() => {
			let requestBody = {
				query: graphqlQueries.FETCH_COMPS
			};

			fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				console.log(data.data);
				setcomps(data.data.getComps);
			})			
		})
		})
	}

	let editRow = comp => {
		setEditing(true)

		setCurrentcomp({ id: comp.id, mark: comp.mark, model: comp.model, year: comp.year })
	}

	let qw = (x) => {
		localStorage.setItem("nick", x.nick);
		localStorage.setItem("token", x.token);
		setUserInfo(x);
	}

	let OnLogOut = () => {
		localStorage.removeItem("nick");
		localStorage.removeItem("token");
		firstInit = false;
		setcomps([]);
		setUserInfo({isAuth : false, nick : "", token : ""});
	}

	return (
		<div className="container">	
			

			{
				compInfo.isAuth ? 
					(<div>
						Hello, {compInfo.nick}
						<br></br>
						<button onClick={OnLogOut}> LogOut </button>
					</div>
					)
						: 
					<Sample handle={qw}/>
			}
			<h1>Computer management</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit computer</h2>
							<EditcompForm
								editing={editing}
								setEditing={setEditing}
								currentcomp={currentcomp}
								updatecomp={updatecomp}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add computer</h2>
							<AddcompForm addcomp={addcomp} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View computers</h2>
					<UserTable comps={comps} editRow={editRow} deletecomp={deletecomp} />
				</div>
			</div>
		</div>
	)
}

export default App
