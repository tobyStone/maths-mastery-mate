import { MathTopic, Question } from "@/types/math";

const generateFractionQuestion = (difficulty: number): Question => {
  const maxNum = Math.min(12, Math.floor(difficulty * 2));
  let num1, num2, den1, den2;

  if (difficulty <= 3) {
    // Same denominator with proper fractions
    den1 = den2 = Math.floor(Math.random() * 5) + 4; // Increased min denominator
    num1 = Math.floor(Math.random() * (den1 - 1)) + 1; // Ensures num < den
    num2 = Math.floor(Math.random() * (den1 - num1)) + 1; // Ensures sum < den when possible
    const resultNum = num1 + num2;
    // Convert to mixed number if improper fraction
    const whole = Math.floor(resultNum / den1);
    const remainder = resultNum % den1;
    return {
      id: Math.random(),
      question: `${num1}/${den1} + ${num2}/${den2}`,
      answer: whole > 0 ? (remainder === 0 ? `${whole}` : `${whole} ${remainder}/${den1}`) : `${resultNum}/${den1}`,
      difficulty
    };
  } else if (difficulty <= 6) {
    // Different denominators with proper fractions
    den1 = Math.floor(Math.random() * 5) + 4; // Increased min denominator
    den2 = Math.floor(Math.random() * 5) + 4;
    while (den2 === den1) den2 = Math.floor(Math.random() * 5) + 4;
    num1 = Math.floor(Math.random() * (den1 - 1)) + 1; // Ensures num < den
    num2 = Math.floor(Math.random() * (den2 - 1)) + 1; // Ensures num < den
    const lcm = (den1 * den2) / gcd(den1, den2);
    const newNum1 = num1 * (lcm / den1);
    const newNum2 = num2 * (lcm / den2);
    const resultNum = newNum1 + newNum2;
    // Simplify the fraction
    const gcdResult = gcd(resultNum, lcm);
    const simplifiedNum = resultNum/gcdResult;
    const simplifiedDen = lcm/gcdResult;
    // Convert to mixed number if improper fraction
    const whole = Math.floor(simplifiedNum / simplifiedDen);
    const remainder = simplifiedNum % simplifiedDen;
    return {
      id: Math.random(),
      question: `${num1}/${den1} + ${num2}/${den2}`,
      answer: whole > 0 ? (remainder === 0 ? `${whole}` : `${whole} ${remainder}/${simplifiedDen}`) : `${simplifiedNum}/${simplifiedDen}`,
      difficulty
    };
  } else {
    // Mixed numbers with proper fractions
    const whole1 = Math.floor(Math.random() * 3) + 1; // Reduced max whole number
    const whole2 = Math.floor(Math.random() * 3) + 1;
    den1 = Math.floor(Math.random() * 5) + 4; // Increased min denominator
    num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
    den2 = Math.floor(Math.random() * 5) + 4;
    num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
    
    // Convert to improper fractions
    const improperNum1 = whole1 * den1 + num1;
    const improperNum2 = whole2 * den2 + num2;
    
    // Find common denominator
    const lcm = (den1 * den2) / gcd(den1, den2);
    const newNum1 = improperNum1 * (lcm / den1);
    const newNum2 = improperNum2 * (lcm / den2);
    const resultNum = newNum1 + newNum2;
    
    // Convert back to mixed number
    const wholeResult = Math.floor(resultNum / lcm);
    const remainderNum = resultNum % lcm;
    
    // Simplify the remainder fraction if needed
    const gcdRemainder = gcd(remainderNum, lcm);
    const simplifiedNum = remainderNum / gcdRemainder;
    const simplifiedDen = lcm / gcdRemainder;
    
    return {
      id: Math.random(),
      question: `${whole1} ${num1}/${den1} + ${whole2} ${num2}/${den2}`,
      answer: remainderNum === 0 ? `${wholeResult}` : `${wholeResult} ${simplifiedNum}/${simplifiedDen}`,
      difficulty
    };
  }
};

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const generateQuestions = (topic: MathTopic, difficulty: number): Question[] => {
  const questions: Question[] = [];
  const baseComplexity = Math.max(1, Math.min(10, difficulty));
  
  for (let i = 0; i < 20; i++) {
    // Gradually increase complexity
    const questionDifficulty = Math.min(10, baseComplexity + (i * 0.2));
    
    switch (topic) {
      case "fractions":
        questions.push(generateFractionQuestion(questionDifficulty));
        break;
      // Add more topic generators here
      default:
        questions.push(generateFractionQuestion(questionDifficulty));
    }
  }
  
  return questions;
};