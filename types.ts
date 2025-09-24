export interface Scores {
  engagement: number;
  fluency: number;
  bodyLanguage: number;
  structure: number;
  timeManagement: number;
}

export interface Classmate {
  id: number;
  name: string;
  topic: string;
  notes: string;
  score: Scores;
  audioUrl: string | null;
}

export interface SelfRecording {
  id: number;
  audioUrl: string | null;
}