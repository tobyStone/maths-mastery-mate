import { MathTopic, Question } from "@/types/math";

const generateFractionQuestion = (difficulty: number): Question => {
  const maxNum = Math.min(12, Math.floor(difficulty * 2));
  let num1, num2, den1, den2;

  if (difficulty <= 3) {
    // Same denominator
    den1 = den2 = Math.floor(Math.random() * 5) + 2;
    num1 = Math.floor(Math.random() * maxNum) + 1;
    num2 = Math.floor(Math.random() * maxNum) + 1;
    return {
      id: Math.random(),
      question: `${num1}/${den1} + ${num2}/${den2}`,
      answer: `${(num1 + num2)}/${den1}`,
      difficulty
    };
  } else if (difficulty <= 6) {
    // Different denominators
    den1 = Math.floor(Math.random() * 5) + 2;
    den2 = Math.floor(Math.random() * 5) + 2;
    while (den2 === den1) den2 = Math.floor(Math.random() * 5) + 2;
    num1 = Math.floor(Math.random() * maxNum) + 1;
    num2 = Math.floor(Math.random() * maxNum) + 1;
    const lcm = (den1 * den2) / gcd(den1, den2);
    const result = (num1 * (lcm / den1) + num2 * (lcm / den2)) / lcm;
    return {
      id: Math.random(),
      question: `${num1}/${den1} + ${num2}/${den2}`,
      answer: result.toFixed(2),
      difficulty
    };
  } else {
    // Mixed numbers
    const whole1 = Math.floor(Math.random() * 5) + 1;
    const whole2 = Math.floor(Math.random() * 5) + 1;
    den1 = Math.floor(Math.random() * 5) + 2;
    num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
    den2 = Math.floor(Math.random() * 5) + 2;
    num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
    const result = (whole1 + num1/den1 + whole2 + num2/den2);
    return {
      id: Math.random(),
      question: `${whole1} ${num1}/${den1} + ${whole2} ${num2}/${den2}`,
      answer: result.toFixed(2),
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