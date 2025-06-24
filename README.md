# Habitual Harmony

Habitual Harmony is a simple yet elegant habit tracking application designed to help you build and maintain positive habits. Stay focused on your goals, track your progress visually, and watch your streaks grow!

## Features

- **Simple Habit Entry:** Define the one habit you want to focus on.
- **Interactive Calendar:** Mark days as complete with a simple click.
- **Streak Tracking:** See your current and longest streaks to stay motivated.
- **Progress Stats:** View your total completed days.
- **Data Persistence:** Your habit data is saved locally in your browser.
- **Reset Options:**
    - **Reset Progress:** Clear your calendar and current streak without losing your longest streak record.
    - **Exit & Clear Data:** Completely reset the app, including your name and all data.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)
- **Date & Time:** [date-fns](https://date-fns.org/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation & Setup

1.  Install NPM packages:
    ```sh
    npm install
    ```

2.  Run the development server:
    ```sh
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) or your own hosted port url with your browser to see the result.

Open [Habitual Harmoney](https://habitual-harmoney-next-js.vercel.app/) with your browser to see the live demo.

## How to Use

1.  **Enter Your Name:** When you first open the app, you'll be prompted to enter your name.
2.  **Define Your Habit:** In the "Your Habit" card, type the habit you want to track.
3.  **Track Your Progress:**
    - Click on a date in the calendar to mark it as complete. You can click it again to unmark it.
    - Future dates cannot be selected.
4.  **Monitor Your Stats:** The cards at the top will show your current streak, longest streak, and total days completed.
5.  **Reset or Exit:** Use the icons in the header to reset your current progress or to exit and clear all your data.
