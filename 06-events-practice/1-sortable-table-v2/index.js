import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";
export default class SortableTableV2 extends SortableTableV1 {
  isSortLocally = true;
  sortField;
  sortOrder;

  constructor(headersConfig, { data = [], sorted = {} } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.createEventListeners();
    this.addSorteElement()
  }
  createElement(template) {
    const element = document.createElement("span");
    element.innerHTML = template;
    return element.firstElementChild;
  }
  addSorteElement(){
    this.addSortElement = this.subElements.header.querySelector("[data-id='title']")
    this.addSortElement.append(this.createElement(`<span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>`))
  }
  sortOnClient() {
    super.sort(this.sortField, this.sortOrder);
  }

  sortOnServer() {}

  sort() {
    if (this.isSortLocally) {
      this.sortOnClient();
    } else {
      this.sortOnServer();
    }
  }

  handleHeaderPointerDown(event) {
    const currentColumn = event.target.closest('[data-sortable="true"]');
    if (!currentColumn) {
      return;
    }

    this.sortField = currentColumn.dataset.id;
    this.sortOrder = currentColumn.dataset.order === "desc" ? "asc" : "desc";
    currentColumn.dataset.order = this.sortOrder;

    this.sort();
  }

  createEventListeners() {
    this.handleHeaderPointerDown = this.handleHeaderPointerDown.bind(this);
    this.subElements.header.addEventListener(
      "pointerdown",
      this.handleHeaderPointerDown
    );
  }

  destroyEventListeners() {
    this.subElements.header.removeEventListener(
      "pointerdown",
      this.handleHeaderPointerDown
    );
  }

  destroy() {
    super.destroy();
    this.destroyEventListeners();
  }
}