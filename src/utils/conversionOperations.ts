import { Question } from "@/types/math";
import { gcd } from "./mathUtils";

const generateConversionQuestion = (difficulty: number): Question => {
  const types = ["fraction_to_decimal", "decimal_to_fraction", "fraction_to_percentage", "percentage_to_fraction"];
  const type = types[Math.floor(Math.random() * types.length)];
  
  // Start with simpler numbers at lower difficulties
  const maxDenominator = Math.min(10, Math.floor(difficulty * 2));
  const denominator = Math.floor(Math.random() * maxDenominator) + 2;
  const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
  
  const decimal = numerator / denominator;
  const percentage = (decimal * 100).toFixed(1);
  
  switch(type) {
    case "fraction_to_decimal":
      return {
        id: Math.random(),
        question: `Convert ${numerator}/${denominator} to a decimal`,
        answer: decimal.toFixed(2),
        difficulty
      };
    case "decimal_to_fraction":
      return {
        id: Math.random(),
        question: `Convert ${decimal.toFixed(2)} to a fraction`,
        answer: `${numerator}/${denominator}`,
        difficulty
      };
    case "fraction_to_percentage":
      return {
        id: Math.random(),
        question: `Convert ${numerator}/${denominator} to a percentage`,
        answer: `${percentage}%`,
        difficulty
      };
    default: // percentage_to_fraction
      return {
        id: Math.random(),
        question: `Convert ${percentage}% to a fraction`,
        answer: `${numerator}/${denominator}`,
        difficulty
      };
  }
};

export const generateConversionQuestions = (difficulty: number): Question[] => {
  return Array(20).fill(null).map(() => generateConversionQuestion(difficulty));
};