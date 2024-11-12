"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFilePdf, FaVideo, FaQuestionCircle } from "react-icons/fa";
import styles from "@/components/CourseDetails/CourseDetails.module.css";

type Topic = {
  name: string;
  pdfLink: string;
};

type Semester = {
  name: string;
  topics: Topic[];
};

type Course = {
  name: string;
  semesters: Semester[];
};

const courseContent: Record<string, Course> = {
  "applied-chemistry": {
    name: "Applied Chemistry",
    semesters: [
      {
        name: "1st Semester",
        topics: [
          {
            name: "Atomic Structure",
            pdfLink: "/pdfs/chemistry-atomic-structure.pdf",
          },
          {
            name: "Chemical Bonding",
            pdfLink: "/pdfs/chemistry-chemical-bonding.pdf",
          },
          {
            name: "Electrochemistry",
            pdfLink: "/pdfs/chemistry-electrochemistry.pdf",
          },
        ],
      },
      {
        name: "2nd Semester",
        topics: [
          { name: "Organic Chemistry", pdfLink: "/pdfs/chemistry-organic.pdf" },
          { name: "Polymer Chemistry", pdfLink: "/pdfs/chemistry-polymer.pdf" },
          {
            name: "Environmental Chemistry",
            pdfLink: "/pdfs/chemistry-environmental.pdf",
          },
        ],
      },
    ],
  },
  "programming-in-c": {
    name: "Programming in C",
    semesters: [
      {
        name: "1st Semester",
        topics: [
          { name: "Introduction to C", pdfLink: "/pdfs/c-introduction.pdf" },
          {
            name: "Data Types and Operators",
            pdfLink: "/pdfs/c-data-types.pdf",
          },
          {
            name: "Control Structures",
            pdfLink: "/pdfs/c-control-structures.pdf",
          },
        ],
      },
      {
        name: "2nd Semester",
        topics: [
          { name: "Functions", pdfLink: "/pdfs/c-functions.pdf" },
          {
            name: "Arrays and Pointers",
            pdfLink: "/pdfs/c-arrays-pointers.pdf",
          },
          {
            name: "Structures and Unions",
            pdfLink: "/pdfs/c-structures-unions.pdf",
          },
        ],
      },
    ],
  },
  // Additional courses go here
};

interface CourseDetailsProps {
  params: {
    name: string;
  };
}

const CourseDetails = ({ params }: CourseDetailsProps) => {
  const { name } = params;
  const [activeSemester, setActiveSemester] = useState(0);

  const course = courseContent[name];
  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className={styles.courseDetails}>
      <h2>{course.name}</h2>
      <div className={styles.semesterTabs}>
        {course.semesters.map((semester, index) => (
          <button
            key={index}
            className={`${styles.semesterTab} ${
              index === activeSemester ? styles.active : ""
            }`}
            onClick={() => setActiveSemester(index)}
          >
            {semester.name}
          </button>
        ))}
      </div>
      <div className={styles.topicList}>
        {course.semesters[activeSemester].topics.map((topic, index) => (
          <motion.div
            key={index}
            className={styles.topicItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3>{topic.name}</h3>
            <div className={styles.resourceLinks}>
              <a
                href={topic.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resourceLink}
              >
                <FaFilePdf /> PDF Notes
              </a>
              <a
                href={`/course/${name}/video-lecture`}
                className={styles.resourceLink}
              >
                <FaVideo /> Video Lecture
              </a>
              <a href="#" className={styles.resourceLink}>
                <FaQuestionCircle /> Practice Quiz
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      <Link href="/courses" className={styles.backButton}>
        Back to Courses
      </Link>
    </div>
  );
};

export default CourseDetails;
