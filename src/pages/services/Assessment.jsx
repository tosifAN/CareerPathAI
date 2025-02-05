import React, { useState } from 'react';
import { InterviewSetup } from '../../components/assessment/InterviewSetup';
import { Interview } from '../../components/assessment/Interview';
import { Report } from '../../components/assessment/Report';
import { generateQuestion, evaluateAnswer } from '../../lib/ai';

function Assessment() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStartInterview = async () => {
    setLoading(true);
    setError(null);
    try {
      const generatedQuestions = await Promise.all(
        Array(numQuestions).fill(null).map(() =>
          generateQuestion(
            selectedRole,
            selectedTopic,
            selectedLevel,
            selectedDifficulty,
            selectedModel
          ).then(question => ({ question }))
        )
      );
      
      setQuestions(generatedQuestions);
      setInterviewStarted(true);
      setCurrentQuestion(0);
      setInterviewComplete(false);
    } catch (err) {
      setError('Failed to generate questions. Please check your API keys and try again.');
      console.error('Error starting interview:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (answer) => {
    setLoading(true);
    setError(null);
    try {
      const { feedback, score } = await evaluateAnswer(
        questions[currentQuestion].question,
        answer,
        selectedModel
      );

      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestion] = {
        ...updatedQuestions[currentQuestion],
        userAnswer: answer,
        feedback,
        score,
      };
      setQuestions(updatedQuestions);
    } catch (err) {
      setError('Failed to evaluate answer. Please try again.');
      console.error('Error evaluating answer:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleComplete = () => {
    setInterviewComplete(true);
  };

  const handleRestart = () => {
    setSelectedRole('');
    setSelectedTopic('');
    setSelectedLevel('');
    setSelectedDifficulty('');
    setSelectedModel('');
    setNumQuestions(5);
    setQuestions([]);
    setCurrentQuestion(0);
    setInterviewStarted(false);
    setInterviewComplete(false);
    setError(null);
  };

  if (interviewComplete) {
    return (
      <Report 
        questions={questions} 
        onRestart={handleRestart} 
        onHome={handleRestart}
      />
    );
  }

  if (interviewStarted) {
    return (
      <>
        {error && (
          <div className="max-w-4xl mx-auto mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <Interview
          questions={questions}
          currentQuestion={currentQuestion}
          onSubmitAnswer={handleSubmitAnswer}
          onNextQuestion={handleNextQuestion}
          onComplete={handleComplete}
          loading={loading}
          onHome={handleRestart}
        />
      </>
    );
  }

  return (
    <>
      {error && (
        <div className="max-w-4xl mx-auto mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <InterviewSetup
        selectedRole={selectedRole}
        selectedTopic={selectedTopic}
        selectedLevel={selectedLevel}
        selectedDifficulty={selectedDifficulty}
        selectedModel={selectedModel}
        numQuestions={numQuestions}
        onRoleChange={setSelectedRole}
        onTopicChange={setSelectedTopic}
        onLevelChange={setSelectedLevel}
        onDifficultyChange={setSelectedDifficulty}
        onModelChange={setSelectedModel}
        onNumQuestionsChange={setNumQuestions}
        onStartInterview={handleStartInterview}
        loading={loading}
      />
    </>
  );
}

export default Assessment;