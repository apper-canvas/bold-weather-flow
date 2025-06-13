import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => (
  <div className="space-y-6">
    {/* Search skeleton */}
    <div className="animate-pulse">
      <div className="h-14 bg-white/20 rounded-xl"></div>
    </div>
    
    {/* Current weather skeleton */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 animate-pulse"
    >
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-white/30 rounded-full mx-auto"></div>
        <div className="h-16 bg-white/30 rounded w-48 mx-auto"></div>
        <div className="h-6 bg-white/30 rounded w-32 mx-auto"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-white/30 rounded-lg"></div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Forecast skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/20 backdrop-blur-sm rounded-xl p-4 animate-pulse"
        >
          <div className="h-4 bg-white/30 rounded mb-3"></div>
          <div className="w-12 h-12 bg-white/30 rounded-full mx-auto mb-3"></div>
          <div className="h-6 bg-white/30 rounded mb-2"></div>
          <div className="h-4 bg-white/30 rounded"></div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;