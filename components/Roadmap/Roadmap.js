import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaLock, FaPlay } from "react-icons/fa";
import styles from "./Roadmap.module.css";

const Roadmap = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const roadmapData = [
    {
      id: 1,
      title: "Foundations",
      description: "Master the basics of engineering and programming",
      completed: true,
      modules: [
        {
          name: "Introduction to Engineering",
          duration: "2 weeks",
          completed: true,
        },
        { name: "Basic Mathematics", duration: "3 weeks", completed: true },
        {
          name: "Programming Fundamentals",
          duration: "4 weeks",
          completed: true,
        },
      ],
    },
    {
      id: 2,
      title: "Core Concepts",
      description: "Build strong theoretical knowledge",
      completed: false,
      current: true,
      modules: [
        { name: "Advanced Mathematics", duration: "4 weeks", completed: false },
        {
          name: "Physics for Engineers",
          duration: "3 weeks",
          completed: false,
        },
        { name: "Data Structures", duration: "4 weeks", completed: false },
      ],
    },
    // Add more milestones...
  ];

  return (
    <section className={styles.roadmap}>
      <motion.div
        className={styles.roadmapContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.roadmapHeader}>
          <h2>Your Learning Journey</h2>
          <p>Follow this roadmap to master engineering concepts</p>
        </div>

        <div className={styles.timeline}>
          {roadmapData.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              className={`${styles.milestone} ${
                milestone.completed ? styles.completed : ""
              } ${milestone.current ? styles.current : ""}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className={styles.milestoneHeader}
                onClick={() =>
                  setSelectedMilestone(
                    selectedMilestone === milestone.id ? null : milestone.id
                  )
                }
              >
                <div className={styles.milestoneIcon}>
                  {milestone.completed ? (
                    <FaCheckCircle />
                  ) : milestone.current ? (
                    <FaPlay />
                  ) : (
                    <FaLock />
                  )}
                </div>
                <div className={styles.milestoneInfo}>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>

              <AnimatePresence>
                {selectedMilestone === milestone.id && (
                  <motion.div
                    className={styles.modulesList}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {milestone.modules.map((module, moduleIndex) => (
                      <motion.div
                        key={moduleIndex}
                        className={styles.module}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: moduleIndex * 0.1 }}
                      >
                        <div className={styles.moduleStatus}>
                          {module.completed ? (
                            <FaCheckCircle className={styles.completed} />
                          ) : (
                            <div className={styles.incomplete} />
                          )}
                        </div>
                        <div className={styles.moduleInfo}>
                          <h4>{module.name}</h4>
                          <p>{module.duration}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Roadmap;
