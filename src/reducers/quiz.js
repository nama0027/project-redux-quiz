import { createSlice } from '@reduxjs/toolkit';

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: 'What was the color of the umbrella?',
    options: ['red', 'black', 'white', 'grey'],
    correctAnswerIndex: 2,
    path: './assets/visuals/crossing.jpg',
    type: 'picture'
  },
  {
    id: 2,
    questionText: 'Was there anyone who was not looking at the phone?',
    options: ['yes', 'no'],
    correctAnswerIndex: 0,
    path: './assets/visuals/metro.jpg',
    type: 'picture'
  },
  {
    id: 3,
    questionText:
      'There was an advertisement for a broadway show  based on a popular Richard Gere film. Name that film?',
    options: ['Pretty Woman', 'Fugitive', 'Chicago', 'Runaway Bride'],
    correctAnswerIndex: 0,
    path: './assets/visuals/NY-city.mp4',
    type: 'video'
  },
  {
    id: 4,
    questionText: 'Which soft drink bottle was visible in the picture ?',
    options: ['7-Up', 'CocaCola', 'Mountain dew', 'Sprite'],
    correctAnswerIndex: 3,
    path: './assets/visuals/picnic.jpeg',
    type: 'picture'
  },
  {
    id: 5,
    questionText: 'How many tents are in the picture?',
    options: ['7', '11', '14', '19'],
    correctAnswerIndex: 2,
    path: './assets/visuals/camping-site.jpeg',
    type: 'picture'
  },
  {
    id: 6,
    questionText:
      'You saw a woman with a red purse behind the street vendor. What object did she take out from the red purse?',
    options: ['Mask', 'Money', 'Phone', 'Water'],
    correctAnswerIndex: 1,
    path: './assets/visuals/bangkok-purse.mp4',
    type: 'video'
  }
];

const initialState = {
  questions,
  answers: [],
  userName: '',
  currentQuestionIndex: 0,
  quizOver: false
};

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          'Could not find question! Check to make sure you are passing the question id correctly.'
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    addUserName: (state, action) => {
      state.userName = action.payload.userName;
    },
    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      const newInitialState = { ...initialState, userName: 'try again' }
      return newInitialState;
    }
  }

});
