import { useState, useEffect } from 'react'
import axios from 'axios'
import ContestList from './components/ContestList'
import HackathonList from './components/HackathonList'

function App() {
  const [contests, setContests] = useState({})
  const [hackathons, setHackathons] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingHackathons, setLoadingHackathons] = useState(true)
  const [error, setError] = useState(null)
  const [hackathonsError, setHackathonsError] = useState(null)

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/contests')
        setContests(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch contests. Please try again later.')
        setLoading(false)
      }
    }
    fetchContests()
  }, [])

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/hackathons')
        setHackathons(response.data.hackathons)
        setLoadingHackathons(false)
      } catch (err) {
        setHackathonsError('Failed to fetch hackathons. Please try again later.')
        setLoadingHackathons(false)
      }
    }
    fetchHackathons()
  }, [])

  if (loading || loadingHackathons) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error || hackathonsError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error || hackathonsError}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Upcoming Coding Contests & Hackathons
          </h1>
        </div>
      </header>
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section>
            <h2 className="text-3xl font-bold text-gray-900">Coding Contests</h2>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <ContestList contests={contests} />
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mt-8">
              Upcoming Hackathons
            </h2>
            <HackathonList hackathons={hackathons} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
