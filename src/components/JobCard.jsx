import React from "react";
import { MapPin, DollarSign, ArrowUpRight } from "react-feather";

function JobCard({ job }) {
  const randomLocation = () => {
    const locations = ["Remote", "Banglore", "Hydrebad", "Pune", "Mumbai", "Chennai", "Gurugram"];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return `${formatter.format(salary)} - ${formatter.format(salary * 1.5)}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full flex flex-col h-full">
      {/* Job details container */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <img
            src={job.company_logo || "/placeholder.svg"}
            alt={`${job.company} logo`}
            className="w-16 h-16 rounded-full"
          />
          <span className="text-sm text-gray-500">ID: {job.id}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{job.position}</h3>
        <h2 className="text-lg text-gray-600 mb-4">{job.company}</h2>
        <p className="text-sm text-gray-500 mb-4">
          Posted on: {new Date(job.date).toLocaleDateString()}
        </p>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          {randomLocation()}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <DollarSign className="w-4 h-4 mr-2" />
          {formatSalary(job.salary_max)}
        </div>
      </div>

      {/* Button container stays at the bottom */}
      <div className="px-6 pb-6">
        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-500 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Apply Now <ArrowUpRight className="inline ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default JobCard;
