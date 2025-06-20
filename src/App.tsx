import React, { useState } from 'react';
import PollsList from './components/PollList';
import AddPollForm from './components/AddPollForm';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Live Poll Voting App
          </h1>
          <p className="text-gray-600 mt-2">Cast your vote and see real-time results!</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Button to toggle the form visibility */}
          {!showForm && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Create a New Poll
              </button>
            </div>
          )}

          {/* Conditionally render the form and pass down the state setter */}
          {showForm && <AddPollForm setShowForm={setShowForm} />}

          {/* List of all polls */}
          <PollsList />
        </div>
      </main>
    </div>
  );
};

export default App;
