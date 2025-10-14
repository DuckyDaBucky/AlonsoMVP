/**
 * Custom hook for managing fan activity state and auto-updates
 */

import { useState, useEffect } from 'react';
import { FanActivity } from '@/types/dashboard';
import { INITIAL_FAN_ACTIVITIES, FAN_NAMES } from '@/data/constants';

export function useFanActivity() {
  const [activities, setActivities] = useState<FanActivity[]>(INITIAL_FAN_ACTIVITIES);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = FAN_NAMES[Math.floor(Math.random() * FAN_NAMES.length)];
      const randomPoints = Math.floor(Math.random() * 30) + 5;
      
      setActivities(prev => [
        { 
          id: Date.now().toString(), 
          name: randomName, 
          points: randomPoints, 
          timestamp: Date.now() 
        },
        ...prev.slice(0, 4) // Keep only 5 activities
      ]);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return activities;
}

