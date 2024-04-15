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
    this.tooltip = document.querySelector("[data-tooltip]");
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
    this.render(e.target.dataset.tooltip)
  }

  pointerMoveHandler(e){
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
    this.tooltip.addEventListener("pointerover", this.pointerOverHandler);
    this.tooltip.addEventListener("pointermove", this.pointerMoveHandler);
    this.tooltip.addEventListener("pointerout", this.pointerOutHandler);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroyListeners() {
    this.tooltip.removeEventListener("pointerover", this.pointerOverHandler);
    this.tooltip.removeEventListener("pointermove", this.pointerMoveHandler);
    this.tooltip.removeEventListener("pointerout", this.pointerOutHandler);
  }

  destroy(){
    this.remove()
    this.destroyListeners()
  }
}

export default Tooltip;
