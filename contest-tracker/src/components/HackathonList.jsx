import { useMemo } from 'react'
import HackathonCard from './HackathonCard'

const HackathonList = ({ hackathons }) => {
  const sortedHackathons = useMemo(() => {
    return hackathons.sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
  }, [hackathons])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedHackathons.map((hackathon) => (
        <HackathonCard key={hackathon.id} hackathon={hackathon} />
      ))}
    </div>
  )
}

export default HackathonList
