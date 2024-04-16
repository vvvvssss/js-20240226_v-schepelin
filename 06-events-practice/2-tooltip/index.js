class Tooltip {
  static instance
  element
  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    Tooltip.instance = this;
  }

  initialize() {
    this.createEventListener()
  }

  render(text){   
    this.element = this.createTooltipElement(`<div class="tooltip">${text}</div>`)
    document.body.append(this.element);
  };

  createTooltipElement(template) {
    const div = document.createElement("div");
    div.innerHTML = template;
    return div.firstElementChild;
  }

  pointerOverHandler(e){
    if(!e.target.dataset.tooltip) return;
    this.render(e.target.dataset.tooltip)
  }

  pointerMoveHandler(e){
    if(!e.target.dataset.tooltip) return;
    this.element.style.left = e.clientX + 10 + "px";
    this.element.style.top = e.clientY + 10 + "px";
  }

  pointerOutHandler(){
    this.remove()
  }

  createEventListener() {
    this.pointerOverHandler = this.pointerOverHandler.bind(this);
    this.pointerMoveHandler = this.pointerMoveHandler.bind(this);
    this.pointerOutHandler = this.pointerOutHandler.bind(this);
    document.addEventListener("pointerover", this.pointerOverHandler);
    document.addEventListener("pointermove", this.pointerMoveHandler);
    document.addEventListener("pointerout", this.pointerOutHandler);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroyListeners() {
    document.removeEventListener("pointerover", this.pointerOverHandler);
    document.removeEventListener("pointermove", this.pointerMoveHandler);
    document.removeEventListener("pointerout", this.pointerOutHandler);
  }

  destroy(){
    this.remove()
    this.destroyListeners()
  }
}

export default Tooltip;
