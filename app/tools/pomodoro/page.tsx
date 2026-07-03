import type { Metadata } from "next";
import PomodoroTool from "./PomodoroTool";

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "A simple Pomodoro timer.",
};

export default function PomodoroPage() {
  return <PomodoroTool />;
}
