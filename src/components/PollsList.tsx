import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store'; // Corrected import path
import PollCard from './PollCard';

const PollsList: React.FC = () => {
  // Explicitly type the state parameter with RootState to resolve the error
  const polls = useSelector((state: RootState) => state.polls.polls);

  useEffect(() => {
    // Find the first poll the user hasn't voted on and scroll to it
    const firstUnansweredPoll = polls.find(poll => !poll.userVoted);
    if (firstUnansweredPoll) {
      const pollElement = document.getElementById(`poll-${firstUnansweredPoll.id}`);
      if (pollElement) {
        // Smoothly scroll to that poll
        pollElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [polls]); // Dependency array ensures this runs when polls change

  return (
    <div>
      {polls.map((poll) => (
        // Add an ID to each poll container for scrolling
        <div key={poll.id} id={`poll-${poll.id}`}>
          <PollCard poll={poll} />
        </div>
      ))}
    </div>
  );
};

export default PollsList;
