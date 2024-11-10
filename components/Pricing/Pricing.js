import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaArrowRight } from "react-icons/fa";
import styles from "./Pricing.module.css";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for getting started",
      monthlyPrice: 999,
      annualPrice: 9990,
      features: [
        { text: "Access to basic courses", included: true },
        { text: "Community forum access", included: true },
        { text: "Basic project templates", included: true },
        { text: "Email support", included: true },
        { text: "Personalized learning path", included: false },
        { text: "1-on-1 mentoring", included: false },
        { text: "Advanced projects", included: false },
        { text: "Career guidance", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "Most popular for engineering students",
      monthlyPrice: 1999,
      annualPrice: 19990,
      features: [
        { text: "All Basic features", included: true },
        { text: "Full course library access", included: true },
        { text: "Personalized learning path", included: true },
        { text: "Priority email support", included: true },
        { text: "Monthly group mentoring", included: true },
        { text: "Advanced project templates", included: true },
        { text: "1-on-1 mentoring sessions", included: false },
        { text: "Career placement support", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      description: "Complete learning experience",
      monthlyPrice: 2999,
      annualPrice: 29990,
      features: [
        { text: "All Pro features", included: true },
        { text: "Unlimited 1-on-1 mentoring", included: true },
        { text: "Career placement support", included: true },
        { text: "Industry project experience", included: true },
        { text: "Interview preparation", included: true },
        { text: "LinkedIn profile review", included: true },
        { text: "Resume building workshop", included: true },
        { text: "Lifetime access", included: true },
      ],
    },
  ];

  return (
    <section id="pricing" className={styles.pricing}>
      <motion.div
        className={styles.pricingContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.pricingHeader}>
          <h2>Choose Your Learning Path</h2>
          <p>Flexible plans designed for your success</p>

          <motion.div
            className={styles.billingToggle}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className={!isAnnual ? styles.active : ""}>Monthly</span>
            <motion.button
              className={styles.toggleButton}
              onClick={() => setIsAnnual(!isAnnual)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={styles.toggleThumb}
                animate={{ x: isAnnual ? 22 : 0 }}
              />
            </motion.button>
            <span className={isAnnual ? styles.active : ""}>
              Annual
              <motion.span className={styles.discount}>Save 20%</motion.span>
            </span>
          </motion.div>
        </div>

        <div className={styles.pricingGrid}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`${styles.pricingCard} ${
                plan.id === "pro" ? styles.popular : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              whileHover={{ scale: 1.03 }}
            >
              {plan.id === "pro" && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}

              <div className={styles.planHeader}>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div className={styles.price}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>
                    {isAnnual
                      ? Math.floor(plan.annualPrice / 12)
                      : plan.monthlyPrice}
                  </span>
                  <span className={styles.period}>/month</span>
                </div>
                {isAnnual && (
                  <div className={styles.annualPrice}>
                    Billed annually at ₹{plan.annualPrice}
                  </div>
                )}
              </div>

              <ul className={styles.features}>
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                  >
                    {feature.included ? (
                      <FaCheck className={styles.checkIcon} />
                    ) : (
                      <FaTimes className={styles.timesIcon} />
                    )}
                    {feature.text}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className={styles.ctaButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <FaArrowRight className={styles.arrowIcon} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.guarantee}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>🔒 30-day money-back guarantee • No questions asked</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Pricing;
