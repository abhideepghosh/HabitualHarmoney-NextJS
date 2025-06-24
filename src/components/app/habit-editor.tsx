import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type HabitEditorProps = {
  habit: string;
  onHabitChange: (habit: string) => void;
};

export function HabitEditor({ habit, onHabitChange }: HabitEditorProps) {
  return (
    <Card className="h-full shadow-lg transition-shadow hover:shadow-xl">
      <CardHeader>
        <CardTitle>Your Habit</CardTitle>
        <CardDescription>What goal are you focusing on?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="habit-name" className="sr-only">Habit Name</Label>
          <Input
            id="habit-name"
            value={habit}
            onChange={(e) => onHabitChange(e.target.value)}
            placeholder="e.g. Meditate for 10 minutes"
            className="text-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
