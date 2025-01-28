import React from 'react';

const SmartDashboard: React.FC = () => {
  return (
    <section className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
          Smart Dashboard
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Tracks your application progress, manage interviews, and optimize your job search strategy all in one place.
        </p>

        {/* Dashboard Mockup */}
        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Application Progress Card */}
          <div className="w-full max-w-sm bg-gradient-to-br from-[#C4B800] to-[#355E3B] text-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold">Application Progress</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Submitted</span>
                <span>8</span>
              </div>
              <div className="flex justify-between">
                <span>In Review</span>
                <span>4</span>
              </div>
              <div className="flex justify-between">
                <span>Shortlisted</span>
                <span>2</span>
              </div>
              <div className="flex justify-between">
                <span>Rejected</span>
                <span>1</span>
              </div>
            </div>
          </div>

          {/* Interview Schedule Card */}
          <div className="w-full max-w-sm bg-gray-100 text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold">Upcoming Interviews</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md">
                <div>
                  <h4 className="font-medium">Front-End Developer</h4>
                  <p className="text-sm text-gray-500">Jan 26, 2025, 10:00 AM</p>
                </div>
                <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
                  Details
                </button>
              </li>
              <li className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md">
                <div>
                  <h4 className="font-medium">UX Designer</h4>
                  <p className="text-sm text-gray-500">Jan 28, 2025, 2:00 PM</p>
                </div>
                <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
                  Details
                </button>
              </li>
            </ul>
          </div>

          {/* Optimization Tips Card */}
          <div className="w-full max-w-sm bg-gradient-to-br from-[#918D0D] to-[#C4B800] text-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold">Optimization Tips</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-white text-[#918D0D] font-bold rounded-full flex items-center justify-center">1</span>
                <p>Tailor your resume to match job descriptions.</p>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-white text-[#918D0D] font-bold rounded-full flex items-center justify-center">2</span>
                <p>Highlight measurable achievements in your work history.</p>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-white text-[#918D0D] font-bold rounded-full flex items-center justify-center">3</span>
                <p>Focus on jobs that match your skills and experience.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartDashboard;
