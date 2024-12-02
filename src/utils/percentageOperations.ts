import { Question } from "@/types/math";

const generatePercentageIncreaseDecreaseQuestion = (difficulty: number): Question => {
  const isIncrease = Math.random() > 0.5;
  const baseNumber = Math.floor(Math.random() * (100 * difficulty)) + 1;
  const percentage = Math.floor(Math.random() * (20 * difficulty)) + 1;
  
  const answer = isIncrease ? 
    baseNumber * (1 + percentage/100) :
    baseNumber * (1 - percentage/100);
    
  return {
    id: Math.random(),
    question: `${isIncrease ? "Increase" : "Decrease"} ${baseNumber} by ${percentage}%`,
    answer: `${Math.round(answer * 100) / 100}`,
    difficulty
  };
};

const generatePercentageOfAmountQuestion = (difficulty: number): Question => {
  const percentage = Math.floor(Math.random() * (20 * difficulty)) + 1;
  const amount = Math.floor(Math.random() * (100 * difficulty)) + 1;
  const answer = (percentage/100) * amount;
  
  return {
    id: Math.random(),
    question: `What is ${percentage}% of ${amount}?`,
    answer: `${Math.round(answer * 100) / 100}`,
    difficulty
  };
};

const generateReversePercentageQuestion = (difficulty: number): Question => {
  const percentage = Math.floor(Math.random() * (20 * difficulty)) + 1;
  const finalAmount = Math.floor(Math.random() * (100 * difficulty)) + 1;
  const originalAmount = finalAmount / (1 + percentage/100);
  
  return {
    id: Math.random(),
    question: `${finalAmount} is ${percentage}% more than what number?`,
    answer: `${Math.round(originalAmount * 100) / 100}`,
    difficulty
  };
};

export const generatePercentageQuestions = (type: string, difficulty: number): Question[] => {
  const generator = 
    type === "percentages_increase_decrease" ? generatePercentageIncreaseDecreaseQuestion :
    type === "percentages_of_amount" ? generatePercentageOfAmountQuestion :
    generateReversePercentageQuestion;
    
  return Array(20).fill(null).map(() => generator(difficulty));
};