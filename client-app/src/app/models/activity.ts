import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;
  hostUsername?: string;
  isCancelled?: boolean;
  isGoing?: boolean;
  isHost?: boolean
  attendees?: Profile[]
  host?: Profile;
}
