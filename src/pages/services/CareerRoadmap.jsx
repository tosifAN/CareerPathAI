import React, { useState } from 'react';
import { OpenAI } from 'openai';
import RoadmapDisplay from '../../components/RoadmapDisplay';
import { MapPin, Loader2, Search, Sparkles, BookOpen, Target } from 'lucide-react';

function CareerRoadmap() {
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState('');

  const generateRoadmap = async () => {
    if (!jobTitle) {
      setError('Please enter a job title');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Replace with your API key
        dangerouslyAllowBrowser: true
      });

      const prompt = `Create a detailed career roadmap for becoming a ${jobTitle}. Include key steps, skills needed, and estimated timeframes. Format the response as a JSON object with the following structure:
      {
        "steps": [
          {
            "title": "Step title",
            "description": "Detailed description",
            "timeframe": "Estimated time",
            "resources": ["Resource 1", "Resource 2"]
          }
        ],
        "jobTitle": "${jobTitle}"
      }`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content;
      if (response) {
        const parsedRoadmap = JSON.parse(response);
        setRoadmap(parsedRoadmap);
      }
    } catch (err) {
      setError('Invalid Profile! Failed to generate roadmap. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-25 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <MapPin className="w-7 h-7 text-indigo-600" />
            <h1 className="mt-24 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">
              Career Roadmap Generator
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {!roadmap && (
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Your Career Path
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Enter your dream job title and let AI create a personalized roadmap for your success
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Set Your Goal</h3>
                <p className="text-gray-600">Define your career destination and dream role</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered Plan</h3>
                <p className="text-gray-600">Get a customized roadmap with detailed steps</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn & Grow</h3>
                <p className="text-gray-600">Access curated resources for each step</p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  What's your dream job?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Full Stack Developer"
                    className="block w-full rounded-lg border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-3 transition-all hover:border-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && generateRoadmap()}
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg flex items-center">
                  <span className="mr-2">⚠️</span> {error}
                </p>
              )}
              <button
                onClick={generateRoadmap}
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all transform hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Creating Your Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Roadmap
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {roadmap && <RoadmapDisplay steps={roadmap.steps} jobTitle={roadmap.jobTitle} />}
      </main>

      <footer className="mt-12 bg-white/80 backdrop-blur border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center text-gray-600">
          <p>Powered by OpenAI • Built with ❤️ for career seekers</p>
        </div>
      </footer>
    </div>
  );
}

export default CareerRoadmap;