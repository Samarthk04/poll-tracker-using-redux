import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVoted: number | null; 
}

interface PollsState {
  polls: Poll[];
  userVotes: { [pollId: number]: number }; 
}

const defaultPolls: Poll[] = [
    {
      id: 1,
      question: 'Demo',
      options: [
        { id: 1, text: 'demo1', votes: 5 },
        { id: 2, text: 'demo2', votes: 10 },
      ],
      totalVotes: 26,
      userVoted: null,
    },
    {
        id: 2,
        question: 'Which frontend framework do you prefer?',
        options: [
            { id: 1, text: 'React', votes: 15 },
            { id: 2, text: 'Vue', votes: 7 },
            { id: 3, text: 'Angular', votes: 4 },
            { id: 4, text: 'Svelte', votes: 2 },
        ],
        totalVotes: 28,
        userVoted: null,
    },
];


/**
 * load the list of polls from localStorage.
 * @returns An array of poll objects.
 */
const loadPolls = (): Poll[] => {
    try {
        const serializedPolls = localStorage.getItem('polls');
        if (serializedPolls === null) {
            return defaultPolls; 
        }
        return JSON.parse(serializedPolls);
    } catch (err) {
        console.error("Could not load polls from localStorage", err);
        return defaultPolls;
    }
}

/**
 * save the entire list of polls to localstorage.
 * @param polls - array of polls to save.
 */
const savePolls = (polls: Poll[]) => {
    try {
        const serializedPolls = JSON.stringify(polls);
        localStorage.setItem('polls', serializedPolls);
    } catch (err) {
        console.error("Could not save polls to localStorage", err);
    }
};


/**
 * load the user's voting history from localstorage.
 * @returns mapping poll IDs to the user's voted option ID.
 */
const loadUserVotes = (): { [pollId: number]: number } => {
  try {
    const serializedVotes = localStorage.getItem('userVotes');
    if (serializedVotes === null) {
      return {};
    }
    return JSON.parse(serializedVotes);
  } catch (err) {
    console.error("Could not load user votes from localStorage", err);
    return {};
  }
};

/**
 * save the user's voting history to localStorage.
 * @param userVotes   
 */
const saveUserVotes = (userVotes: { [pollId: number]: number }) => {
  try {
    const serializedVotes = JSON.stringify(userVotes);
    localStorage.setItem('userVotes', serializedVotes);
  } catch (err) {
    console.error("Could not save user votes to localStorage", err);
  }
};

const initialState: PollsState = {
  polls: loadPolls(),
  userVotes: loadUserVotes(),
};

initialState.polls.forEach(poll => {
    if (initialState.userVotes[poll.id]) {
        poll.userVoted = initialState.userVotes[poll.id];
    }
});

const pollsSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    vote: (state, action: PayloadAction<{ pollId: number; optionId: number }>) => {
        const { pollId, optionId } = action.payload;
        const poll = state.polls.find((p) => p.id === pollId);
  
        if (poll) {
          const newOption = poll.options.find((o) => o.id === optionId);
  
          if (newOption) {
              if (poll.userVoted !== null && poll.userVoted !== optionId) {
                  const oldOption = poll.options.find((o) => o.id === poll.userVoted);
                  if (oldOption) {
                      oldOption.votes -= 1;
                  }
              } else if (poll.userVoted === null) {
                  poll.totalVotes += 1;
              }
  
              if (poll.userVoted !== optionId) {
                newOption.votes += 1;
                poll.userVoted = optionId;
                state.userVotes[pollId] = optionId;
              }
  
              saveUserVotes(state.userVotes);
              savePolls(current(state).polls);
          }
        }
    },
    addPoll: (state, action: PayloadAction<{ question: string; options: string[] }>) => {
      const { question, options } = action.payload;
      const newPoll: Poll = {
        id: state.polls.length > 0 ? Math.max(...state.polls.map(p => p.id)) + 1 : 1,
        question,
        options: options.map((opt, index) => ({ id: index + 1, text: opt, votes: 0 })),
        totalVotes: 0,
        userVoted: null,
      };
      state.polls.push(newPoll);
      savePolls(current(state).polls);
    },
    editPoll: (state, action: PayloadAction<{ id: number; question: string; options: string[] }>) => {
        const { id, question, options } = action.payload;
        const pollToEdit = state.polls.find(poll => poll.id === id);
        if (pollToEdit) {
            pollToEdit.question = question;
            pollToEdit.options = options.map((text, index) => {
                const existingOption = pollToEdit.options[index];
                return existingOption ? { ...existingOption, text } : { id: index + 1, text, votes: 0 };
            });
            savePolls(current(state).polls);
        }
    },
    deletePoll: (state, action: PayloadAction<number>) => {
        state.polls = state.polls.filter(poll => poll.id !== action.payload);
        delete state.userVotes[action.payload];
        savePolls(current(state).polls);
        saveUserVotes(state.userVotes);
    },
  },
});

export const { vote, addPoll, editPoll, deletePoll } = pollsSlice.actions;
export default pollsSlice.reducer;