import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { vote, editPoll, deletePoll, Poll as PollType } from '../redux/pollsSlice';

interface PollCardProps {
  poll: PollType;
}

const PollCard: React.FC<PollCardProps> = ({ poll }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(poll.question);
  const [editedOptions, setEditedOptions] = useState(poll.options.map(opt => opt.text));
  const hasVoted = poll.userVoted !== null;

  const handleVote = (optionId: number) => {
    dispatch(vote({ pollId: poll.id, optionId }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this poll?')) {
      dispatch(deletePoll(poll.id));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editPoll({ id: poll.id, question: editedQuestion, options: editedOptions }));
    setIsEditing(false);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...editedOptions];
    newOptions[index] = value;
    setEditedOptions(newOptions);
  };

  if (isEditing) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <input
          type="text"
          value={editedQuestion}
          onChange={(e) => setEditedQuestion(e.target.value)}
          className="text-xl font-semibold mb-4 text-gray-800 w-full p-2 border rounded"
        />
        <div className="space-y-3">
          {editedOptions.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full text-left p-3 rounded-lg border-2 border-gray-300"
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    );
  }

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
                className={`w-full text-left p-3 rounded-lg transition-colors duration-300 ${
                    isSelected
                      ? 'bg-blue-200 border-2 border-blue-500'
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
      <div className="mt-4 flex justify-between items-center">
        <div className="text-gray-500 font-medium">
            Total Votes: {poll.totalVotes}
        </div>
        <div className="flex gap-2">
            <button onClick={handleEdit} className="bg-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-yellow-600 text-sm">
                Edit Poll
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 text-sm">
                Delete
            </button>
        </div>
      </div>
    </div>
  );
};

export default PollCard;