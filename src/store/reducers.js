// reducers.js

// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from "redux";

export const UPDATE_DATA = "UPDATE_DATA";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_SESSION = "UPDATE_SESSION";

const defaultState = {
	user: { isAdmin: false },
	data: {},
	session: {
		state: "invalid",
	},
};

const dataReducer = function (state = defaultState.data, action) {
	switch (action.type) {
		case UPDATE_DATA: {
			return {
				...state,
				[action.stateId]: action.data,
			};
		}

		default:
			return state;
	}
};

const userReducer = function (state = defaultState.user, action) {
	switch (action.type) {
		case UPDATE_USER: {
			return {
				...state,
				...action.data,
			};
		}

		default:
			return state;
	}
};

const sessionReducer = (state = defaultState.session, action) => {
	console.log(action);
	switch (action.type) {
		case UPDATE_SESSION: {
			return {
				...state,
				...action.data,
			};
		}

		default:
			return state;
	}
};

// 导出所有reducer
export default combineReducers({
	data: dataReducer,
	user: userReducer,
	session: sessionReducer,
});
