import { Event } from './types';

export const chartData = [
  { name: 'Mon', completed: 40, planned: 24 },
  { name: 'Tue', completed: 30, planned: 13 },
  { name: 'Wed', completed: 20, planned: 98 },
  { name: 'Thu', completed: 27, planned: 39 },
  { name: 'Fri', completed: 18, planned: 48 },
  { name: 'Sat', completed: 23, planned: 38 },
  { name: 'Sun', completed: 34, planned: 43 },
];

export const distributionData = [
  { name: 'Development', value: 400, color: '#2563eb' },
  { name: 'Design', value: 300, color: '#9333ea' },
  { name: 'Research', value: 200, color: '#10b981' },
  { name: 'Bugs', value: 100, color: '#f43f5e' },
];

export const skillsData = [
  { subject: 'Design', A: 120, B: 110, fullMark: 150 },
  { subject: 'Dev', A: 98, B: 130, fullMark: 150 },
  { subject: 'QA', A: 86, B: 130, fullMark: 150 },
  { subject: 'Ops', A: 99, B: 100, fullMark: 150 },
  { subject: 'Product', A: 85, B: 90, fullMark: 150 },
  { subject: 'Sales', A: 65, B: 85, fullMark: 150 },
];

export const projectStatusData = [
  { name: 'Mobile', completed: 40, pending: 24, delayed: 10 },
  { name: 'Web', completed: 30, pending: 13, delayed: 5 },
  { name: 'Admin', completed: 20, pending: 98, delayed: 2 },
  { name: 'API', completed: 27, pending: 39, delayed: 20 },
];

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);

export const events: Event[] = [
  {
    id: '1',
    time: '09:00 AM',
    title: 'Sprint Planning',
    type: 'meeting',
    attendees: [
      'https://picsum.photos/seed/user1/100/100',
      'https://picsum.photos/seed/user2/100/100',
      'https://picsum.photos/seed/user3/100/100'
    ],
    color: 'blue'
  },
  {
    id: '2',
    time: '02:00 PM',
    title: 'Design Review',
    type: 'review',
    attendees: [
      'https://picsum.photos/seed/user4/100/100',
      'https://picsum.photos/seed/user5/100/100',
      'https://picsum.photos/seed/user6/100/100'
    ],
    color: 'purple'
  },
  {
    id: '3',
    time: '04:00 PM',
    title: '1-on-1 with Sarah',
    type: 'demo',
    attendees: [
      'https://picsum.photos/seed/user7/100/100',
      'https://picsum.photos/seed/user8/100/100'
    ],
    color: 'emerald'
  }
];

export const pageInfo: Record<string, { title: string, subtitle: string }> = {
  'Dashboard': { title: 'Student Dashboard', subtitle: 'Overview of your academic progress' },
  'Tasks': { title: 'Assignments', subtitle: 'Manage and track your homework and projects' },
  'Projects': { title: 'Study Groups', subtitle: 'Collaborate with your classmates' },
  'Analytics': { title: 'Academic Performance', subtitle: 'Detailed insights into your grades and attendance' },
  'Calendar': { title: 'Academic Calendar', subtitle: 'Schedule of classes, exams, and holidays' },
  'Team Members': { title: 'Faculty & Students', subtitle: 'Connect with teachers and peers' },
  'Reports': { title: 'Academic Reports', subtitle: 'Generate transcripts and progress summaries' },
  'Messages': { title: 'Campus Communication', subtitle: 'Stay connected with your school community' },
  'Settings': { title: 'Profile Settings', subtitle: 'Configure your academic preferences' },
  'Help & Support': { title: 'Student Support', subtitle: 'Get assistance and view school documentation' },
  'Logout': { title: 'Logout', subtitle: 'You have been securely logged out' },
  'Upgrade': { title: 'Premium Student Plan', subtitle: 'Unlock advanced learning tools' },
};
