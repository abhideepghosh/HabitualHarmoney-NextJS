"use client";

import { useState, useEffect, useMemo } from 'react';
import { isToday, isYesterday, differenceInCalendarDays, parse, formatISO, startOfDay } from 'date-fns';

type AdherenceData = {
  [date: string]: boolean;
};

type HabitData = {
  habit: string;
  adherence: AdherenceData;
  longestStreak: number;
};

const calculateLongestStreakFromDates = (sortedDates: Date[]): number => {
    if (sortedDates.length === 0) return 0;
    let maxStreak = 1;
    let currentStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      if (differenceInCalendarDays(sortedDates[i], sortedDates[i - 1]) === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    }
    return maxStreak;
};

const getInitialData = (key: string): HabitData => {
  if (typeof window === 'undefined') {
    return { habit: 'My New Habit', adherence: {}, longestStreak: 0 };
  }
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
      const data = JSON.parse(item);
      if (typeof data.habit === 'string' && typeof data.adherence === 'object' && data.adherence !== null) {
        // For backward compatibility, if longestStreak isn't stored, calculate it.
        if (typeof data.longestStreak !== 'number') {
          const adherence = data.adherence || {};
          const completed = Object.keys(adherence).filter(key => adherence[key]);
          const sortedDates = completed.map(dateString => parse(dateString, 'yyyy-MM-dd', new Date())).sort((a, b) => a.getTime() - b.getTime());
          data.longestStreak = calculateLongestStreakFromDates(sortedDates);
        }
        return data;
      }
    }
  } catch (error) {
    console.error("Error reading from localStorage", error);
  }
  return { habit: 'My New Habit', adherence: {}, longestStreak: 0 };
};

export function useHabitData(userKey: string) {
  const [data, setData] = useState<HabitData>(() => getInitialData(userKey));

  useEffect(() => {
    setData(getInitialData(userKey));
  }, [userKey]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(userKey, JSON.stringify(data));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }
  }, [data, userKey]);

  const setHabit = (newHabit: string) => {
    setData(prevData => ({ ...prevData, habit: newHabit }));
  };

  const toggleDayCompletion = (date: Date) => {
    const today = startOfDay(new Date());
    if (date > today) return; // Prevent marking future dates

    const dateString = formatISO(startOfDay(date), { representation: 'date' });
    setData(prevData => {
      const newAdherence = { ...prevData.adherence };
      if (newAdherence[dateString]) {
        delete newAdherence[dateString];
      } else {
        newAdherence[dateString] = true;
      }
      return { ...prevData, adherence: newAdherence };
    });
  };

  const { completedDays, sortedDates } = useMemo(() => {
    const adherence = data.adherence || {};
    const completed = Object.keys(adherence).filter(key => adherence[key]);
    const sorted = completed.map(dateString => parse(dateString, 'yyyy-MM-dd', new Date())).sort((a, b) => a.getTime() - b.getTime());
    return { completedDays: completed, sortedDates: sorted };
  }, [data.adherence]);
  
  const totalCompletedDays = completedDays.length;

  const currentStreak = useMemo(() => {
    if (sortedDates.length === 0) return 0;
    
    const lastDay = sortedDates[sortedDates.length - 1];
    
    // A "current" streak is broken if a day was missed.
    if (!isToday(lastDay) && !isYesterday(lastDay)) {
      return 0;
    }

    let streak = 1;
    for (let i = sortedDates.length - 2; i >= 0; i--) {
        if (differenceInCalendarDays(sortedDates[i+1], sortedDates[i]) === 1) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
  }, [sortedDates]);

  useEffect(() => {
    if (currentStreak > data.longestStreak) {
      setData(prevData => ({ ...prevData, longestStreak: currentStreak }));
    }
  }, [currentStreak, data.longestStreak]);

  const resetCurrentProgress = () => {
    setData(prevData => ({
      ...prevData,
      adherence: {},
    }));
  };

  return {
    habit: data.habit,
    setHabit,
    adherence: data.adherence,
    toggleDayCompletion,
    completedDates: sortedDates,
    totalCompletedDays,
    longestStreak: data.longestStreak,
    currentStreak,
    resetCurrentProgress,
  };
}
