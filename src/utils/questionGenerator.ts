import { MathTopic, Question } from "@/types/math";
import { generateDecimalQuestions } from "./decimalOperations";
import { generatePercentageQuestions } from "./percentageOperations";
import { generateAlgebraQuestions } from "./algebraOperations";
import { generateQuadraticQuestions } from "./quadraticOperations";
import { generateConversionQuestions } from "./conversionOperations";
import { 
  generateFractionAdditionQuestion,
  generateFractionSubtractionQuestion,
  generateFractionMultiplicationQuestion,
  generateFractionDivisionQuestion,
  generateImproperToMixedQuestion,
  generateMixedToImproperQuestion
} from "./fractionOperations";

export const generateQuestions = (topic: MathTopic, difficulty: number): Question[] => {
  const questions: Question[] = [];
  const baseComplexity = Math.max(1, Math.min(10, difficulty));
  
  for (let i = 0; i < 20; i++) {
    const questionDifficulty = Math.min(10, baseComplexity + (i * 0.2));
    
    switch (topic) {
      case "fractions_addition":
        questions.push(generateFractionAdditionQuestion(questionDifficulty));
        break;
      case "fractions_subtraction":
        questions.push(generateFractionSubtractionQuestion(questionDifficulty));
        break;
      case "fractions_multiplication":
        questions.push(generateFractionMultiplicationQuestion(questionDifficulty));
        break;
      case "fractions_division":
        questions.push(generateFractionDivisionQuestion(questionDifficulty));
        break;
      case "fractions_improper_to_mixed":
        questions.push(generateImproperToMixedQuestion(questionDifficulty));
        break;
      case "fractions_mixed_to_improper":
        questions.push(generateMixedToImproperQuestion(questionDifficulty));
        break;
      case "mixed_fractions":
        const randomType = Math.floor(Math.random() * 6);
        switch(randomType) {
          case 0:
            questions.push(generateFractionAdditionQuestion(questionDifficulty));
            break;
          case 1:
            questions.push(generateFractionSubtractionQuestion(questionDifficulty));
            break;
          case 2:
            questions.push(generateFractionMultiplicationQuestion(questionDifficulty));
            break;
          case 3:
            questions.push(generateFractionDivisionQuestion(questionDifficulty));
            break;
          case 4:
            questions.push(generateImproperToMixedQuestion(questionDifficulty));
            break;
          case 5:
            questions.push(generateMixedToImproperQuestion(questionDifficulty));
            break;
        }
        break;
      case "decimals_addition":
        return generateDecimalQuestions("addition", questionDifficulty);
      case "decimals_subtraction":
        return generateDecimalQuestions("subtraction", questionDifficulty);
      case "decimals_multiplication":
        return generateDecimalQuestions("multiplication", questionDifficulty);
      case "decimals_division":
        return generateDecimalQuestions("division", questionDifficulty);
      case "percentages_increase_decrease":
        return generatePercentageQuestions("percentages_increase_decrease", questionDifficulty);
      case "percentages_of_amount":
        return generatePercentageQuestions("percentages_of_amount", questionDifficulty);
      case "percentages_reverse":
        return generatePercentageQuestions("percentages_reverse", questionDifficulty);
      case "algebra_one_step":
      case "algebra_two_step":
      case "algebra_unknowns_both_sides":
        return generateAlgebraQuestions(topic, questionDifficulty);
      case "algebra_factorising_monic":
      case "algebra_factorising_nonmonic":
      case "algebra_expanding_quadratics":
        return generateQuadraticQuestions(topic, questionDifficulty);
      case "conversions_fractions_decimals_percentages":
        return generateConversionQuestions(questionDifficulty);
      default:
        questions.push(generateFractionAdditionQuestion(questionDifficulty));
    }
  }
  
  return questions;
};
