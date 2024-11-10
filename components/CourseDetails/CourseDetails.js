import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFilePdf, FaVideo, FaQuestionCircle } from "react-icons/fa";
import styles from "./CourseDetails.module.css";

const courseContent = {
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
  "communication-skills": {
    name: "Communication Skills",
    semesters: [
      {
        name: "1st Semester",
        topics: [
          { name: "Verbal Communication", pdfLink: "/pdfs/comm-verbal.pdf" },
          {
            name: "Non-verbal Communication",
            pdfLink: "/pdfs/comm-non-verbal.pdf",
          },
          { name: "Listening Skills", pdfLink: "/pdfs/comm-listening.pdf" },
        ],
      },
      {
        name: "2nd Semester",
        topics: [
          {
            name: "Technical Writing",
            pdfLink: "/pdfs/comm-technical-writing.pdf",
          },
          {
            name: "Presentation Skills",
            pdfLink: "/pdfs/comm-presentation.pdf",
          },
          {
            name: "Group Discussions",
            pdfLink: "/pdfs/comm-group-discussions.pdf",
          },
        ],
      },
    ],
  },
  "applied-physics": {
    name: "Applied Physics",
    semesters: [
      {
        name: "1st Semester",
        topics: [
          { name: "Mechanics", pdfLink: "/pdfs/physics-mechanics.pdf" },
          {
            name: "Waves and Oscillations",
            pdfLink: "/pdfs/physics-waves.pdf",
          },
          { name: "Optics", pdfLink: "/pdfs/physics-optics.pdf" },
        ],
      },
      {
        name: "2nd Semester",
        topics: [
          {
            name: "Electromagnetism",
            pdfLink: "/pdfs/physics-electromagnetism.pdf",
          },
          { name: "Quantum Mechanics", pdfLink: "/pdfs/physics-quantum.pdf" },
          {
            name: "Solid State Physics",
            pdfLink: "/pdfs/physics-solid-state.pdf",
          },
        ],
      },
    ],
  },
  "manufacturing-processes": {
    name: "Manufacturing Processes",
    semesters: [
      {
        name: "1st Semester",
        topics: [
          { name: "Casting Processes", pdfLink: "/pdfs/mfg-casting.pdf" },
          { name: "Forming Processes", pdfLink: "/pdfs/mfg-forming.pdf" },
          { name: "Joining Processes", pdfLink: "/pdfs/mfg-joining.pdf" },
        ],
      },
      {
        name: "2nd Semester",
        topics: [
          { name: "Machining Processes", pdfLink: "/pdfs/mfg-machining.pdf" },
          { name: "Additive Manufacturing", pdfLink: "/pdfs/mfg-additive.pdf" },
          { name: "Quality Control", pdfLink: "/pdfs/mfg-quality-control.pdf" },
        ],
      },
    ],
  },
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const [activeSemester, setActiveSemester] = useState(0);
  const course = courseContent[courseId];

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
              <a href="#" className={styles.resourceLink}>
                <FaVideo /> Video Lecture
              </a>
              <a href="#" className={styles.resourceLink}>
                <FaQuestionCircle /> Practice Quiz
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      <Link to="/courses" className={styles.backButton}>
        Back to Courses
      </Link>
    </div>
  );
};

export default CourseDetails;
