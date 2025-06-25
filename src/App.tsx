import React, { useState } from 'react';
import PollsList from './components/PollsList';
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
          {showForm && <AddPollForm setShowForm={setShowForm} />}

          <PollsList />
        </div>
      </main>
    </div>
  );
};

export default App;
