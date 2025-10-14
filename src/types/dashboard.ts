/**
 * TypeScript interfaces and types for the Ai.lonso Fan Dashboard
 * Centralizes all type definitions for better maintainability
 */

export interface FanActivity {
  id: string;
  name: string;
  points: number;
  action?: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ailonso';
  message: string;
  timestamp: number;
}

export interface TelemetryData {
  time: string;
  speed: number;
  lapDelta: number;
  tireWear: number;
}

export interface PollOption {
  label: string;
  votes: number;
}

export type TelemetryTab = 'speed' | 'lapDelta' | 'tireWear';

export interface TeamStanding {
  position: number;
  team: string;
  points: number;
  isHighlighted?: boolean;
}

