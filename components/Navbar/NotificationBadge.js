import React, { useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./NotificationBadge.module.css";

export default function NotificationBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      type: "course",
      message: "New course available: Advanced Electronics",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "event",
      message: "Live workshop starting in 1 hour",
      time: "5 hours ago",
    },
  ]);

  return (
    <div className={styles.notificationContainer}>
      <motion.button
        className={styles.notificationToggle}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell size={20} />
        {notifications.length > 0 && (
          <span className={styles.badge}>{notifications.length}</span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.notificationPanel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <h3>Notifications</h3>
            <div className={styles.notificationList}>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className={styles.notification}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={styles.notificationType}>
                    {notification.type}
                  </span>
                  <p>{notification.message}</p>
                  <span className={styles.notificationTime}>
                    {notification.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
