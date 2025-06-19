import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPoll } from '../redux/pollsSlice';

const AddPollForm = ({ setShowForm }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const dispatch = useDispatch();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const addOptionField = () => {
      if(options.length < 5) {
         setOptions([...options, '']);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && options.filter(o => o.trim()).length > 1) {
      dispatch(addPoll({ question, options }));
      setShowForm(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create a New Poll</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Poll Question</label>
            <input
              type="text" id="question" value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="e.g., What's for lunch?" required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Options</label>
            {options.map((option, index) => (
              <input
                key={index} type="text" value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder={`Option ${index + 1}`} required={index < 2}
              />
            ))}
             <button type="button" onClick={addOptionField} className="text-sm text-blue-600 dark:text-blue-500 hover:underline mt-1">+ Add another option</button>
          </div>
          <div className="flex justify-end gap-3">
             <button type="button" onClick={() => setShowForm(false)} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Cancel
            </button>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Create Poll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPollForm;
