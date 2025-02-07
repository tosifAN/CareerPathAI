const HackathonCard = ({ hackathon }) => {
  const {
    name,
    website,
    start,
    end,
    logo,
    banner,
    city,
    state,
    virtual,
    hybrid,
  } = hackathon

  // Convert ISO date strings to a human-readable format.
  const startDate = new Date(start).toLocaleString()
  const endDate = new Date(end).toLocaleString()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden m-4 max-w-sm">
      {banner && (
        <img src={banner} alt={name} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-center mb-2">
          {logo && (
            <img
              src={logo}
              alt={name}
              className="w-12 h-12 mr-4 object-contain"
            />
          )}
          <h2 className="text-xl font-bold">{name}</h2>
        </div>
        <p className="text-gray-600 mb-2">
          {city
            ? `${city}${state ? ', ' + state : ''}`
            : virtual
            ? 'Virtual Event'
            : hybrid
            ? 'Hybrid Event'
            : ''}
        </p>
        <p className="text-gray-600 mb-2">
          {startDate} - {endDate}
        </p>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit Website
        </a>
      </div>
    </div>
  )
}

export default HackathonCard
