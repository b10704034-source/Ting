
import { useState, useRef, useEffect, useCallback } from 'react';

export const useAudioRecorder = (onStop: (audioUrl: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [permission, setPermission] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerInterval = useRef<number | null>(null);

  const getMicrophonePermission = useCallback(async () => {
    if ("MediaRecorder" in window) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setPermission(true);
        // We don't need to keep the stream open, just check for permission
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Microphone permission denied:", err);
        alert("Microphone permission is required to record audio.");
        setPermission(false);
      }
    } else {
        alert("The MediaRecorder API is not supported in your browser.");
    }
  }, []);

  useEffect(() => {
    getMicrophonePermission();
  }, [getMicrophonePermission]);

  const startRecording = async () => {
    if (!permission) {
        await getMicrophonePermission();
        return;
    }

    if (isRecording) return;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorder.current = recorder;
        audioChunks.current = [];
        
        recorder.addEventListener("dataavailable", (event) => {
            audioChunks.current.push(event.data);
        });

        recorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            onStop(audioUrl);
            stream.getTracks().forEach(track => track.stop()); // Release microphone
        });

        recorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        timerInterval.current = window.setInterval(() => {
            setRecordingTime(prevTime => prevTime + 1);
        }, 1000);

    } catch (err) {
        console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      if (timerInterval.current) {
          clearInterval(timerInterval.current);
          timerInterval.current = null;
      }
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      if(mediaRecorder.current && mediaRecorder.current.state === 'recording') {
        mediaRecorder.current.stop();
      }
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return { isRecording, startRecording, stopRecording, recordingTime: formatTime(recordingTime), permission };
};
