import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Flame, Trophy } from 'lucide-react';

type ProgressTrackerProps = {
  total: number;
  currentStreak: number;
  longestStreak: number;
};

const StatCard = ({ title, value, icon: Icon }: { title: string; value: number | string; icon: React.ElementType }) => (
  <Card className="shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold text-primary">{value}</div>
      <p className="text-xs text-muted-foreground">days</p>
    </CardContent>
  </Card>
);

export function ProgressTracker({ total, currentStreak, longestStreak }: ProgressTrackerProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard title="Current Streak" value={currentStreak} icon={Flame} />
      <StatCard title="Longest Streak" value={longestStreak} icon={Trophy} />
      <StatCard title="Total Days Completed" value={total} icon={CheckCircle} />
    </div>
  );
}
