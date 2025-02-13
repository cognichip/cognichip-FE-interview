export interface FavoriteColorType {  
    id: string
    color: string;
}

export interface UserDataType {
    id: string;
    name: string;
    favoriteColor?: FavoriteColorType;
}

const firstNames:string[] = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Oliver", "Isabella", "William", "Sophia", "James",
    "Charlotte", "Benjamin", "Mia", "Lucas", "Amelia", "Henry", "Harper", "Theodore", "Evelyn", "Jack",
    "Luna", "Leo", "Nova", "Sebastian", "Aurora", "Gabriel", "Hazel", "Ethan", "Cora", "Alexander",
    "Violet", "Owen", "Scarlett", "Mason", "Eleanor", "Atlas", "Lucy", "Ezra", "Sofia", "Kai",
    "Willow", "Luca", "Layla", "Hudson", "Iris", "Asher", "Nora", "Axel", "Alice", "Adrian",
    "Zoe", "Roman", "Audrey", "Thomas", "Claire", "Caleb", "Hannah", "Felix", "Julia", "Miles",
    "Ruby", "Oscar", "Autumn", "Silas", "Grace", "Nathan", "Chloe", "River", "Aria", "Austin",
    "Eden", "Adam", "Lily", "Jasper", "Eliana", "Finn", "Maya", "Xavier", "Rose", "Wesley",
    "Ivy", "Isaac", "Isla", "Elias", "Sage", "Dominic", "Eva", "Daniel", "June", "Justin",
    "Maria", "David", "Daisy", "Max", "Athena", "Julian", "Ella", "Simon", "Mila", "Christopher"
];


const userDataMock: UserDataType[] = firstNames.map((name:string) => ({
    name,
    id: Math.floor(Math.random() * 65536).toString()
}));

const getRandomColor = (): string => {
    const digits = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += digits[Math.floor(Math.random() * 16)];
    }
    return color;
}

export class DataService {
    public static async getUsers(): Promise<UserDataType[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(userDataMock);
            }, 500); 
        });
    }

    public static async getFavoriteColor(id:string): Promise<FavoriteColorType> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ id: id, color: getRandomColor() });
            }, 10); 
        });
    }
}
