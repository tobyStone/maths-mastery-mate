import { Question } from "@/types/math";

const generateAlgebraQuestion = (difficulty: number): Question => {
  // Generate a simple one-step equation based on difficulty
  const answer = Math.floor(Math.random() * (difficulty * 10)) + 1; // x value
  const constant = Math.floor(Math.random() * (difficulty * 5)) + 1;
  
  // Randomly choose operation type
  const operations = ['+', '-', '×', '÷'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let questionStr: string;
  let result: number;
  
  switch (operation) {
    case '+':
      result = answer;
      questionStr = `x + ${constant} = ${answer + constant}`;
      break;
    case '-':
      result = answer;
      questionStr = `x - ${constant} = ${answer - constant}`;
      break;
    case '×':
      result = answer;
      questionStr = `${constant}x = ${answer * constant}`;
      break;
    case '÷':
      result = answer;
      questionStr = `x ÷ ${constant} = ${answer / constant}`;
      break;
    default:
      result = answer;
      questionStr = `x + ${constant} = ${answer + constant}`;
  }

  return {
    id: Math.random(),
    question: questionStr,
    answer: result.toString(),
    difficulty
  };
};

export const generateAlgebraQuestions = (difficulty: number): Question[] => {
  return Array(20).fill(null).map(() => generateAlgebraQuestion(difficulty));
};