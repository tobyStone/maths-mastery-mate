export type MathTopic = 
  | "fractions_addition"
  | "fractions_subtraction"
  | "fractions_multiplication"
  | "fractions_division"
  | "fractions_improper_to_mixed"
  | "fractions_mixed_to_improper"
  | "mixed_fractions"
  | "decimals_addition"
  | "decimals_subtraction"
  | "decimals_multiplication"
  | "decimals_division"
  | "percentages_increase_decrease"
  | "percentages_of_amount"
  | "percentages_reverse"
  | "algebra_one_step"
  | "algebra_two_step"
  | "algebra_unknowns_both_sides"
  | "algebra_factorising_monic"
  | "algebra_factorising_nonmonic"
  | "algebra_expanding_quadratics"
  | "conversions_fractions_decimals_percentages";

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
