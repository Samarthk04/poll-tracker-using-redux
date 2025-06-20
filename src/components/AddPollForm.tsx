import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPoll } from '../redux/pollsSlice';

const AddPollForm: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const dispatch = useDispatch();

  /**
   * Updates the text of a specific option field.
   */
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  /**
   * Adds a new, empty option field to the form.
   */
  const addOptionField = () => {
    setOptions([...options, '']);
  };

  /**
   * Removes an option field from the form.
   */
  const removeOptionField = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  /**
   * Handles form submission to create a new poll.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure question and all options are not empty
    if (question.trim() && options.every(opt => opt.trim())) {
      dispatch(addPoll({ question, options: options.map(opt => opt.trim()) }));
      // Reset form fields
      setQuestion('');
      setOptions(['', '']);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Create a New Poll</h3>
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
