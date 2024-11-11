"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Calendar, Clock, Video, MessageSquare } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Tushika Rawat",
    expertise: "Robotics & AI",
    image:
      "data:image/jpeg;base64,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",
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "Abhay Anand Jha ",
    expertise: "Software Engineering",
    image:
      "data:image/jpeg;base64,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",
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 3,
    name: "Raghav",
    expertise: "Data Science",
    image:
      "https://img.freepik.com/premium-photo/avatar-anime-boy-with-fire-background-front-profile-face-child-with-flames_967743-602.jpg",
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
