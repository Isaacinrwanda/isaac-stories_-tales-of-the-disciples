import React, { useState, useCallback } from 'react';
import type { Disciple, Language, Audience } from './types';
import { DISCIPLES, LANGUAGES, AUDIENCES } from './constants';
import { generateStory } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import StoryDisplay from './components/StoryDisplay';
import OptionsSelector from './components/OptionsSelector';

const App: React.FC = () => {
  const [selectedDisciple, setSelectedDisciple] = useState<Disciple | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES.find(l => l.code === 'en') || LANGUAGES[0]);
  const [selectedAudience, setSelectedAudience] = useState<Audience>(AUDIENCES[0]);

  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStory = useCallback(async () => {
    if (!selectedDisciple) {
      setError('Please select a disciple first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStory('');

    try {
      const result = await generateStory(
        selectedDisciple.name,
        selectedLanguage.name,
        selectedAudience.name
      );
      setStory(result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate story. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDisciple, selectedLanguage, selectedAudience]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-10 border border-amber-200">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2 text-center">Create Your Story</h2>
          <p className="text-center text-gray-600 mb-8">Select a disciple, language, and audience to generate a unique story.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <OptionsSelector
              label="Disciple"
              options={DISCIPLES.map(d => ({ value: d.id, label: d.name }))}
              value={selectedDisciple?.id || ''}
              onChange={(id) => setSelectedDisciple(DISCIPLES.find(d => d.id === id) || null)}
              placeholder="Choose a Disciple"
            />
            <OptionsSelector
              label="Language"
              options={LANGUAGES.map(l => ({ value: l.code, label: l.name }))}
              value={selectedLanguage.code}
              onChange={(code) => setSelectedLanguage(LANGUAGES.find(l => l.code === code) || LANGUAGES[0])}
            />
            <OptionsSelector
              label="Audience"
              options={AUDIENCES.map(a => ({ value: a.id, label: a.name }))}
              value={selectedAudience.id}
              onChange={(id) => setSelectedAudience(AUDIENCES.find(a => a.id === id) || AUDIENCES[0])}
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleGenerateStory}
              disabled={isLoading || !selectedDisciple}
              className="px-8 py-3 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? 'Generating...' : 'Generate Story'}
            </button>
          </div>
          
          <StoryDisplay story={story} isLoading={isLoading} error={error} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;