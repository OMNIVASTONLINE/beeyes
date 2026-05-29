export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the color of the MrBeast logo?",
    options: ["Purple and Green", "Red and White", "Blue and Pink", "Yellow and Black"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "What was the name of MrBeast's massive tree-planting project?",
    options: ["Save the Forest", "Team Trees", "Green World", "Plant-A-Thon"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "In many of his challenge videos, what is the most common prize MrBeast gives away?",
    options: ["Free Pizza", "$10,000 to $1,000,000 in Cash", "Video Game Consoles", "Used Clothes"],
    correctAnswer: 1,
  },
];
