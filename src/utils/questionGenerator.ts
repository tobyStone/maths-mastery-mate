import { MathTopic, Question } from "@/types/math";
import { generateDecimalQuestions } from "./decimalOperations";
import { generatePercentageQuestions } from "./percentageOperations";
import { generateAlgebraQuestions } from "./algebraOperations";
import { generateConversionQuestions } from "./conversionOperations";
import { generateNegativeQuestions } from "./negativeOperations";
import { generateRatioQuestions } from "./ratioOperations";
import { generateArithmeticQuestions } from "./arithmeticOperations";
import { 
  generateFractionAdditionQuestion,
  generateFractionSubtractionQuestion,
  generateFractionMultiplicationQuestion,
  generateFractionDivisionQuestion,
  generateImproperToMixedQuestion,
  generateMixedToImproperQuestion
} from "./fractionOperations";

export const generateQuestions = (topic: MathTopic, minDifficulty: number, maxDifficulty: number): Question[] => {
  const questions: Question[] = [];
  
  // Generate 16 questions with gradually increasing difficulty
  for (let i = 0; i < 16; i++) {
    const questionDifficulty = minDifficulty + (i * ((maxDifficulty - minDifficulty) / 15));
    const roundedDifficulty = Math.round(questionDifficulty);
    
    if (topic === "arithmetic_integers") {
      return generateArithmeticQuestions(roundedDifficulty).slice(0, 16);
    }
    
    if (topic.startsWith("negative_numbers_")) {
      return generateNegativeQuestions(topic, roundedDifficulty).slice(0, 16);
    }
    
    if (topic.startsWith("ratio_")) {
      return generateRatioQuestions(topic, roundedDifficulty).slice(0, 16);
    }
    
    if (topic.startsWith("algebra_")) {
      return generateAlgebraQuestions(topic, minDifficulty, maxDifficulty);
    }
    
    switch (topic) {
      case "fractions_addition":
        questions.push(generateFractionAdditionQuestion(roundedDifficulty));
        break;
      case "fractions_subtraction":
        questions.push(generateFractionSubtractionQuestion(roundedDifficulty));
        break;
      case "fractions_multiplication":
        questions.push(generateFractionMultiplicationQuestion(roundedDifficulty));
        break;
      case "fractions_division":
        questions.push(generateFractionDivisionQuestion(roundedDifficulty));
        break;
      case "fractions_improper_to_mixed":
        questions.push(generateImproperToMixedQuestion(roundedDifficulty));
        break;
      case "fractions_mixed_to_improper":
        questions.push(generateMixedToImproperQuestion(roundedDifficulty));
        break;
      case "mixed_fractions":
        const randomType = Math.floor(Math.random() * 6);
        switch(randomType) {
          case 0:
            questions.push(generateFractionAdditionQuestion(roundedDifficulty));
            break;
          case 1:
            questions.push(generateFractionSubtractionQuestion(roundedDifficulty));
            break;
          case 2:
            questions.push(generateFractionMultiplicationQuestion(roundedDifficulty));
            break;
          case 3:
            questions.push(generateFractionDivisionQuestion(roundedDifficulty));
            break;
          case 4:
            questions.push(generateImproperToMixedQuestion(roundedDifficulty));
            break;
          case 5:
            questions.push(generateMixedToImproperQuestion(roundedDifficulty));
            break;
        }
        break;
      case "decimals_addition":
        return generateDecimalQuestions("addition", roundedDifficulty);
      case "decimals_subtraction":
        return generateDecimalQuestions("subtraction", roundedDifficulty);
      case "decimals_multiplication":
        return generateDecimalQuestions("multiplication", roundedDifficulty);
      case "decimals_division":
        return generateDecimalQuestions("division", roundedDifficulty);
      case "percentages_increase_decrease":
        return generatePercentageQuestions("percentages_increase_decrease", roundedDifficulty);
      case "percentages_of_amount":
        return generatePercentageQuestions("percentages_of_amount", roundedDifficulty);
      case "percentages_reverse":
        return generatePercentageQuestions("percentages_reverse", roundedDifficulty);
      default:
        questions.push(generateFractionAdditionQuestion(roundedDifficulty));
    }
  }
  
  return questions.slice(0, 16);
};
