import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import SearchResultsDropdown from '@/components/molecules/SearchResultsDropdown';
import ApperIcon from '@/components/ApperIcon'; // Used directly for specific internal icons

const SearchAndControls = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  showResults,
  onSearch,
  onLocationSelect,
  onGetCurrentLocation,
  units,
  onUnitsToggle,
}) => {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleLocationClick = (location) => {
    onLocationSelect(location);
    setSearchInputFocused(false);
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col md:flex-row gap-4 items-center justify-between"
    >
      {/* Search */}
      <div className="relative flex-1 max-w-md w-full" ref={searchRef}>
        <Input
          iconName="Search"
          value={searchQuery}
          onChange={handleSearchInput}
          onFocus={() => setSearchInputFocused(true)}
          placeholder="Search for a city..."
        />
        
        <SearchResultsDropdown
          results={searchResults}
          onSelectLocation={handleLocationClick}
          show={showResults && searchInputFocused}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Geolocation Button */}
        <Button
          onClick={onGetCurrentLocation}
          className="p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white hover:bg-white/30"
          title="Use current location"
        >
          <ApperIcon name="MapPin" className="w-5 h-5" />
        </Button>

        {/* Units Toggle */}
        <Button
          onClick={onUnitsToggle}
          className="px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white hover:bg-white/30 font-medium"
        >
          °{units === 'metric' ? 'C' : 'F'}
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchAndControls;