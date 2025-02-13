import { App } from '../App';

describe('App', () => {
    let app: App;

    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>';
        app = new App();
    });

    test('should initialize with correct content', () => {
        app.init();
        const container = document.getElementById('app');
        expect(container?.innerHTML).toContain('TypeScript ES6 Application');
    });
});