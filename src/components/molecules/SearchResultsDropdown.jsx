import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const SearchResultsDropdown = ({ results, onSelectLocation, show }) => {
  return (
    <AnimatePresence>
      {show && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 search-dropdown bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg z-50"
        >
          {results.map((result, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectLocation(result)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
            >
              <ApperIcon name="MapPin" className="w-4 h-4 text-gray-400" />
              <span className="text-gray-800">{result}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchResultsDropdown;