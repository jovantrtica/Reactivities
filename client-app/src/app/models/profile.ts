import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  following: boolean;
  photos?: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
    this.bio = user.bio; // dodao ja
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
  bio?: string;
  photos?: Photo[];
}

export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}
