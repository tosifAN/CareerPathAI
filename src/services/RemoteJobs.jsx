import React from "react"
import JobListings from "../components/JobListings"

function JobListingPage() {
  return (
    
    <main className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Remote Job Listings</h1>
      <JobListings />
    </main>
  )
}

export default JobListingPage
