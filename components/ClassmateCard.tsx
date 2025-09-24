import React, { useState } from 'react';
import { type Classmate } from '../types';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { MicrophoneIcon, StopCircleIcon } from './Icons';
import { classmateNames } from '../data/classmates';
import { ScoreRatings } from './ScoreRatings';

interface ClassmateCardProps {
  classmate: Classmate;
  onUpdate: (updatedData: Partial<Classmate>) => void;
  index: number;
}

export const ClassmateCard: React.FC<ClassmateCardProps> = ({ classmate, onUpdate, index }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleStopRecording = (audioUrl: string) => {
    onUpdate({ audioUrl });
  };
  const { isRecording, startRecording, stopRecording, recordingTime } = useAudioRecorder(handleStopRecording);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onUpdate({ name: value });

    if (value.trim().length > 0) {
      const filteredSuggestions = classmateNames.filter(name =>
        name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name: string) => {
    onUpdate({ name });
    setSuggestions([]);
  };


  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-5 flex flex-col space-y-4 border border-slate-700 hover:border-indigo-500 transition-all duration-300">
      <h3 className="text-xl font-bold text-white">Classmate #{index + 1}</h3>
      
      <div className="flex-grow space-y-4">
        <div>
          <label htmlFor={`name-${index}`} className="block text-sm font-medium text-slate-400 mb-1">Name</label>
          <div className="relative">
            <input
              type="text"
              id={`name-${index}`}
              value={classmate.name}
              onChange={handleNameChange}
              onBlur={() => setTimeout(() => setSuggestions([]), 150)}
              placeholder="Start typing a name..."
              autoComplete="off"
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-slate-600 border border-slate-500 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
                {suggestions.map((name, i) => (
                  <li
                    key={`${name}-${i}`}
                    onMouseDown={() => handleSuggestionClick(name)}
                    className="px-3 py-2 text-white hover:bg-indigo-500 cursor-pointer transition-colors duration-200"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <label htmlFor={`topic-${index}`} className="block text-sm font-medium text-slate-400 mb-1">Topic / Company</label>
          <input
            type="text"
            id={`topic-${index}`}
            value={classmate.topic}
            onChange={(e) => onUpdate({ topic: e.target.value })}
            placeholder="e.g., Tesla's Marketing Strategy"
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor={`notes-${index}`} className="block text-sm font-medium text-slate-400 mb-1">Notes</label>
          <textarea
            id={`notes-${index}`}
            value={classmate.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            rows={4}
            placeholder="Key points, questions, feedback..."
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>
        
        <div className="pt-2 border-t border-slate-700">
          <ScoreRatings
            scores={classmate.score}
            onUpdate={(updatedScores) => onUpdate({ score: { ...classmate.score, ...updatedScores } })}
            idPrefix={`classmate-${classmate.id}`}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Recording</span>
            {isRecording && <span className="text-sm text-red-400 font-mono animate-pulse">{recordingTime}</span>}
        </div>
        <div className="mt-2">
          {classmate.audioUrl && !isRecording ? (
            <audio src={classmate.audioUrl} controls className="w-full h-10" />
          ) : (
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-semibold text-white transition-all duration-200 ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isRecording ? (
                <StopCircleIcon className="w-5 h-5" />
              ) : (
                <MicrophoneIcon className="w-5 h-5" />
              )}
              <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
