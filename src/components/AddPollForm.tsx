import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPoll } from '../redux/pollsSlice';

interface AddPollFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPollForm: React.FC<AddPollFormProps> = ({ setShowForm }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const dispatch = useDispatch();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOptionField = () => {
    setOptions([...options, '']);
  };

  const removeOptionField = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && options.every(opt => opt.trim())) {
      dispatch(addPoll({ question, options: options.map(opt => opt.trim()) }));
      setShowForm(false); 
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Create a New Poll</h3>
        <button
            onClick={() => setShowForm(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close form"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700">
            Poll Question
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., What's for lunch?"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                placeholder={`Option ${index + 1}`}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOptionField(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOptionField}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
          >
            Add Option
          </button>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default AddPollForm;
