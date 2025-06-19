import { createSlice } from '@reduxjs/toolkit';

// Helper to get user votes from localStorage
const getUserVotesFromStorage = () => {
  try {
    const persistedState = localStorage.getItem('userVotes');
    if (persistedState) {
      return JSON.parse(persistedState);
    }
  } catch (e) {
    console.error("Could not load user votes from localStorage", e);
  }
  return {};
};

// Helper to save user votes to localStorage
const saveUserVotesToStorage = (userVotes) => {
  try {
    const serializedState = JSON.stringify(userVotes);
    localStorage.setItem('userVotes', serializedState);
  } catch (e) {
    console.error("Could not save user votes to localStorage", e);
  }
};

const initialPolls = [
  {
    id: 'poll1',
    question: 'What is your favorite programming language?',
    options: [
      { id: 'opt1', text: 'JavaScript', votes: 15 },
      { id: 'opt2', text: 'Python', votes: 30 },
      { id: 'opt3', text: 'Rust', votes: 10 },
      { id: 'opt4', text: 'C#', votes: 5 },
    ],
    totalVotes: 60,
  },
  {
    id: 'poll2',
    question: 'Which frontend framework do you prefer?',
    options: [
      { id: 'opt5', text: 'React', votes: 45 },
      { id: 'opt6', text: 'Vue', votes: 15 },
      { id: 'opt7', text: 'Svelte', votes: 8 },
      { id: 'opt8', text: 'Angular', votes: 12 },
    ],
    totalVotes: 80,
  },
  {
    id: 'poll3',
    question: 'How do you take your coffee?',
    options: [
        { id: 'opt9', text: 'Black', votes: 25 },
        { id: 'opt10', text: 'With milk', votes: 20 },
        { id: 'opt11', text: 'Espresso shot', votes: 15 },
    ],
    totalVotes: 60,
  },
];

const pollsSlice = createSlice({
  name: 'polls',
  initialState: {
    polls: initialPolls,
    userVotes: getUserVotesFromStorage(),
  },
  reducers: {
    vote: (state, action) => {
      const { pollId, optionId } = action.payload;
      const poll = state.polls.find(p => p.id === pollId);
      
      if (poll && !state.userVotes[pollId]) {
        const option = poll.options.find(o => o.id === optionId);
        if (option) {
          option.votes += 1;
          poll.totalVotes += 1;
          state.userVotes[pollId] = optionId;
          saveUserVotesToStorage(state.userVotes);
        }
      }
    },
    addPoll: (state, action) => {
      const { question, options } = action.payload;
      const newPoll = {
        id: `poll${Date.now()}`,
        question,
        options: options.map((optText, index) => ({
          id: `opt${Date.now()}${index}`,
          text: optText.trim(),
          votes: 0,
        })).filter(opt => opt.text),
        totalVotes: 0,
      };
      if(newPoll.options.length > 1) {
        state.polls.push(newPoll);
      }
    },
  },
});

export const { vote, addPoll } = pollsSlice.actions;
export default pollsSlice.reducer;
