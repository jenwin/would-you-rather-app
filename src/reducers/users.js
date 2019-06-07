import { RECEIVE_USERS, SAVE_USER_QUESTIONS, SAVE_USER_ANSWERS } from '../actions/users';

export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.payload
      };
    case SAVE_USER_QUESTIONS:
      const { author, id } = action;
      return {
       ...state,
      [author]: {
        ...state[author],
        questions: state[author].questions.concat([id])
      }
    };
    case SAVE_USER_ANSWERS:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
        answers: {
          ...state[authedUser].answers,
          [qid]: answer
        }
      }
    };
    default:
      return state
  }
}