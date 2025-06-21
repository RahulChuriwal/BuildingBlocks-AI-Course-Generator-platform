"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-2">
            <Image src="/logo1.svg" alt="Building Blocks Logo" width={40} height={40} />
            <h1 className="text-xl font-bold text-orange-600">Building Blocks</h1>
          </div>
          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
            <Link href="/workspace">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition duration-200">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 text-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Learn Smarter with <span className="text-orange-600">AI-Powered</span> Courses
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Build your personalized learning experience using AI with <strong>Building Blocks</strong>.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/workspace">
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 text-lg font-semibold rounded-xl text-white transition-all">
                Start Free Trial 🚀
              </button>
            </Link>
            <button className="border border-orange-400 text-orange-600 hover:bg-orange-100 px-6 py-3 text-lg font-semibold rounded-xl transition-all">
              Learn More 💡
            </button>
          </div>
          <div className="mt-12">
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
              alt="AI Learning"
              width={1000}
              height={600}
              className="rounded-xl shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features ✨</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Smart Recommendations"
              desc="AI suggests learning paths based on your goals."
              emoji="🤖"
            />
            <FeatureCard
              title="Real-Time Feedback"
              desc="Instant insights and tips as you progress."
              emoji="⚡"
            />
            <FeatureCard
              title="Track Your Progress"
              desc="Visualize your learning journey with analytics."
              emoji="📊"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">What Learners Say ❤️</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Emma Thompson"
              role="Marketing Analyst"
              image="https://randomuser.me/api/portraits/women/45.jpg"
              text="Building Blocks made my upskilling journey smooth and intuitive. The AI content is always spot on!"
            />
            <TestimonialCard
              name="Liam Jensen"
              role="Web Developer"
              image="https://randomuser.me/api/portraits/men/23.jpg"
              text="The instant feedback helped me learn faster than any platform I've tried before. Highly recommend!"
            />
            <TestimonialCard
              name="Isabelle Müller"
              role="Language Teacher"
              image="https://randomuser.me/api/portraits/women/33.jpg"
              text="I created and customized my own course in minutes! My students love the interactivity and layout."
            />
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Building Blocks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, emoji }) {
  return (
    <div className="bg-orange-50 p-6 rounded-xl text-center border hover:shadow-lg transition-all">
      <div className="text-4xl mb-4">{emoji}</div>
      <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-700">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, role, image, text }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={image}
          alt={`${name} photo`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{text}"</p>
    </div>
  );
}

