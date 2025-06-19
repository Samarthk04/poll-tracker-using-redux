import React from 'react';
import { PlusCircle } from 'lucide-react';

const Header = ({ onAddPollClick }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Shipway <span className="text-blue-600">PollTracker</span>
              </h1>
              <button
                onClick={onAddPollClick}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              >
                <PlusCircle className="w-5 h-5" />
                Add Poll
              </button>
            </div>
          </div>
        </header>
    );
};

export default Header;
