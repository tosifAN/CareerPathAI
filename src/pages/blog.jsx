import React from "react";

const Blog = () => {
  const blogPosts = [
    {
      title: "How AI is Transforming Career Guidance",
      date: "January 25, 2025",
      excerpt: "Discover how artificial intelligence is making career counseling more personalized and efficient than ever before.",
      link: "#"
    },
    {
      title: "Top Skills to Learn for a Data Science Career in 2025",
      date: "January 18, 2025",
      excerpt: "Stay ahead in the competitive job market by mastering these essential data science skills.",
      link: "#"
    },
    {
      title: "Resume Optimization: How to Get Past ATS Filters",
      date: "January 10, 2025",
      excerpt: "Learn the best practices for structuring your resume to improve its chances of getting shortlisted.",
      link: "#"
    }
  ];

  return (
    <div className="mt-10 container mx-auto p-6 text-gray-700">
      <h1 className="mt-10 text-3xl font-bold text-center mb-6">Blog</h1>
      
      <img 
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Blog Cover" 
        className="w-full h-64 object-cover mb-6"
      />
      
      <p className="text-lg text-center mb-6">
        Stay updated with the latest trends, tips, and insights in career guidance and job searching.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <p className="mb-4">{post.excerpt}</p>
            <a href={post.link} className="text-blue-500 hover:underline">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
