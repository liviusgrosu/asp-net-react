// Defining them
export interface Duck {
    name: string;
    numLegs: number;
    makeSound: (sound: string) => void;
}

// Creating the ducks
const duck1: Duck= {
    name: 'abc',
    numLegs: 2,
    makeSound: (sound : string) => console.log(sound)
} 

const duck2: Duck = {
    name: 'def',
    numLegs: 2,
    makeSound: (sound: string) => console.log(sound)
} 

// Making it available for others to see
export const ducks = [duck1, duck2]