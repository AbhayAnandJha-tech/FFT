import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User as UserIcon,
  Settings,
  BookOpen,
  Heart,
  LogOut,
  Bell,
  Bookmark,
  Award,
} from "lucide-react";
import styles from "./UserProfile.module.css";

export default function UserProfile({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    setIsOpen(false);
  };

  const menuItems = [
    { icon: <UserIcon size={18} />, label: "My Profile", path: "/profile" },
    { icon: <BookOpen size={18} />, label: "My Courses", path: "/my-courses" },
    // { icon: <Bookmark size={18} />, label: "Saved Items", path: "/saved" },
    // { icon: <Award size={18} />, label: "Certificates", path: "/certificates" },
    // { icon: <Heart size={18} />, label: "Favorites", path: "/favorites" },
    { icon: <Bell size={18} />, label: "Notifications", path: "/notifications", badge: "3" },
    { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
    { icon: <LogOut size={18} />, label: "Logout", onClick: handleLogout, className: styles.logoutItem },
  ];

  return (
    <div className={styles.profileContainer}>
      <motion.div
        className={styles.profileTrigger}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={user.avatar} alt={user.name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userRole}>{user.role}</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className={styles.dropdown}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`${styles.menuItem} ${item.className || ""}`}
                  whileHover={{ backgroundColor: "#f0f0f0" }}
                  onClick={() => item.onClick && item.onClick()}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className={styles.badge}>{item.badge}</span>}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
