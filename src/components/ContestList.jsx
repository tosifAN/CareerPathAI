import { useMemo } from 'react'
import ContestCard from './ContestCard'

const ContestList = ({ contests }) => {
  const sortedContests = useMemo(() => {
    return [
      ...contests.codechef.map(contest => ({ ...contest, platform: 'codechef' })),
      ...contests.codeforces.map(contest => ({ ...contest, platform: 'codeforces' }))
    ].sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
  }, [contests])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedContests.map((contest) => (
        <ContestCard key={`${contest.platform}-${contest.id}`} contest={contest} />
      ))}
    </div>
  )
}

export default ContestList
