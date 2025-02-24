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
                this.drawView();       
            } catch (error) {
                this.container.innerHTML = `
                    <h1>TypeScript ES6 Application</h1>
                    <p>Error loading user data: ${error}</p>
                `;
            }
        }
    }

    private async drawView(): Promise<void> {
        const userData = await DataService.getUsers();
        for (const user of userData) {
            const favoriteColor = await DataService.getFavoriteColor(user.id);
            user.favoriteColor = favoriteColor.color;
        }

        if (this.container) {
            let viewData = `
                <h1>Favorite Colors</h1>
                <div class="user-data">
                <input type="text" id="nameInput" placeholder="NAME">
                <button id="postButton">Post User</button>
                <br>
                <input type="text" id="idInput" placeholder="ID">
                <input type="text" id="colorInput" placeholder="COLOR">
                <button id="postColorButton">Post Color</button>

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
                        <td style="background-color: ${user.favoriteColor};">${user.favoriteColor}</td>
                    </tr>
                `;
            });

            viewData += `
                        </tbody>
                    </table>
                </div>
            `;

            this.container.innerHTML = viewData;
            const postButton = document.getElementById('postButton');
            if (postButton) {
                postButton.addEventListener('click', () => {
                    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
                    if (nameInput && nameInput.value) {
                        DataService.postUsers(nameInput.value).then((user) => {
                            this.drawView(); 
                            alert('User posted: ' + JSON.stringify(user));
                        });
                    } else {
                        alert('Please enter a name.');
                    }
                });
            }

            const postColorButton = document.getElementById('postColorButton');
            if (postColorButton) {
                postColorButton.addEventListener('click', () => {
                    const idInput = document.getElementById('idInput') as HTMLInputElement;
                    const colorInput = document.getElementById('colorInput') as HTMLInputElement;
                    if (idInput && idInput.value && colorInput && colorInput.value) {
                        DataService.postFavoriteColor(idInput.value, colorInput.value).then((color) => {
                            this.drawView();
                            alert('Color posted: ' + JSON.stringify(color));
                        });
                    } else {
                        alert('Please enter both ID and Color.');
                    }
                });
            }
        }
    }
}