import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { _getQuestions, _getUsers } from '../api/_DATA'

export default function handleInitialData() {
	return async (dispatch) => {
		const initialData = await Promise.all([ _getQuestions(), _getUsers() ])

		const users = initialData[0]
		const questions = initialData[1]

		dispatch(receiveUsers(users))
		dispatch(receiveQuestions(questions))
	}
}
