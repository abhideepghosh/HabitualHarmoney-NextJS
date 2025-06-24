"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginScreenProps = {
  onLogin: (username: string) => void;
};

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-2xl animate-fade-in-up">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-headline text-primary">Habitual Harmony</CardTitle>
          <CardDescription className="text-lg">What name should we call you?</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="username" className="sr-only">Your Name</Label>
              <Input
                id="username"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className="text-center text-base"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-lg" disabled={!username.trim()}>
              Begin Journey
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
