import { getInitialData } from '../utils/api';
import { receiveUsers, saveUserAnswers, saveUserQuestions } from '../actions/users';
import { receiveQuestions, saveQuestionAnswers, saveQuestions } from '../actions/questions';
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
    });
  };
}

//saves answers
export function handleSaveQuestionAnswers(authedUser, qid, answer) {
  return dispatch => {
    dispatch(showLoading())

    dispatch(saveQuestionAnswers(authedUser, qid, answer))
    dispatch(saveUserAnswers(authedUser, qid, answer))

    return _saveQuestionAnswer({authedUser, qid, answer})
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        console.warn('Error in handleSaveQuestionAnswer', e)
    });
  };
}

//saves new question
export function handleSaveQuestions(optionOneText, optionTwoText, author) {
  return dispatch => {
    dispatch(showLoading())

    return _saveQuestion({optionOneText, optionTwoText, author})
      .then(question => {
        dispatch(saveQuestions(question))
        dispatch(saveUserQuestions(question))
      })
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        console.warn('Error in handleSaveQuestions', e);
      });
   };
}