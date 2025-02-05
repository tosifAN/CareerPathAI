import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Initialize AI clients
const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Custom error class for AI-related errors
class AIServiceError extends Error {
  constructor(message, details) {
    super(message);
    this.name = 'AIServiceError';
    this.details = details;
  }
}

// Helper function to clean markdown formatting
function cleanMarkdown(text) {
  try {
    if (!text) {
      throw new Error('Input text is empty or undefined');
    }
    return text
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/\n+/g, ' ')
      .trim();
  } catch (error) {
    throw new AIServiceError('Failed to clean markdown formatting', {
      error,
      text,
      operation: 'cleanMarkdown'
    });
  }
}

// Validate input parameters
function validateInputs(role, topic, level, difficulty, model) {
  const errors = [];
  if (!role) errors.push('Role is required');
  if (!topic) errors.push('Topic is required');
  if (!level) errors.push('Level is required');
  if (!difficulty) errors.push('Difficulty is required');
  if (!model) errors.push('AI model is require d');
  
  if (errors.length > 0) {
    throw new AIServiceError('Invalid input parameters', { errors });
  }
}

// Check API keys
function validateAPIKeys(model) {
  try {
    if (model === 'Gemini' && !import.meta.env.VITE_GOOGLE_API_KEY) {
      throw new AIServiceError('Google API key is missing', {
        model,
        operation: 'validateAPIKeys'
      });
    }
    if (model === 'OpenAI' && !import.meta.env.VITE_OPENAI_API_KEY) {
      throw new AIServiceError('OpenAI API key is missing', {
        model,
        operation: 'validateAPIKeys'
      });
    }
  } catch (error) {
    throw new AIServiceError('Failed to validate API keys', {
      error,
      model,
      operation: 'validateAPIKeys'
    });
  }
}

export async function generateQuestion(
  role,
  topic,
  level,
  difficulty,
  model
) {
  try {
    // Validate inputs and API keys
    validateInputs(role, topic, level, difficulty, model);
    validateAPIKeys(model);

    const prompt = `Generate a ${difficulty} difficulty level interview question for a ${role} position about ${topic}. The question should be appropriate for someone with a ${level} level of understanding. The question should be specific and focused on practical knowledge. Do not use any markdown formatting in your response.`;

    if (model === 'Gemini') {
      try {
        const genModel = gemini.getGenerativeModel({ model: 'gemini-pro' });
        const result = await genModel.generateContent(prompt);
        if (!result || !result.response) {
          throw new AIServiceError('Empty response from Gemini', {
            operation: 'generateQuestion',
            model: 'Gemini'
          });
        }
        return cleanMarkdown(result.response.text());
      } catch (error) {
        throw new AIServiceError('Failed to generate question with Gemini', {
          error,
          prompt,
          operation: 'generateQuestion'
        });
      }
    } else {
      try {
        const completion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
        });
        
        if (!completion.choices[0]?.message?.content) {
          throw new AIServiceError('Empty response from OpenAI', {
            operation: 'generateQuestion',
            model: 'OpenAI'
          });
        }
        
        return cleanMarkdown(completion.choices[0].message.content);
      } catch (error) {
        throw new AIServiceError('Failed to generate question with OpenAI', {
          error,
          prompt,
          operation: 'generateQuestion'
        });
      }
    }
  } catch (error) {
    console.error('Error in generateQuestion:', error);
    if (error instanceof AIServiceError) {
      throw error;
    }
    throw new AIServiceError('Unexpected error in generateQuestion', {
      error,
      operation: 'generateQuestion'
    });
  }
}

export async function evaluateAnswer(
  question,
  answer,
  model
) {
  try {
    // Validate inputs
    if (!question) throw new AIServiceError('Question is required', { operation: 'evaluateAnswer' });
    if (!answer) throw new AIServiceError('Answer is required', { operation: 'evaluateAnswer' });
    if (!model) throw new AIServiceError('Model is required', { operation: 'evaluateAnswer' });
    
    validateAPIKeys(model);

    const prompt = `Evaluate this interview answer and provide constructive feedback. Also give a score out of 100.

Question: ${question}
Answer: ${answer}

Provide your response in the following format:
Score: [number]
Feedback: [your detailed feedback]`;

    if (model === 'Gemini') {
      try {
        const genModel = gemini.getGenerativeModel({ model: 'gemini-pro' });
        const result = await genModel.generateContent(prompt);
        if (!result || !result.response) {
          throw new AIServiceError('Empty response from Gemini', {
            operation: 'evaluateAnswer',
            model: 'Gemini'
          });
        }
        
        const response = result.response.text();
        const scoreMatch = response.match(/Score:\s*(\d+)/);
        const feedbackMatch = response.match(/Feedback:\s*([\s\S]+)/);
        
        if (!scoreMatch || !feedbackMatch) {
          throw new AIServiceError('Invalid response format from Gemini', {
            response,
            operation: 'evaluateAnswer'
          });
        }
        
        return {
          score: parseInt(scoreMatch[1]),
          feedback: cleanMarkdown(feedbackMatch[1].trim())
        };
      } catch (error) {
        throw new AIServiceError('Failed to evaluate answer with Gemini', {
          error,
          operation: 'evaluateAnswer'
        });
      }
    } else {
      try {
        const completion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
        });
        
        if (!completion.choices[0]?.message?.content) {
          throw new AIServiceError('Empty response from OpenAI', {
            operation: 'evaluateAnswer',
            model: 'OpenAI'
          });
        }
        
        const response = completion.choices[0].message.content;
        const scoreMatch = response.match(/Score:\s*(\d+)/);
        const feedbackMatch = response.match(/Feedback:\s*([\s\S]+)/);
        
        if (!scoreMatch || !feedbackMatch) {
          throw new AIServiceError('Invalid response format from OpenAI', {
            response,
            operation: 'evaluateAnswer'
          });
        }
        
        return {
          score: parseInt(scoreMatch[1]),
          feedback: cleanMarkdown(feedbackMatch[1].trim())
        };
      } catch (error) {
        throw new AIServiceError('Failed to evaluate answer with OpenAI', {
          error,
          operation: 'evaluateAnswer'
        });
      }
    }
  } catch (error) {
    console.error('Error in evaluateAnswer:', error);
    if (error instanceof AIServiceError) {
      throw error;
    }
    throw new AIServiceError('Unexpected error in evaluateAnswer', {
      error,
      operation: 'evaluateAnswer'
    });
  }
}