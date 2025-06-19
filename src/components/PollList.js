import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PollCard from './PollCard';

const PollList = () => {
  const polls = useSelector(state => state.polls.polls);
  const userVotes = useSelector(state => state.polls.userVotes);
  const firstUnansweredPollId = polls.find(p => !userVotes[p.id])?.id;

  useEffect(() => {
    if (firstUnansweredPollId) {
        const element = document.getElementById(`poll-${firstUnansweredPollId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  }, [firstUnansweredPollId]);

  return (
    <div className="space-y-6">
      {polls.map(poll => (
         <div key={poll.id} id={`poll-${poll.id}`}>
            <PollCard poll={poll} />
         </div>
      ))}
    </div>
  );
};

export default PollList;
