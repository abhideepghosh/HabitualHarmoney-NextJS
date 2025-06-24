"use client";

import { useHabitData } from '@/hooks/use-habit-data';
import { HabitCalendar } from './habit-calendar';
import { HabitEditor } from './habit-editor';
import { ProgressTracker } from './progress-tracker';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

type HabitualHarmonyAppProps = {
  user: string;
  onLogout: () => void;
};

export function HabitualHarmonyApp({ user, onLogout }: HabitualHarmonyAppProps) {
  const userKey = `habitual-harmony-user-${user}`;
  const {
    habit,
    setHabit,
    adherence,
    toggleDayCompletion,
    completedDates,
    totalCompletedDays,
    longestStreak,
    currentStreak,
  } = useHabitData(userKey);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-headline text-primary">Habitual Harmony</h1>
          <p className="text-muted-foreground">Welcome back, {user}!</p>
        </div>
        <Button variant="ghost" onClick={onLogout} aria-label="Log out" className="p-2 rounded-full h-auto">
          <LogOut className="h-5 w-5" />
        </Button>
      </header>
      
      <main className="flex-grow flex flex-col gap-8">
        <ProgressTracker
          total={totalCompletedDays}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
        />

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <HabitEditor habit={habit} onHabitChange={setHabit} />
          </div>
          <div className="lg:col-span-2">
            <HabitCalendar
              onDayClick={toggleDayCompletion}
              completedDates={completedDates}
            />
          </div>
        </div>
      </main>
      <footer className="text-center mt-8 text-sm text-muted-foreground">
        <p>Craft your best self, one day at a time.</p>
      </footer>
    </div>
  );
}
