"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Calendar, Clock, Video, MessageSquare } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    expertise: "Robotics & AI",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "Prof. Michael Johnson",
    expertise: "Software Engineering",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    expertise: "Data Science",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4.7,
    reviews: 112,
  },
  // Add more mentors as needed
];

export default function Mentorship() {
  const [selectedMentor, setSelectedMentor] = useState(null);

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Find Your Perfect Mentor
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto"
        >
          Connect with industry experts and accelerate your engineering journey
          through personalized guidance and support.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {mentor.name}
                </h2>
                <p className="text-gray-600 mb-4">{mentor.expertise}</p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-semibold">{mentor.rating}</span>
                  <span className="text-gray-500 ml-2">
                    ({mentor.reviews} reviews)
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
                >
                  Book a Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Book a Session with {selectedMentor.name}
              </h2>
              <p className="text-gray-600 mb-6">{selectedMentor.expertise}</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 text-yellow-500" />
                  <span>Select a date</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 text-yellow-500" />
                  <span>Choose a time</span>
                </div>
                <div className="flex items-center">
                  <Video className="mr-2 text-yellow-500" />
                  <span>Video call</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-2 text-yellow-500" />
                  <span>Chat support</span>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md mr-4 hover:bg-gray-300 transition duration-300"
                >
                  Cancel
                </button>
                <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300">
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
