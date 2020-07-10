import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ASK_QUESTION } from '../actions/questions'

export default (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions
			}
		case ANSWER_QUESTION:
			return {
				...state,
				[action.questionId]: {
					...state[action.questionId],
					optionOne: {
						...state[action.questionId].optionOne,
						votes: action.answer === 'optionOne'
							? state[action.questionId].optionOne.votes.concat(action.userId)
							: state[action.questionId].optionOne.votes.filter((vote) => vote !== action.userId)
					},
					optionTwo: {
						...state[action.questionId].optionTwo,
						votes: action.answer === 'optionTwo'
							? state[action.questionId].optionTwo.votes.concat(action.userId)
							: state[action.questionId].optionTwo.votes.filter((vote) => vote !== action.userId)
					}
				}
			}
		case ASK_QUESTION:
			return {
				...state,
				[action.question.id]: {
					...action.question
				}
			}
		default:
			return state
	}
}
