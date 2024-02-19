export default class Carousel {
    constructor(slides) {
        this.slides = slides;
        this.container = null;
        this.init();
        this.dragDrop();
    }
    get elem() {
        return this.container;
    }
    
    init() {
        this.container = this.createContainer();
    }
    createContainer() {
        const container = document.createElement('div');
        container.className = 'gallery';

        let content = `
            <div class="carousel__arrow carousel__arrow_right">
            <img src="/img/icons/angle-icon.svg" alt="icon">
            </div>
            <div class="carousel__arrow carousel__arrow_left">
            <img src="/img/icons/angle-left-icon.svg" alt="icon">
            </div>
            <div class="wrapper">
            <div class="carousel__inner">
        `;

        this.slides.forEach(slide => {
            content += `
            <div class="carousel__slide" data-id="penang-shrimp">
              <img src="/img/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
              </div>
            </div>
            `;
        });

        content += '</div></div>';
        container.innerHTML = content;
        return container;
    }

    dragDrop() {
        let innerSlider = this.container.querySelector('.carousel__inner');
        let sliderContainer = this.container.querySelector('.wrapper');
        let pressed = false;
        let startX;
        let x;
        
        sliderContainer.addEventListener("pointerdown", (e) => {
            pressed = true;
            startX = e.offsetX - innerSlider.offsetLeft;
            sliderContainer.style.cursor = "grabbing";
        });
        
        sliderContainer.addEventListener("pointerenter", () => {
            sliderContainer.style.cursor = "grab";
        });
        
        sliderContainer.addEventListener("pointerleave", () => {
            sliderContainer.style.cursor = "default";
        });
        
        sliderContainer.addEventListener("pointerup", () => {
            sliderContainer.style.cursor = "grab";
            pressed = false;
        });
        
        window.addEventListener("pointerup", () => {
            // pressed = false;
        });
        
        sliderContainer.addEventListener("pointermove", (e) => {
            if (!pressed) return;
            e.preventDefault();
        
            x = e.offsetX;
        
            innerSlider.style.left = `${x - startX}px`;
        
            checkBoundary();
        });
        
        const checkBoundary = () => {
            let outer = sliderContainer.getBoundingClientRect();
            let inner = innerSlider.getBoundingClientRect();
        
            if (parseInt(innerSlider.style.left) > 0) {
                innerSlider.style.left = "0px";
            }
        
            if (inner.right < outer.right) {
                innerSlider.style.left = `-${inner.width - outer.width}px`;
            }
        };
    }
    
}