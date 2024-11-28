import { Question } from "@/types/math";

const generatePercentageQuestion = (operation: string, difficulty: number): Question => {
  const maxPercent = Math.min(200, difficulty * 20);
  
  const num1 = Math.floor(Math.random() * maxPercent);
  const num2 = Math.floor(Math.random() * maxPercent);
  
  let result: number;
  let questionStr: string;
  
  switch (operation) {
    case "addition":
      result = num1 + num2;
      questionStr = `${num1}% + ${num2}%`;
      break;
    case "subtraction":
      result = num1 - num2;
      questionStr = `${num1}% - ${num2}%`;
      break;
    case "multiplication":
      result = (num1 * num2) / 100;
      questionStr = `${num1}% of ${num2}%`;
      break;
    case "division":
      result = (num1 / num2) * 100;
      questionStr = `${num1}% ÷ ${num2}%`;
      break;
    default:
      result = 0;
      questionStr = "";
  }
  
  return {
    id: Math.random(),
    question: questionStr,
    answer: `${result}%`,
    difficulty
  };
};

export const generatePercentageQuestions = (operation: string, difficulty: number): Question[] => {
  return Array(20).fill(null).map(() => generatePercentageQuestion(operation, difficulty));
};