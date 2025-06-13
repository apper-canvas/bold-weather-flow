import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorState = ({ error, onTryAgain }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center"
  >
    <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Unable to Load Weather</h3>
    <p className="text-white/80 mb-6">{error}</p>
    <Button
      onClick={onTryAgain}
      className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30"
    >
      Try Again
    </Button>
  </motion.div>
);

export default ErrorState;