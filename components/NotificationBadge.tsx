import { useState } from "react";
import { Bell, Check, Clock, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Notification {
  id: number;
  type: "course" | "event" | "achievement" | "update";
  message: string;
  time: string;
  read: boolean;
  href?: string;
}

const NotificationBadge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "course",
      message: "New course: Advanced Electronics Masters",
      time: "2 hours ago",
      read: false,
      href: "/courses/advanced-electronics",
    },
    {
      id: 2,
      type: "event",
      message: "Live workshop 'Circuit Design' starting in 1 hour",
      time: "5 hours ago",
      read: false,
      href: "/events/circuit-design",
    },
    {
      id: 3,
      type: "achievement",
      message: "Congratulations! You've completed Basic Electronics",
      time: "1 day ago",
      read: true,
      href: "/achievements",
    },
    {
      id: 4,
      type: "update",
      message: "Your project 'LED Matrix' was reviewed",
      time: "2 days ago",
      read: true,
      href: "/projects/led-matrix",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "course":
        return <Sparkles className="w-4 h-4" />;
      case "event":
        return <Clock className="w-4 h-4" />;
      case "achievement":
        return <Check className="w-4 h-4" />;
      case "update":
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "course":
        return "bg-blue-500";
      case "event":
        return "bg-purple-500";
      case "achievement":
        return "bg-green-500";
      case "update":
        return "bg-orange-500";
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="relative">
      <motion.button
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="w-5 h-5 text-[#ffa500]" />
        {unreadCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Notifications
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Mark all as read
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={notification.href || "#"}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <motion.div
                      className={`p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer ${
                        !notification.read ? "bg-blue-100" : "bg-white"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`${getNotificationColor(
                            notification.type
                          )} p-2 rounded-full text-white`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            {notification.message}
                          </p>
                          <span className="text-xs text-gray-400 mt-1 block">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {notifications.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBadge;
