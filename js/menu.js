export default class Menu {
    #title = '';
    #items = [];
    #parent = [];
    constructor(title, items, parent) {
        this.#title = title;
        this.#items = items;
        this.#parent = parent;
    }

    get #container() {
        return this.#parent.querySelector('[data-component="Menu"]')
    }

    render() {
        this.#parent.innerHTML = this.#template();
        this.#container.addEventListener('click', this.#onMenuClick);
    }

    #onMenuClick = () => {
        this.#container.classList.toggle('open');
    }
    
    #template() {
        return `
        <div data-component="Menu" class="menu">
            <span class="title">${this.#title}</span>
            <ul>
                ${this.#items.map(name => `<li>${name}</li>`).join('')}
            </ul>
        </div>
        `
    }
}

const menu = new Menu(
    'Десерты',
    ['Торт', 'Пончики'],
    document.querySelector('#app-root')
);

menu.render();