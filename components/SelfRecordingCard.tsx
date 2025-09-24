import React from 'react';
import { type SelfRecording } from '../types';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { MicrophoneIcon, StopCircleIcon } from './Icons';

interface SelfRecordingCardProps {
  recording: SelfRecording;
  onUpdate: (updatedData: Partial<SelfRecording>) => void;
  index: number;
}

export const SelfRecordingCard: React.FC<SelfRecordingCardProps> = ({ recording, onUpdate, index }) => {
  const handleStopRecording = (audioUrl: string) => {
    onUpdate({ audioUrl });
  };
  const { isRecording, startRecording, stopRecording, recordingTime } = useAudioRecorder(handleStopRecording);

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-4 flex flex-col space-y-4 border border-slate-700 hover:border-indigo-500 transition-all duration-300 min-h-[150px]">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-white">Attempt #{index + 1}</h3>
        {isRecording && (
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm text-red-400 font-mono">{recordingTime}</span>
          </div>
        )}
      </div>

      <div className="flex-grow flex items-center justify-center">
        {recording.audioUrl && !isRecording ? (
          <audio src={recording.audioUrl} controls className="w-full h-10" />
        ) : (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-semibold text-white transition-all duration-200 ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
          >
            {isRecording ? (
              <StopCircleIcon className="w-5 h-5" />
            ) : (
              <MicrophoneIcon className="w-5 h-5" />
            )}
            <span>{isRecording ? 'Stop' : 'Record'}</span>
          </button>
        )}
      </div>
    </div>
  );
};