"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

type HabitCalendarProps = {
  onDayClick: (date: Date) => void;
  completedDates: Date[];
};

export function HabitCalendar({ onDayClick, completedDates }: HabitCalendarProps) {

  return (
    <Card className="shadow-lg transition-shadow hover:shadow-xl flex flex-col">
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Click a day to mark it complete.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center flex-grow">
        <Calendar
          mode="multiple"
          selected={completedDates}
          onDayClick={onDayClick}
          className="p-0"
          classNames={{
            day_selected: "bg-accent text-accent-foreground rounded-full hover:bg-accent/90 focus:bg-accent focus:text-accent-foreground",
            day_today: "bg-primary/10 text-primary rounded-full",
          }}
          disabled={(date) => date > new Date()}
        />
      </CardContent>
    </Card>
  );
}
