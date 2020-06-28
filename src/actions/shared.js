import { getInitialData } from "../utils/api"
import { receiveUsers } from "./users"
import { receiveQuestions } from "./questions"
import { setAuthenticatedUser } from "./authenticatedUser"

const AUTHENTICATED_ID = ""

export function handleInitialData() {
	return async(dispatch) => {
		const initialData = await getInitialData()
		const { questions, users } = initialData

		dispatch(receiveUsers(users))
		dispatch(receiveQuestions(questions))
		dispatch(setAuthenticatedUser(AUTHENTICATED_ID))
	}
}