import { DataService } from './DataService';

export class App {
    private container: HTMLElement | null;

    constructor() {
        this.container = document.getElementById('app');
    }

    public async init(): Promise<void> {
        if (this.container) {
            this.container.innerHTML = `
                <h1>Favorite Colors</h1>
                <p>Loading user data...</p>
            `;
            
            try {
                const userData = await DataService.getUsers();

                for (const user of userData) {
                    const favoriteColor = await DataService.getFavoriteColor(user.id);
                    user.favoriteColor = favoriteColor;
                }
                let viewData = `
                    <h1>Favorite Colors</h1>
                    <div class="user-data">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Color</th>
                                </tr>
                            </thead>
                            <tbody>
                `;

                userData.forEach(user => {
                    viewData += `
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.id}</td>
                            <td style="background-color: ${user.favoriteColor?.color};">${user.favoriteColor?.color}</td>
                        </tr>
                    `;
                });

                viewData += `
                            </tbody>
                        </table>
                    </div>
                `;

                this.container.innerHTML = viewData;
            } catch (error) {
                this.container.innerHTML = `
                    <h1>TypeScript ES6 Application</h1>
                    <p>Error loading user data: ${error}</p>
                `;
            }
        }
    }
}