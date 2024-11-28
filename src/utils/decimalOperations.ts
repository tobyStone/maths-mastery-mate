import { Question } from "@/types/math";

const generateDecimalQuestion = (operation: string, difficulty: number): Question => {
  // Adjust precision based on difficulty (1-3 decimal places)
  const precision = Math.min(3, Math.floor(difficulty / 3));
  
  // Generate numbers with appropriate scale for the difficulty level
  const maxNum = Math.pow(10, Math.min(5, difficulty));
  
  // Generate two decimal numbers with the calculated precision
  let num1 = parseFloat((Math.random() * maxNum).toFixed(precision));
  let num2 = parseFloat((Math.random() * maxNum).toFixed(precision));
  
  let result: number;
  let questionStr: string;
  
  switch (operation) {
    case "addition":
      result = num1 + num2;
      questionStr = `${num1.toFixed(precision)} + ${num2.toFixed(precision)}`;
      break;
    case "subtraction":
      // Ensure the result is positive by making num1 larger than num2
      if (num1 < num2) {
        [num1, num2] = [num2, num1];
      }
      result = num1 - num2;
      questionStr = `${num1.toFixed(precision)} - ${num2.toFixed(precision)}`;
      break;
    case "multiplication":
      // Scale down numbers for multiplication to avoid extremely large results
      const scaledNum1 = parseFloat((num1 / 10).toFixed(precision));
      const scaledNum2 = parseFloat((num2 / 10).toFixed(precision));
      result = scaledNum1 * scaledNum2;
      questionStr = `${scaledNum1.toFixed(precision)} × ${scaledNum2.toFixed(precision)}`;
      break;
    case "division":
      // Ensure we don't divide by zero and keep numbers manageable
      const dividend = parseFloat((num1).toFixed(precision));
      const divisor = parseFloat(((num2 === 0 ? 1 : num2) / 10).toFixed(precision));
      result = dividend / divisor;
      questionStr = `${dividend.toFixed(precision)} ÷ ${divisor.toFixed(precision)}`;
      break;
    default:
      result = 0;
      questionStr = "";
  }
  
  // Format the result to maintain consistent decimal places
  const formattedResult = parseFloat(result.toFixed(precision));
  
  return {
    id: Math.random(),
    question: questionStr,
    answer: formattedResult.toString(),
    difficulty
  };
};

export const generateDecimalQuestions = (operation: string, difficulty: number): Question[] => {
  return Array(20).fill(null).map(() => generateDecimalQuestion(operation, difficulty));
};
