import React from 'react';
import { useDispatch } from 'react-redux';
import { vote, Poll as PollType } from '../redux/pollsSlice';

interface PollCardProps {
  poll: PollType;
}

const PollCard: React.FC<PollCardProps> = ({ poll }) => {
  const dispatch = useDispatch();
  const hasVoted = poll.userVoted !== null;

  /**
   * Dispatches the vote action when an option is clicked.
   * @param optionId - The ID of the selected option.
   */
  const handleVote = (optionId: number) => {
    if (!hasVoted) {
      dispatch(vote({ pollId: poll.id, optionId }));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 relative">
      {hasVoted && (
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Voted
        </span>
      )}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{poll.question}</h3>
      <div className="space-y-3">
        {poll.options.map((option) => {
          const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
          const isSelected = poll.userVoted === option.id;

          return (
            <div key={option.id}>
              <button
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-300 ${
                  hasVoted
                    ? isSelected
                      ? 'bg-blue-200 border-2 border-blue-500'
                      : 'bg-gray-100 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{option.text}</span>
                  {hasVoted && (
                    <span className="text-sm font-bold text-gray-600">
                      {option.votes} votes ({percentage.toFixed(1)}%)
                    </span>
                  )}
                </div>
              </button>
              {/* Progress bar shown after voting */}
              {hasVoted && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-right text-gray-500 font-medium">
        Total Votes: {poll.totalVotes}
      </div>
    </div>
  );
};

export default PollCard;
