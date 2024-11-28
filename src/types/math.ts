export type MathTopic = 
  | "fractions_addition"
  | "fractions_subtraction"
  | "fractions_multiplication"
  | "fractions_division"
  | "fractions_improper_to_mixed"
  | "fractions_mixed_to_improper"
  | "mixed_fractions"
  | "decimals"
  | "percentages"
  | "algebra";

export interface Question {
  id: number;
  question: string;
  answer: string;
  difficulty: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: string[];
  completed: boolean;
}