import roomReducer from "./roomReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
	rooms: roomReducer,
});

export default allReducers;
