import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store'; 
import PollCard from './PollCard';

const PollsList: React.FC = () => {
  const polls = useSelector((state: RootState) => state.polls.polls);

  useEffect(() => {
    const firstUnansweredPoll = polls.find(poll => !poll.userVoted);
    if (firstUnansweredPoll) {
      const pollElement = document.getElementById(`poll-${firstUnansweredPoll.id}`);
      if (pollElement) {
        pollElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [polls]); 

  return (
    <div>
      {polls.map((poll) => (
        <div key={poll.id} id={`poll-${poll.id}`}>
          <PollCard poll={poll} />
        </div>
      ))}
    </div>
  );
};

export default PollsList;
