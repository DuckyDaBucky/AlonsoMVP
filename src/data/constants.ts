/**
 * Constants and mock data for the Ai.lonso Dashboard
 * Centralizes all static data and configuration
 */

import { TelemetryData, TeamStanding, FanActivity } from '@/types/dashboard';

// Color palette
export const COLORS = {
  primary: '#00C39A',
  secondary: '#00B0A9',
  accent: '#00E0FF',
  background: {
    dark: '#000000',
    darker: '#050505',
    card: '#0A0A0A',
  },
} as const;

// Mock telemetry data
export const TELEMETRY_DATA: TelemetryData[] = [
  { time: '0s', speed: 280, lapDelta: 0, tireWear: 10 },
  { time: '5s', speed: 295, lapDelta: -0.2, tireWear: 15 },
  { time: '10s', speed: 310, lapDelta: -0.5, tireWear: 22 },
  { time: '15s', speed: 305, lapDelta: -0.3, tireWear: 28 },
  { time: '20s', speed: 318, lapDelta: -0.7, tireWear: 35 },
  { time: '25s', speed: 300, lapDelta: -0.4, tireWear: 40 },
];

// Constructor standings
export const TEAM_STANDINGS: TeamStanding[] = [
  { position: 1, team: 'Red Bull Racing', points: 354 },
  { position: 2, team: 'Ferrari', points: 312 },
  { position: 3, team: 'McLaren', points: 287 },
  { position: 4, team: 'Mercedes', points: 201 },
  { position: 5, team: 'Aston Martin', points: 98, isHighlighted: true },
];

// Initial fan activities
export const INITIAL_FAN_ACTIVITIES: FanActivity[] = [
  { id: '1', name: 'Maria', points: 19, timestamp: Date.now() },
  { id: '2', name: 'Jaime Lopez', points: 25, timestamp: Date.now() },
  { id: '3', name: 'Emma', action: 'unlocked Speedster Tier', points: 0, timestamp: Date.now() },
];

// Random names for fan activity generation
export const FAN_NAMES = ['Alex', 'Sarah', 'Carlos', 'Hannah', 'Luis', 'Mia'];

// Trivia data
// Backwards-compatible single entry (kept in case other components import TRIVIA)
export const TRIVIA = {
  question: 'How many times has Fernando Alonso won the Monaco GP?',
  options: ['1 time', '2 times', 'Never won'],
  correctAnswer: '2 times',
};

// Expanded Alonso trivia pool
export const TRIVIA_QUESTIONS = [
  {
    question: 'How many times has Fernando Alonso won the Monaco GP?',
    options: ['1 time', '2 times', 'Never won'],
    correctAnswer: '2 times',
    correctMessage:
      'Correct! Fernando won Monaco in 2006 and 2007 with Renault — iconic drives.',
    incorrectMessage:
      'Not quite! He won Monaco 2 times — in 2006 and 2007 with Renault.',
  },
  {
    question: 'Which car number has Fernando Alonso raced with most recently?',
    options: ['14', '8', '33'],
    correctAnswer: '14',
    correctMessage: 'Yes! Number 14 — a fan-favorite tied closely to his brand.',
    incorrectMessage: 'It\'s 14 — the number most associated with Alonso in F1.',
  },
  {
    question: 'With which team did Alonso win his two F1 World Championships?',
    options: ['Ferrari', 'Renault', 'McLaren'],
    correctAnswer: 'Renault',
    correctMessage:
      'Correct! Back-to-back titles with Renault in 2005 and 2006.',
    incorrectMessage:
      'It was Renault — titles came in 2005 and 2006.',
  },
  {
    question: 'Which Triple Crown event has Alonso won outside F1?',
    options: ['Indy 500', 'Le Mans 24 Hours', 'Monaco GP'],
    correctAnswer: 'Le Mans 24 Hours',
    correctMessage: 'Right! He won Le Mans twice with Toyota (2018, 2019).',
    incorrectMessage: 'Le Mans — Alonso won it in 2018 and 2019 with Toyota.',
  },
  {
    question: 'What year did Alonso debut in Formula 1?',
    options: ['2001', '2003', '2005'],
    correctAnswer: '2001',
    correctMessage: 'Correct — he debuted in 2001 with Minardi.',
    incorrectMessage: '2001 — his F1 debut came with Minardi.',
  },
  {
    question: 'Which team did Alonso rejoin in 2023 to score frequent podiums?',
    options: ['Ferrari', 'Aston Martin', 'Alpine'],
    correctAnswer: 'Aston Martin',
    correctMessage:
      'Yes! Aston Martin — a blistering start to 2023 with multiple podiums.',
    incorrectMessage: 'Aston Martin — he delivered podiums straight away in 2023.',
  },
  {
    question: 'How many F1 World Championships does Alonso have?',
    options: ['2', '3', '1'],
    correctAnswer: '2',
    correctMessage: 'Correct — two titles: 2005 and 2006.',
    incorrectMessage: 'Two — 2005 and 2006 with Renault.',
  },
  {
    question: 'At which circuit did Alonso take his first F1 victory?',
    options: ['Hungaroring', 'Monza', 'Sepang'],
    correctAnswer: 'Hungaroring',
    correctMessage: 'Correct — 2003 Hungarian GP with Renault.',
    incorrectMessage: 'Hungaroring — he won there in 2003 for his first F1 victory.',
  },
];

// Monaco GP data
export const MONACO_GP = {
  date: 'May 25, 2025',
  temperature: { air: 24, track: 38 },
  currentLap: 47,
  totalLaps: 78,
  alonso: {
    position: 6,
    gap: '+12.3s',
    qualifyingPosition: 7,
    qualifyingTime: '1:11.432',
    number: 14,
    monacoWins: 2,
    monacoPoles: 1,
    monacoPodiums: 4,
  },
  stroll: {
    position: 11,
  },
};

