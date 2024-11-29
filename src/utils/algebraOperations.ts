import { Question } from "@/types/math";

const generateOneStepQuestion = (difficulty: number): Question => {
  const useDecimals = difficulty > 7;
  const answer = useDecimals 
    ? Math.round((Math.random() * (difficulty * 10)) * 4) / 4 // Using 0.25 increments for high difficulty
    : Math.floor(Math.random() * (difficulty * 5)) + 1;
  
  const constant = useDecimals
    ? Math.round((Math.random() * (difficulty * 5)) * 2) / 2 // Using 0.5 increments for high difficulty
    : Math.floor(Math.random() * (difficulty * 3)) + 1;

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
      questionStr = `${constant} × x = ${answer * constant}`;
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

const generateTwoStepQuestion = (difficulty: number): Question => {
  const useDecimals = difficulty > 7;
  const answer = useDecimals 
    ? Math.round((Math.random() * (difficulty * 5)) * 4) / 4
    : Math.floor(Math.random() * (difficulty * 3)) + 1;
  
  const constant1 = useDecimals
    ? Math.round((Math.random() * (difficulty * 2)) * 2) / 2
    : Math.floor(Math.random() * (difficulty * 2)) + 1;
    
  const constant2 = useDecimals
    ? Math.round((Math.random() * (difficulty * 2)) * 2) / 2
    : Math.floor(Math.random() * (difficulty * 2)) + 1;

  const result = answer;
  const questionStr = `${constant1} × x + ${constant2} = ${(answer * constant1) + constant2}`;

  return {
    id: Math.random(),
    question: questionStr,
    answer: result.toString(),
    difficulty
  };
};

const generateUnknownsBothSidesQuestion = (difficulty: number): Question => {
  const useDecimals = difficulty > 7;
  const answer = useDecimals 
    ? Math.round((Math.random() * (difficulty * 3)) * 4) / 4
    : Math.floor(Math.random() * (difficulty * 2)) + 1;
  
  const leftCoefficient = useDecimals
    ? Math.round((Math.random() * (difficulty)) * 2) / 2
    : Math.floor(Math.random() * difficulty) + 1;
    
  const rightCoefficient = useDecimals
    ? Math.round((Math.random() * (difficulty)) * 2) / 2
    : Math.floor(Math.random() * difficulty) + 1;
    
  const constant = useDecimals
    ? Math.round((Math.random() * (difficulty * 2)) * 2) / 2
    : Math.floor(Math.random() * (difficulty * 2)) + 1;

  const result = answer;
  const questionStr = `${leftCoefficient} × x + ${constant} = ${rightCoefficient} × x + ${(leftCoefficient * answer + constant) - (rightCoefficient * answer)}`;

  return {
    id: Math.random(),
    question: questionStr,
    answer: result.toString(),
    difficulty
  };
};

export const generateAlgebraQuestions = (type: string, difficulty: number): Question[] => {
  const generator = type === "algebra_one_step" ? generateOneStepQuestion :
                   type === "algebra_two_step" ? generateTwoStepQuestion :
                   generateUnknownsBothSidesQuestion;
                   
  return Array(20).fill(null).map(() => generator(difficulty));
};