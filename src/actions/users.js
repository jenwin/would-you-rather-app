export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_USER_QUESTIONS = 'SAVE_USER_QUESTIONS';
export const SAVE_USER_ANSWERS = 'SAVE_USER_ANSWERS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    payload: users
  }
}

export function saveUserQuestions({ author, id }) {
  return {
    type: SAVE_USER_QUESTIONS,
    author,
    id
  }
}

export function saveUserAnswers(authedUser, qid, answer) {
  return {
    type: SAVE_USER_ANSWERS,
    authedUser,
    qid,
    answer
  }
}