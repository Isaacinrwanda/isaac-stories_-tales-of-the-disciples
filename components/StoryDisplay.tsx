
import React from 'react';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface StoryDisplayProps {
  story: string;
  isLoading: boolean;
  error: string | null;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="mt-8 p-6 text-center">
        <LoadingSpinner className="h-12 w-12 text-amber-500 mx-auto" />
        <p className="mt-4 text-gray-600 animate-pulse">Crafting your unique story...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <h3 className="font-bold">An Error Occurred</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="mt-8 p-10 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
        <p>Your generated story will appear here.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-amber-50/50 border border-amber-200 rounded-lg">
      <h3 className="text-2xl font-bold text-amber-900 mb-4" style={{ fontFamily: "'Times New Roman', serif" }}>
        Your Story
      </h3>
      <div className="prose max-w-none text-gray-800 whitespace-pre-line">
        {story}
      </div>
    </div>
  );
};

export default StoryDisplay;
