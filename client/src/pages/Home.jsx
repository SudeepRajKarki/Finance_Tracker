import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: (
      <svg
        className="w-12 h-12 text-indigo-600 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 8c-3 0-5 2-5 5a5 5 0 1 0 10 0c0-3-2-5-5-5z" />
        <path d="M12 15v5" />
      </svg>
    ),
    title: "Comprehensive Income Tracking",
    description:
      "Add, categorize, and monitor all your income streams in real time.",
  },
  {
    icon: (
      <svg
        className="w-12 h-12 text-indigo-600 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 12H4" />
        <path d="M12 20v-8" />
        <path d="M12 4v2" />
        <path d="M6 18v-4" />
        <path d="M18 18v-4" />
      </svg>
    ),
    title: "Detailed Expense Management",
    description:
      "Record and categorize your expenses easily.",
  },
  {
    icon: (
      <svg
        className="w-12 h-12 text-indigo-600 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Interactive Dashboard",
    description:
      "Visualize your finances with clear graphs and tables.",
  },
  {
    icon: (
      <svg
        className="w-12 h-12 text-indigo-600 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M2 11h20" />
      </svg>
    ),
    title: "Security & Privacy",
    description:
      "Your data is safe with robust authentication and encryption.",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-indigo-50 py-24 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-6">
          Take Control of Your Finances with FinTrack
        </h1>
        <p className="text-indigo-700 max-w-3xl mx-auto mb-10">
          Monitor income, manage expenses, and visualize your financial health all in one sleek dashboard.
        </p>
        <div className="space-x-4">
          <Link to="/register"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      <section
        id="features"
        className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto"
      >
        {features.map(({ icon, title, description }, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            {icon}
            <h3 className="text-xl font-semibold text-indigo-900 mb-3">{title}</h3>
            <p className="text-indigo-700">{description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
