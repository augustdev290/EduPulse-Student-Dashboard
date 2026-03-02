export interface Event {
  id: string;
  time: string;
  title: string;
  type: 'meeting' | 'review' | 'demo' | 'deadline';
  attendees: string[];
  color: string;
}
