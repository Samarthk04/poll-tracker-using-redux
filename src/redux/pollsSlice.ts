import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a poll option and a single poll
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
  userVoted: number | null; // Stores the optionId if the user has voted
}

// Define the shape of the polls state
interface PollsState {
  polls: Poll[];
  userVotes: { [pollId: number]: number }; // Maps pollId to the voted optionId
}

/**
 * Loads the user's voting history from localStorage.
 * @returns An object mapping poll IDs to the user's voted option ID.
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
 * Saves the user's voting history to localStorage.
 * @param userVotes - The user's votes to save.
 */
const saveUserVotes = (userVotes: { [pollId: number]: number }) => {
  try {
    const serializedVotes = JSON.stringify(userVotes);
    localStorage.setItem('userVotes', serializedVotes);
  } catch (err) {
    console.error("Could not save user votes to localStorage", err);
  }
};

// Initial state with some example polls
const initialState: PollsState = {
  polls: [
    {
      id: 1,
      question: 'What is your favorite programming language?',
      options: [
        { id: 1, text: 'JavaScript', votes: 5 },
        { id: 2, text: 'Python', votes: 10 },
        { id: 3, text: 'Java', votes: 3 },
        { id: 4, text: 'TypeScript', votes: 8 },
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
  ],
  userVotes: loadUserVotes(),
};

// Sync initial poll state with loaded votes from localStorage
initialState.polls.forEach(poll => {
    if (initialState.userVotes[poll.id]) {
        poll.userVoted = initialState.userVotes[poll.id];
    }
});

const pollsSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    /**
     * Handles a user voting on a poll.
     */
    vote: (state, action: PayloadAction<{ pollId: number; optionId: number }>) => {
      const { pollId, optionId } = action.payload;
      const poll = state.polls.find((p) => p.id === pollId);

      // Only allow voting if the user has not already voted on this poll
      if (poll && poll.userVoted === null) {
        const option = poll.options.find((o) => o.id === optionId);
        if (option) {
          option.votes += 1;
          poll.totalVotes += 1;
          poll.userVoted = optionId; // Mark that the user has voted
          state.userVotes[pollId] = optionId; // Update user votes history
          saveUserVotes(state.userVotes); // Persist to localStorage
        }
      }
    },
    /**
     * Adds a new poll to the state.
     */
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
    },
  },
});

export const { vote, addPoll } = pollsSlice.actions;
export default pollsSlice.reducer;
