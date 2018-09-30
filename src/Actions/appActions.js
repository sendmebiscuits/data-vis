let url = 'http://localhost:8000/data/';

export const fetchData = () => {
	return dispatch => {
		fetch(`${url}`, { method: 'GET' })
			.then(res => {
				return res.json();
			})
			.then(res => {
				dispatch({
					type: 'FETCH_DATA',
					data: res.data
				});
			})
			.catch(err => {
				console.error(err);
			});
	};
};

export const fetchTrialData = (chemical, trial) => {
	return dispatch => {
		fetch(
			chemical === 'Holmium'
				? `${url}holmiumTrial${trial}`
				: `${url}KMnO4Trial${trial}`,
			{ method: 'GET' }
		)
			.then(res => {
				return res.json();
			})
			.then(res => {
				dispatch({
					type:
						chemical === 'Holmium'
							? `FETCH_HOLMIUM_${trial}`
							: `FETCH_KMNO4_${trial}`,
					data: res.data
				});
			})
			.catch(err => {
				console.error(err);
			});
	};
};

export const randomizeData = () => {
	return dispatch => {
		return fetch(`${url}randomize`, { method: 'PUT' })
			.then(res => {
				dispatch({
					type: 'RANDOMIZE_DATA'
				});
			})
			.catch(err => {
				console.error(err);
			});
	};
};

export const randomizeAndFetch = () => {
	return dispatch => {
		dispatch(randomizeData())
			.then(res => {
				dispatch(fetchData());
			})
			.catch(err => {
				console.error(err);
			});
	};
};

export const resizeWindow = () => {
	return {
		type: 'RESIZE_WINDOW_DIMENSIONS',
		windowSize: {
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		}
	};
};
