import { Question } from "@/types/math";

const formatCoefficient = (coefficient: number) => {
  if (coefficient === 1) return "";
  if (coefficient === -1) return "-";
  return coefficient.toString();
};

const generateOneStepQuestion = (difficulty: number): Question => {
  const operators = ["×", "÷", "+", "-"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const coefficient = Math.floor(Math.random() * 4) + 2;
  let answer: number;
  let questionStr: string;

  switch(operator) {
    case "÷":
      do {
        answer = Math.floor(Math.random() * (difficulty * 2)) + 1;
      } while (isRecurringDecimal(answer * coefficient));
      questionStr = `${answer} = x ÷ ${coefficient}`;
      answer = answer * coefficient;
      break;
    case "×":
      answer = Math.floor(Math.random() * (difficulty * 2)) + 1;
      questionStr = `${answer * coefficient} = ${coefficient}x`;
      break;
    case "+":
      answer = Math.floor(Math.random() * (difficulty * 2)) + 1;
      questionStr = `${answer + coefficient} = x + ${coefficient}`;
      break;
    case "-":
      answer = Math.floor(Math.random() * (difficulty * 2)) + 1;
      questionStr = `${answer - coefficient} = x - ${coefficient}`;
      break;
    default:
      answer = Math.floor(Math.random() * (difficulty * 2)) + 1;
      questionStr = `${answer + coefficient} = x + ${coefficient}`;
  }

  return {
    id: Math.random(),
    question: operator === "÷" ? 
      `Solve:\n${answer} = ${coefficient}x` :
      `Solve:\n${questionStr}`,
    answer: `x = ${answer}`,
    difficulty
  };
};

// Helper function to check for recurring decimals
const isRecurringDecimal = (num: number): boolean => {
  const str = num.toString();
  if (!str.includes('.')) return false;
  const decimal = str.split('.')[1];
  if (decimal.length > 8) return true; // Likely recurring if more than 8 decimal places
  return false;
};

const generateTwoStepQuestion = (difficulty: number): Question => {
  const operators = [
    { first: "×", second: "+" },
    { first: "×", second: "-" },
    { first: "÷", second: "+" },
    { first: "÷", second: "-" }
  ];
  const operatorPair = operators[Math.floor(Math.random() * operators.length)];
  
  let answer = Math.floor(Math.random() * difficulty) + 1;
  const coefficient = Math.floor(Math.random() * 4) + 2;
  const constant = Math.floor(Math.random() * (difficulty / 2)) + 1;
  
  let result;
  if (operatorPair.first === "×") {
    result = coefficient * answer + (operatorPair.second === "+" ? constant : -constant);
  } else {
    result = answer / coefficient + (operatorPair.second === "+" ? constant : -constant);
  }
  
  const questionStr = `${result} = ${operatorPair.first === "×" ? formatCoefficient(coefficient) : ""}x ${operatorPair.first === "÷" ? `÷ ${coefficient}` : ""} ${operatorPair.second} ${constant}`;

  return {
    id: Math.random(),
    question: `Solve:\n${questionStr}`,
    answer: `x = ${answer}`,
    difficulty
  };
};

const generateUnknownsBothSidesQuestion = (difficulty: number): Question => {
  let leftCoefficient = Math.floor(Math.random() * 4) + 1;
  let rightCoefficient;
  do {
    rightCoefficient = Math.floor(Math.random() * 4) + 1;
  } while (rightCoefficient === leftCoefficient);
  
  const answer = Math.floor(Math.random() * difficulty) + 1;
  const constant = Math.floor(Math.random() * (difficulty * 2)) + 1;
  
  const leftSide = `${formatCoefficient(leftCoefficient)}x + ${constant}`;
  const rightSide = `${formatCoefficient(rightCoefficient)}x - ${constant + (leftCoefficient - rightCoefficient) * answer}`;
  const questionStr = `${leftSide} = ${rightSide}`;

  return {
    id: Math.random(),
    question: `Solve:\n${questionStr}`,
    answer: `x = ${answer}`,
    difficulty
  };
};

const generateMonicFactorisingQuestion = (difficulty: number): Question => {
  const maxRoot = Math.min(6, Math.floor(difficulty * 1.5));
  const root1 = Math.floor(Math.random() * maxRoot) - Math.floor(maxRoot / 2);
  let root2;
  do {
    root2 = Math.floor(Math.random() * maxRoot) - Math.floor(maxRoot / 2);
  } while (root2 === 0 || root1 === 0); // Avoid zero roots
  
  const sum = -(root1 + root2);
  const product = root1 * root2;
  
  const questionStr = `x² ${sum !== 0 ? (sum > 0 ? '+' : '') + sum + 'x' : ''} ${product >= 0 ? '+' : ''}${product} = 0`;
  
  return {
    id: Math.random(),
    question: `Solve:\n${questionStr}`,
    answer: `x = ${root1}, x = ${root2}`,
    difficulty
  };
};

const generateNonMonicFactorisingQuestion = (difficulty: number): Question => {
  const maxCoeff = Math.min(5, Math.floor(difficulty * 1.2));
  const a = Math.floor(Math.random() * (maxCoeff - 1)) + 2; // coefficient of x²
  let root1, root2;
  do {
    root1 = Math.floor(Math.random() * 5) - 2;
    root2 = Math.floor(Math.random() * 5) - 2;
  } while (root1 === 0 || root2 === 0); // Avoid zero roots
  
  const sum = -(root1 + root2) * a;
  const product = root1 * root2 * a;
  
  const questionStr = `${a}x² ${sum !== 0 ? (sum > 0 ? '+' : '') + sum + 'x' : ''} ${product >= 0 ? '+' : ''}${product} = 0`;
  
  return {
    id: Math.random(),
    question: `Solve:\n${questionStr}`,
    answer: `${a}(x ${root1 >= 0 ? '-' : '+'}${Math.abs(root1)})(x ${root2 >= 0 ? '-' : '+'}${Math.abs(root2)})`,
    difficulty
  };
};

export const generateAlgebraQuestions = (type: string, minDifficulty: number, maxDifficulty: number): Question[] => {
  const generator = type === "algebra_one_step" ? generateOneStepQuestion :
                   type === "algebra_two_step" ? generateTwoStepQuestion :
                   type === "algebra_unknowns_both_sides" ? generateUnknownsBothSidesQuestion :
                   type === "algebra_factorising_monic" ? generateMonicFactorisingQuestion :
                   type === "algebra_factorising_nonmonic" ? generateNonMonicFactorisingQuestion :
                   generateExpandingQuestion;
                   
  return Array(16).fill(null).map((_, index) => {
    const difficulty = minDifficulty + (index * ((maxDifficulty - minDifficulty) / 15));
    const question = generator(Math.round(difficulty));
    // Filter out recurring decimals
    if (isRecurringDecimal(parseFloat(question.answer.split('=')[1]))) {
      return generator(Math.round(difficulty)); // Generate a new question
    }
    return question;
  });
};