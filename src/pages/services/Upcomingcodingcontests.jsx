import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Code2, Trophy, Loader2, AlertCircle } from 'lucide-react';
import ContestList from '../../components/ContestList';
import HackathonList from '../../components/HackathonList';

function Upcomingcodingcontests() {
  const [contests, setContests] = useState({});
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingHackathons, setLoadingHackathons] = useState(true);
  const [error, setError] = useState(null);
  const [hackathonsError, setHackathonsError] = useState(null);
  const [activeTab, setActiveTab] = useState('contests');

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/contests');
        setContests(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch contests. Please try again later.');
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/hackathons');
        setHackathons(response.data.hackathons);
        setLoadingHackathons(false);
      } catch (err) {
        setHackathonsError('Failed to fetch hackathons. Please try again later.');
        setLoadingHackathons(false);
      }
    };
    fetchHackathons();
  }, []);

  if (loading || loadingHackathons) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading amazing opportunities...</p>
      </div>
    );
  }

  if (error || hackathonsError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-lg text-red-500">{error || hackathonsError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-10 h-10 text-blue-500" />
              <span>Tech Competitions Hub</span>
            </h1>
            <p className="mt-2 text-gray-600">Discover upcoming coding contests and hackathons</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('contests')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === 'contests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Code2 className="w-5 h-5" />
                  <span>Coding Contests</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('hackathons')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === 'hackathons'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span>Hackathons</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'contests' ? (
              <div className="animate-fadeIn">
                <ContestList contests={contests} />
              </div>
            ) : (
              <div className="animate-fadeIn">
                <HackathonList hackathons={hackathons} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Upcomingcodingcontests;