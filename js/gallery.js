export default class Carousel {
    constructor(slides) {
        this.slides = slides;
        this.container = null;
        this.init();
        this.slide = this.container.querySelector('.carousel__inner');
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
        this.slide.ondragstart = () => false;
        this.slide.addEventListener('pointerdown', (e) => {
            this.slide.classList.add('slider_dragging');

            let cursorStartPosition = e.clientX.toFixed();

            const onMove = (event) => {
                let clientX = event.clientX.toFixed();
                let widthSlide = this.slide.offsetWidth;
                let translateX = 0;

                if (clientX - cursorStartPosition > 150) {
                    translateX += widthSlide;
                    this.slide.style.transform = `translateX(${translateX}px)`;
                    let pointerUp = new Event("pointerup");
                    this.slide.dispatchEvent(pointerUp);
                    console.log(translateX);
                }
          
                if (clientX - cursorStartPosition < -150) {
                    translateX -= widthSlide;
                    this.slide.style.transform = `translateX(${translateX}px)`;
                    let pointerUp = new Event("pointerup");
                    this.slide.dispatchEvent(pointerUp);
                    console.log(translateX);
                }
            }
            this.container.addEventListener('pointermove', onMove);


            this.slide.addEventListener('pointerup', () => {
                this.container.removeEventListener('pointermove', onMove);
            });
        })
    }
    
}