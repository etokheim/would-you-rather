import { RECEIVE_QUESTIONS, ANSWER_QUESTION } from '../actions/questions'

export default function user(state = {}, action) {
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
						votes: action.answer === 0
							? state[action.questionId].optionOne.votes.concat(action.userId)
							: state[action.questionId].optionOne.votes
					},
					optionTwo: {
						...state[action.questionId].optionTwo,
						votes: action.answer === 1
							? state[action.questionId].optionTwo.votes.concat(action.userId)
							: state[action.questionId].optionTwo.votes
					}
				}
			}
		default:
			return state
	}
}
