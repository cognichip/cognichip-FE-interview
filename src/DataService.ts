export interface FavoriteColorType {  
    id: string
    color: string;
}

export interface UserDataType {
    id: string;
    name: string;
    favoriteColor?: string;
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

const getRandomColor = (): string => {
    const digits = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += digits[Math.floor(Math.random() * 16)];
    }
    return color;
}

let userTable:UserDataType[] = firstNames.map((name:string) => ({
    name: name,
    id: Math.floor(Math.random() * 65536).toString(),
    color: ''
}));
console.log('userTable', userTable);

let colorTable: FavoriteColorType[] = userTable.map(user => ({
    id: user.id,
    color: getRandomColor()
}));
console.log('colorTable', colorTable);


export class DataService {
    public static async getUsers(): Promise<UserDataType[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(userTable);
            }, 250); 
        });
    }

    public static async getFavoriteColor(id: string): Promise<FavoriteColorType> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = userTable.find(user => user.id === id);
                if (user) {
                    const favoriteColor = colorTable.find(color => color.id === id);
                    if (favoriteColor) {
                        resolve(favoriteColor);
                    } else {
                        resolve({ id: id, color: '' });
                    }
                } else {


                    
                    resolve({ id: id, color: getRandomColor() });
                }
            }, 1); 
        });
    }

    public static async postUsers(name:string): Promise<UserDataType> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser:UserDataType = {name: name, id: Math.floor(Math.random() * 65536).toString()};
                userTable.unshift(newUser);
                resolve(newUser);
            }, 10); 
        });
    }

    public static async postFavoriteColor(id:string, favoriteColor:string): Promise<FavoriteColorType> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newColor:FavoriteColorType = { id: id, color: favoriteColor };
                colorTable.unshift(newColor);
                resolve(newColor);
            }, 10); 
        });
    }
}
