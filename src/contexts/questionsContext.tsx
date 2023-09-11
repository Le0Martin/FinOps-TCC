import { Option, Question } from "@/values/questions";
import { ReactNode, createContext, useContext, useState } from "react";

type QuestionAnswered = Question & { answer: Option };

interface QuestionContextData {
  questions: QuestionAnswered[];
  setQuestions: (questions: QuestionAnswered[]) => void;
  addQuestionAnswer: (question: Question, option: Option) => void;
}

interface QuestionProviderProps {
  children: ReactNode;
}

const QuestionContext = createContext({} as QuestionContextData);

export const QuestionProvider = ({ children }: QuestionProviderProps) => {
  const [questions, setQuestions] = useState<QuestionAnswered[]>([]);

  const addQuestionAnswer = (question: Question, option: Option) => {
    const newQuestionAnswer = {
      ...question,
      answer: option,
    };

    const newQuestions = questions.filter(
      (questionAnswered) => questionAnswered.id !== question.id
    );

    setQuestions([...newQuestions, newQuestionAnswer]);
  };

  return (
    <QuestionContext.Provider
      value={{ questions, addQuestionAnswer, setQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => {
  return useContext(QuestionContext);
};
