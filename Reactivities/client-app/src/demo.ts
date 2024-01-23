export interface Duck {
    name: string;
    numLegs: number;
    makeSound: (sound: string) => void;
}

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

export const ducks = [duck1, duck2]