
export const state = () => ({
	
	assignmentsData: {
		success: false,
		result: [],
		error: {},
	}
});

export const getters =  {
	assignmentsData (state) {
		return state.assignmentsData;
	}
};

export const mutations = {
	
	SET_ASSIGNMENTSDATA (state, assignmentsData) {
		if (assignmentsData && Array.isArray(assignmentsData)) {
			state.assignmentsData.success = true;
			state.assignmentsData.result = assignmentsData;
			state.assignmentsData.error = {};
		} else {
			console.log('error'+assignmentsData);
			state.assignmentsData.success = false;
			state.assignmentsData.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	}
};
 
export const actions = {
	async setAssignmentsData ({commit}, {qs}) {
		await this.$axios.$get(`/key-assignments?${qs}`)
			.then(response =>  {
				// handle success
				commit("SET_ASSIGNMENTSDATA", response);
			})
			.catch((e) => {
				// handle error
				commit("SET_ASSIGNMENTSDATA", error);
			})
			.finally(function () {
				// always executed
			});
		  
	},
	async assignmentAdd ({commit}, payload) {
		await this.$axios.$post('/key-assignments', payload)
			.then(response =>  {
			// handle success
				commit("SET_ASSIGNMENTSDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_ASSIGNMENTSDATA", error);
			})
			.finally(function () {
			// always executed
			});
		
	},
	async updateAssignment ({commit}, payload) {
		await this.$axios.$put('/key-assignments', payload)
			.then(response =>  {
			// handle success
				commit("SET_ASSIGNMENTSDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_ASSIGNMENTSDATA", error);
			})
			.finally(function () {
			// always executed
			});
	
	},
	async deleteAssignment ({commit}, {id}) {
		await this.$axios.$delete(`/key-assignments/${id}`)
			.then(response =>  {
			// handle success
				commit("SET_ASSIGNMENTSDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_ASSIGNMENTSDATA", error);
			})
			.finally(function () {
			// always executed
			});
	
	}
};

