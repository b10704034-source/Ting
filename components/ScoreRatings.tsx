import React from 'react';
import { type Scores } from '../types';

interface ScoreRatingsProps {
  scores: Scores;
  onUpdate: (updatedScores: Partial<Scores>) => void;
  idPrefix: string;
  context?: 'peer' | 'self';
}

type ScoreCategory = keyof Scores;

const getScoreCategories = (context: 'peer' | 'self' = 'peer') => {
    const isSelf = context === 'self';
    const selfEvalText = isSelf ? '(自評)' : '';

    return [
        { key: 'engagement', title: `吸引聽眾程度${selfEvalText}`, labelMin: '非常無趣', labelMax: '非常有趣' },
        { key: 'fluency', title: `口條流暢程度${selfEvalText}`, labelMin: '非常卡', labelMax: '非常流暢' },
        { key: 'bodyLanguage', title: `肢體動作${selfEvalText}`, labelMin: '缺乏', labelMax: '豐富' },
        { key: 'structure', title: `架構明確${selfEvalText}`, labelMin: '非常不明確', labelMax: '非常明確' },
        { key: 'timeManagement', title: `時間掌控程度${selfEvalText}`, labelMin: '不佳', labelMax: '非常剛好' },
    ] as const;
};

const RatingInput: React.FC<{
    category: ReturnType<typeof getScoreCategories>[number];
    value: number;
    onChange: (key: ScoreCategory, value: number) => void;
    name: string;
}> = ({ category, value, onChange, name }) => (
    <div className="space-y-2">
        <p className="text-sm font-medium text-slate-300">{category.title}</p>
        <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-slate-400 text-left flex-shrink-0">{category.labelMin}</span>
            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                    <label key={num} className="cursor-pointer" title={`${num}`}>
                        <input
                            type="radio"
                            name={name}
                            value={num}
                            checked={value === num}
                            onChange={() => onChange(category.key, num)}
                            className="sr-only peer"
                        />
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-slate-600 text-slate-300 peer-checked:bg-indigo-500 peer-checked:text-white transition-colors duration-200">
                            {num}
                        </span>
                    </label>
                ))}
            </div>
            <span className="text-xs text-slate-400 text-right flex-shrink-0">{category.labelMax}</span>
        </div>
    </div>
);


export const ScoreRatings: React.FC<ScoreRatingsProps> = ({ scores, onUpdate, idPrefix, context }) => {
  const handleScoreChange = (key: ScoreCategory, value: number) => {
    onUpdate({ [key]: value });
  };

  // FIX: Explicitly handle the default value for the optional `context` prop to prevent potential type inference issues.
  const scoreCategories = getScoreCategories(context ?? 'peer');

  return (
    <div className="space-y-4">
      {scoreCategories.map((cat) => (
        <RatingInput
          key={cat.key}
          category={cat}
          value={scores[cat.key]}
          onChange={handleScoreChange}
          name={`${idPrefix}-${cat.key}`}
        />
      ))}
    </div>
  );
};
