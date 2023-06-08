export interface User { //the user model used to store data in the database
    uid: string;
    name: string | null;
    email: string | null;
    photoUrl: string | undefined | null;
    highScore: number;
}