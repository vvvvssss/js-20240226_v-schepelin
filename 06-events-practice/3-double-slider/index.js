export default class DoubleSlider { 
    element;
    min;
    max;
    static  leftRange = 0;
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
                    <span data-element = "from"></span>
                    <div class="range-slider__inner">
                        <span class="range-slider__progress"></span>
                        <span class="range-slider__thumb-left"></span>
                        <span class="range-slider__thumb-right"></span>
                    </div>
                    <span data-element = "to"></span>
                </div>`
    }

    mouseDownHandler(e){
        if(e.target.classList.contains('range-slider__thumb-left') || e.target.classList.contains('range-slider__thumb-right')){
            this.thumb = e.target;
            this.rangeSlider = this.element.querySelector('.range-slider__inner').getBoundingClientRect().width
                if(!this.countLeft && e.target.classList.contains('range-slider__thumb-left')){
                    this.startXLeft = this.element.querySelector('.range-slider__inner').getBoundingClientRect().left
                } 
                if(!this.countRight && e.target.classList.contains('range-slider__thumb-right')){
                    this.startXRight = this.element.querySelector('.range-slider__inner').getBoundingClientRect().right
                }
            this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
            this.mouseUpHandler = this.mouseUpHandler.bind(this);
            this.element.addEventListener("pointermove", this.mouseMoveHandler);
            this.element.addEventListener("pointerup", this.mouseUpHandler);
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
            if(e.clientX <= this.element.querySelector('.range-slider__inner').getBoundingClientRect().left){
                this.thumb.style.left = '0%'
            }
            else{
                this.thumb.style.left = Math.round((Math.abs(e.clientX - this.startXLeft) / this.rangeSlider) * 100) + '%'
            }
            if(this.thumb.style.left.substring(0, this.thumb.style.left.length - 1) > (100 - this.thumb.nextElementSibling.style.right.substring(0, this.thumb.nextElementSibling.style.right.length - 1))){
                this.thumb.style.left = 100 - this.thumb.nextElementSibling.style.right.substring(0, this.thumb.nextElementSibling.style.right.length - 1) + '%'
            }
            this.sliderProgress.style.left = this.thumb.style.left
            this.element.querySelector('span[data-element="from"]').textContent = this.formatValue(this.min + (this.delta * this.thumb.style.left.substring(0, this.thumb.style.left.length - 1)/100))
            this.selected.from = this.min + (this.delta * this.thumb.style.left.substring(0, this.thumb.style.left.length - 1)/100)
        }

        if(this.thumb.classList.contains('range-slider__thumb-right')){
            this.countRight = true;
            if(e.clientX >= this.element.querySelector('.range-slider__inner').getBoundingClientRect().right){
                this.thumb.style.right = '0%'
            }
            else{
                this.thumb.style.right = Math.round((Math.abs(e.clientX - this.startXRight) / this.rangeSlider) * 100) + '%'
            }
            if(this.thumb.previousElementSibling.style.left.substring(0, this.thumb.previousElementSibling.style.left.length - 1) > (100 - this.thumb.style.right.substring(0, this.thumb.style.right.length - 1))){
                this.thumb.style.right = 100 - this.thumb.previousElementSibling.style.left.substring(0, this.thumb.previousElementSibling.style.left.length - 1) + '%'
            }
            this.sliderProgress.style.right = this.thumb.style.right
            this.element.querySelector('span[data-element="to"]').textContent = this.formatValue(this.max - (this.delta * this.thumb.style.right.substring(0, this.thumb.style.right.length - 1)/100))
            this.selected.to = this.max - (this.delta * this.thumb.style.right.substring(0, this.thumb.style.right.length - 1)/100)
        }

        if((this.sliderProgress.style.left.substring(0, this.sliderProgress.style.left.length - 1) == DoubleSlider.leftRange - 1) || ((100 - this.sliderProgress.style.right.substring(0, this.sliderProgress.style.right.length - 1)) == DoubleSlider.rightRange + 1)){
            DoubleSlider.countMeetSlider = true
        }
        
        if((this.sliderProgress.style.left.substring(0, this.sliderProgress.style.left.length - 1)) == (100 - this.sliderProgress.style.right.substring(0, this.sliderProgress.style.right.length - 1))){
            if(DoubleSlider.countMeetSlider){
                DoubleSlider.leftRange = this.sliderProgress.style.left.substring(0, this.sliderProgress.style.left.length - 1)
                DoubleSlider.rightRange = 100 - this.sliderProgress.style.right.substring(0, this.sliderProgress.style.right.length - 1)
                this.element.removeEventListener("pointermove", this.mouseMoveHandler);
                this.element.removeEventListener("pointerup", this.mouseUpHandler);
            }
            DoubleSlider.countMeetSlider = false
        }
        const event = new CustomEvent("range-select", {
            detail:{
                from: this.selected.from,
                to: this.selected.to
            },
        });

        this.element.dispatchEvent(event);
    }

    mouseUpHandler(){
        this.element.removeEventListener("pointermove", this.mouseMoveHandler);
        this.element.removeEventListener("pointerup", this.mouseUpHandler);
    }

    createEventListener() {
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.element.addEventListener("pointerdown", this.mouseDownHandler);
        
    }

    destroyListeners() {
        this.element.removeEventListener("pointerdown", this.mouseDownHandler);
        this.element.removeEventListener("pointermove", this.mouseMoveHandler);
        this.element.removeEventListener("pointerup", this.mouseUpHandler);
    };

    remove() {
        if(this.element){
            this.element.remove();
        }
    }

    destroy(){
        this.destroyListeners();
        this.remove();
    }

}
