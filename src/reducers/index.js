import { combineReducers } from "redux"
import authenticatedUser from "./authenticatedUsers"
import users from "./users"
import questions from "./questions"

export default combineReducers({
	authenticatedUser,
	users,
	questions
})