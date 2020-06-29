import { _saveQuestion } from '../api/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

function answerQuestion(questionId, userId, answer) {
	return {
		type: ANSWER_QUESTION,
		questionId,
		userId,
		answer
	}
}

export function handleAnswerQuestion(question, userId, option) {
	return async (dispatch) => {
		dispatch(answerQuestion(question.id, userId, option))

		let savedQuestion

		try {
			savedQuestion = await _saveQuestion(question)
		} catch (error) {
			// TODO: Revert the local state if error on save
			console.warn('Error while saving question:', error)
		}

		return savedQuestion
	}
}
