import React, { useState } from 'react';
import Header from './components/Header';
import PollList from './components/PollList';
import AddPollForm from './components/AddPollForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        <Header onAddPollClick={() => setShowForm(true)} />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PollList />
        </main>
        
        {showForm && <AddPollForm setShowForm={setShowForm} />}

        <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} PollTracker. All rights reserved.</p>
        </footer>
      </div>
  );
}

export default App;
