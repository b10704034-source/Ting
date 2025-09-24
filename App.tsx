import React, { useState } from 'react';
import { ClassmateCard } from './components/ClassmateCard';
import { SelfRecordingCard } from './components/SelfRecordingCard';
import { type Classmate, type SelfRecording, type Scores } from './types';
import { LogoIcon } from './components/Icons';
import { ScoreRatings } from './components/ScoreRatings';

const App: React.FC = () => {
  const initialScores: Scores = {
    engagement: 0,
    fluency: 0,
    bodyLanguage: 0,
    structure: 0,
    timeManagement: 0,
  };

  const initialClassmates: Classmate[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: '',
    topic: '',
    notes: '',
    score: { ...initialScores },
    audioUrl: null,
  }));

  const initialSelfRecordings: SelfRecording[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    audioUrl: null,
  }));

  const [classmates, setClassmates] = useState<Classmate[]>(initialClassmates);
  const [selfRecordings, setSelfRecordings] = useState<SelfRecording[]>(initialSelfRecordings);
  const [overallPracticeScores, setOverallPracticeScores] = useState<Scores>(initialScores);

  const handleClassmateUpdate = (index: number, updatedData: Partial<Classmate>) => {
    const newClassmates = [...classmates];
    newClassmates[index] = { ...newClassmates[index], ...updatedData };
    setClassmates(newClassmates);
  };

  const handleSelfRecordingUpdate = (index: number, updatedData: Partial<SelfRecording>) => {
    const newSelfRecordings = [...selfRecordings];
    newSelfRecordings[index] = { ...newSelfRecordings[index], ...updatedData };
    setSelfRecordings(newSelfRecordings);
  };
  
  const handleOverallPracticeScoresUpdate = (updatedScores: Partial<Scores>) => {
    setOverallPracticeScores(prevScores => ({ ...prevScores, ...updatedScores }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
             <LogoIcon className="h-10 w-10 text-indigo-400" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Peer Feedback & Practice Hub
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Streamline your case study sessions. Record feedback, take notes, and track your own presentation progress effortlessly.
          </p>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold border-b-2 border-slate-700 pb-3 mb-6 text-indigo-400">
              Classmate Feedback
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {classmates.map((classmate, index) => (
                <ClassmateCard
                  key={classmate.id}
                  classmate={classmate}
                  onUpdate={(updatedData) => handleClassmateUpdate(index, updatedData)}
                  index={index}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold border-b-2 border-slate-700 pb-3 mb-6 text-indigo-400">
              My Presentation Practice
            </h2>

            <div className="bg-slate-800 rounded-lg shadow-lg p-5 mb-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Overall Self-Assessment</h3>
              <ScoreRatings
                scores={overallPracticeScores}
                onUpdate={handleOverallPracticeScoresUpdate}
                idPrefix="overall-practice"
                context="self"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
              {selfRecordings.map((recording, index) => (
                <SelfRecordingCard
                  key={recording.id}
                  recording={recording}
                  onUpdate={(updatedData) => handleSelfRecordingUpdate(index, updatedData)}
                  index={index}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;