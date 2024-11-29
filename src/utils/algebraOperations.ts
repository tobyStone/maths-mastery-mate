import { Question } from "@/types/math";

const generateOneStepQuestion = (difficulty: number): Question => {
  // Only use decimals for difficulty > 7, with specific increments
  const useDecimals = difficulty > 7;
  const answer = useDecimals 
    ? Math.round((Math.random() * (difficulty * 2)) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2) // 0.25 or 0.5 increments
    : Math.floor(Math.random() * (difficulty * 2)) + 1;
  
  const constant = useDecimals
    ? Math.round((Math.random() * difficulty) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * difficulty) + 1;

  const operations = ['+', '-', '×', '÷'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let questionStr: string;
  let result: number;
  
  switch (operation) {
    case '+':
      result = answer;
      questionStr = `Solve:\nx + ${constant} = ${answer + constant}`;
      break;
    case '-':
      result = answer;
      const subtractFormat = Math.random() > 0.5;
      questionStr = subtractFormat 
        ? `Solve:\nx - ${constant} = ${answer - constant}`
        : `Solve:\n${constant} - x = ${constant - answer}`;
      break;
    case '×':
      result = answer;
      questionStr = `Solve:\n${constant} × x = ${answer * constant}`;
      break;
    case '÷':
      result = answer;
      const divideFormat = Math.random() > 0.5;
      questionStr = divideFormat
        ? `Solve:\nx ÷ ${constant} = ${answer / constant}`
        : `Solve:\n${constant} ÷ x = ${constant / answer}`;
      break;
    default:
      result = answer;
      questionStr = `Solve:\nx + ${constant} = ${answer + constant}`;
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
    ? Math.round((Math.random() * difficulty) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * difficulty) + 1;
  
  const constant1 = useDecimals
    ? Math.round((Math.random() * (difficulty / 2)) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * (difficulty / 2)) + 1;
    
  const constant2 = useDecimals
    ? Math.round((Math.random() * (difficulty / 2)) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * (difficulty / 2)) + 1;

  const result = answer;
  const questionStr = `Solve:\n${constant1} × x + ${constant2} = ${(answer * constant1) + constant2}`;

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
    ? Math.round((Math.random() * difficulty) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * difficulty) + 1;
  
  const leftCoefficient = useDecimals
    ? Math.round((Math.random() * (difficulty / 2)) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * (difficulty / 2)) + 1;
    
  const rightCoefficient = useDecimals
    ? Math.round((Math.random() * (difficulty / 2)) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * (difficulty / 2)) + 1;
    
  const constant = useDecimals
    ? Math.round((Math.random() * difficulty) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * difficulty) + 1;

  const result = answer;
  const questionStr = `Solve:\n${leftCoefficient} × x + ${constant} = ${rightCoefficient} × x + ${(leftCoefficient * answer + constant) - (rightCoefficient * answer)}`;

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