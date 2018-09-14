let defaultState = {
	containerSize: {
		x: 500,
		y: 500
	},
	graphType: 'BAR_GRAPH',
	showGridLines: true,
	data: null
};

function app(state = defaultState, action) {
	switch (action.type) {
		case '':
			return {
				...state
			};

		default:
			return state;
	}
}

export default app;
