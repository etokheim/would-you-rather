import { RECEIVE_USERS } from '../actions/users'
import { ANSWER_QUESTION, ASK_QUESTION } from '../actions/questions'

export default function user(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users
			}
		case ANSWER_QUESTION:
			return {
				...state,
				[action.userId]: {
					...state[action.userId],
					answers: {
						...state[action.userId].answers,
						[action.questionId]: action.answer
					}
				}
			}
		case ASK_QUESTION:
			return {
				...state,
				[action.userId]: {
					...state[action.userId],
					questions: state[action.userId].questions.concat(action.question.id)
				}
			}
		default:
			return state
	}
}
