import { Question } from "@/types/math";

const generateDecimalQuestion = (operation: string, difficulty: number): Question => {
  const precision = Math.min(3, Math.floor(difficulty / 3));
  const maxNum = Math.pow(10, difficulty);
  
  const num1 = (Math.random() * maxNum).toFixed(precision);
  const num2 = (Math.random() * maxNum).toFixed(precision);
  
  let result: number;
  let questionStr: string;
  
  switch (operation) {
    case "addition":
      result = parseFloat(num1) + parseFloat(num2);
      questionStr = `${num1} + ${num2}`;
      break;
    case "subtraction":
      result = parseFloat(num1) - parseFloat(num2);
      questionStr = `${num1} - ${num2}`;
      break;
    case "multiplication":
      result = parseFloat(num1) * parseFloat(num2);
      questionStr = `${num1} × ${num2}`;
      break;
    case "division":
      result = parseFloat(num1) / parseFloat(num2);
      questionStr = `${num1} ÷ ${num2}`;
      break;
    default:
      result = 0;
      questionStr = "";
  }
  
  return {
    id: Math.random(),
    question: questionStr,
    answer: result.toFixed(precision),
    difficulty
  };
};

export const generateDecimalQuestions = (operation: string, difficulty: number): Question[] => {
  return Array(20).fill(null).map(() => generateDecimalQuestion(operation, difficulty));
};