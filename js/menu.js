export default class Menu {
    items = [];
    #parent = [];
    constructor(items, parent) {
        this.items = items;
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = this.#template();
    }

    #template() {
        return `
        <div data-component="Menu" class="menu-bar">
            <ul>
                ${this.items.map(item => `<li><a href="${item.link}">${item.name}</a></li>`)}
            </ul>
        </div>
        `
    }
}