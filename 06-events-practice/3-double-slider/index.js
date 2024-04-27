export default class DoubleSlider { //не получается пройти тесты с dispatchEvent 89, 108, 137, 158, 198, 222 строки в тестах. Попроловал иммитировать работу теста при помощи функции testFunc() 129 строка index.js, тест был пройден правльно, но при npm test нет
    element;
    static leftRange = 0;
    static rightRange = 0;
    static countMeetSlider = true;
    constructor({min = 150, max = 300, selected = {}, formatValue = (value) => '$' + value} = {}){
        this.min = min;
        this.max = max;
        this.selected = selected
        this.formatValue = formatValue;
        this.createElementSlider();
        this.delta = max - min;
        this.from = this.selected.from
        this.to = this.selected.to
        this.changeAmount()
        this.changeAmountSelect()
        this.createEventListener();
    }
    
    createElementSlider(){
        this.element = this.createElement(this.createTempalatElement)
    }

    createElement(template) {
        const div = document.createElement("div");
        div.innerHTML = template;
        return div.firstElementChild;
    }

    createTempalatElement(){
        return `<div class="range-slider">
                    <span data-element = "from">$10</span>
                    <div class="range-slider__inner">
                    <span class="range-slider__progress"></span>
                    <span class="range-slider__thumb-left"></span>
                    <span class="range-slider__thumb-right"></span>
                    </div>
                    <span data-element = "to">$100</span>
                </div>`
    }

    mouseDownHandler(e){
        if(e.target.classList.contains('range-slider__thumb-left') || e.target.classList.contains('range-slider__thumb-right')){
            this.thumb = e.target;
            this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
            this.mouseUpHandler = this.mouseUpHandler.bind(this);
            document.addEventListener("pointermove", this.mouseMoveHandler);
            document.addEventListener("pointerup", this.mouseUpHandler);
            this.rangeSlider = document.querySelector('.range-slider__inner').offsetWidth
            // if(this.selected){
                if(!this.countLeft && e.target.classList.contains('range-slider__thumb-left')){
                    this.startXLeft = this.element.querySelector('.range-slider__inner').getBoundingClientRect().left - 3
                } 
                if(!this.countRight && e.target.classList.contains('range-slider__thumb-right')){
                    this.startXRight = this.element.querySelector('.range-slider__inner').getBoundingClientRect().right + 3
                }
            // }else{
            //     if(!this.countLeft && e.target.classList.contains('range-slider__thumb-left')){
            //         this.startXLeft = e.clientX
            //     } 
            //     if(!this.countRight && e.target.classList.contains('range-slider__thumb-right')){
            //         this.startXRight = e.clientX
            //     }
            // }
            this.sliderProgress = document.querySelector('.range-slider__progress')
            this.leftRange = 0;
            this.rightRange = 0;
        }
    }
    changeAmount(){
            this.element.querySelector('span[data-element="from"]').textContent = this.formatValue(this.min)
            this.element.querySelector('span[data-element="to"]').textContent = this.formatValue(this.max)
    }
    changeAmountSelect(){
        if(this.selected.from && this.selected.to){
            this.element.querySelector('.range-slider__thumb-left').style.left = ((this.from - this.min) / this.delta * 100) +'%'
            this.element.querySelector('.range-slider__progress').style.left = ((this.from - this.min) / this.delta * 100) +'%'
            this.element.querySelector('.range-slider__thumb-right').style.right = ((this.max - this.to) / this.delta * 100) +'%'
            this.element.querySelector('.range-slider__progress').style.right = ((this.max - this.to) / this.delta * 100) +'%'
            this.element.querySelector('span[data-element="from"]').textContent = this.formatValue(this.selected.from)
            this.element.querySelector('span[data-element="to"]').textContent = this.formatValue(this.selected.to)
        }
    }
    mouseMoveHandler(e){
        if(this.thumb.classList.contains('range-slider__thumb-left')){
            this.countLeft = true;
            if(e.clientX < this.element.querySelector('.range-slider__inner').getBoundingClientRect().left){
                this.thumb.style.left = '0%'
            }
            else{
                this.thumb.style.left = Math.round((Math.abs(e.clientX - this.startXLeft) / this.rangeSlider) * 100) + '%'
            }
            if(this.thumb.style.left.substring(0, this.thumb.style.left.length - 1) > (100 - this.thumb.nextElementSibling.style.right.substring(0, this.thumb.nextElementSibling.style.right.length - 1))){
                this.thumb.style.left = 100 - this.thumb.nextElementSibling.style.right.substring(0, this.thumb.nextElementSibling.style.right.length - 1) + '%'
            }
            this.sliderProgress.style.left = this.thumb.style.left
            document.querySelector('span[data-element="from"]').textContent = this.formatValue(this.min + (this.delta * this.thumb.style.left.substring(0, this.thumb.style.left.length - 1)/100))
        }

        if(this.thumb.classList.contains('range-slider__thumb-right')){
            this.countRight = true;
            if(e.clientX > this.element.querySelector('.range-slider__inner').getBoundingClientRect().right){
                this.thumb.style.right = '0%'
            }
            else{
                this.thumb.style.right = Math.round((Math.abs(e.clientX - this.startXRight) / this.rangeSlider) * 100) + '%'
            }
            if(this.thumb.previousElementSibling.style.left.substring(0, this.thumb.previousElementSibling.style.left.length - 1) > (100 - this.thumb.style.right.substring(0, this.thumb.style.right.length - 1))){
                this.thumb.style.right = 100 - this.thumb.previousElementSibling.style.left.substring(0, this.thumb.previousElementSibling.style.left.length - 1) + '%'
            }
            this.sliderProgress.style.right = this.thumb.style.right
            document.querySelector('span[data-element="to"]').textContent = this.formatValue(this.max - (this.delta * this.thumb.style.right.substring(0, this.thumb.style.right.length - 1)/100))
        }

        if((this.sliderProgress.style.left.substring(0, this.sliderProgress.style.left.length - 1) == DoubleSlider.leftRange - 1) || ((100 - this.sliderProgress.style.right.substring(0, this.sliderProgress.style.right.length - 1)) == DoubleSlider.rightRange + 1)){
            DoubleSlider.countMeetSlider = true
        }
        
        if((this.sliderProgress.style.left.substring(0, this.sliderProgress.style.left.length - 1)) == (100 - this.sliderProgress.style.right.substring(0, this.sliderProgress.style.right.length - 1))){
            if(DoubleSlider.countMeetSlider){
                DoubleSlider.leftRange = this.sliderProgress.style.left.substring(0, this.sliderProgress.style.left.length - 1)
                DoubleSlider.rightRange = 100 - this.sliderProgress.style.right.substring(0, this.sliderProgress.style.right.length - 1)
                document.removeEventListener("pointermove", this.mouseMoveHandler);
                document.removeEventListener("pointerup", this.mouseUpHandler);
            }
            DoubleSlider.countMeetSlider = false
        }
    }
    testFunc(){
        const leftSlider = this.element.querySelector('.range-slider__thumb-left');
        const leftBoundary = this.element.querySelector('span[data-element="from"]');
    
        const down = new MouseEvent('pointerdown', {
          bubbles: true
        });
    
        const move = new MouseEvent('pointermove', {
          clientX: 0,
          bubbles: true
        });
    
        leftSlider.dispatchEvent(down);
        leftSlider.dispatchEvent(move);
        console.log(leftBoundary)
    }
    mouseUpHandler(){
        document.removeEventListener("pointermove", this.mouseMoveHandler);
        document.removeEventListener("pointerup", this.mouseUpHandler);
    }

    createEventListener() {
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        document.addEventListener("pointerdown", this.mouseDownHandler);
    }

    destroyListeners() {
        document.removeEventListener("mousedown", this.pointerOverHandler);
        document.removeEventListener("pointermove", this.pointerMoveHandler);
        document.removeEventListener("pointerup", this.pointerOutHandler);
    }

    remove() {
        if (this.element) {
          this.element.remove();
        }
    }

    destroy(){
        this.destroyListeners()
        this.remove()
      }

}
