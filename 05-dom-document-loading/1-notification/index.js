export default class NotificationMessage {
    element;
    static lastInstance;

    constructor(text = '',{duration = 1000, type = 'success'} = {}) {
        this.text = text;
        this.duration = duration;
        this.type = type;
        this.element = this.createElement(this.createTemplate());
    }

    show(container = document.body){
        if(NotificationMessage.lastInstance){
            NotificationMessage.lastInstance.destroy()
        }
        NotificationMessage.lastInstance = this
        container.append(this.element);
        this.timerId = setTimeout(() => {
            this.remove()
        }, `${this.duration}`)
    }

    destroy(){
        clearTimeout(this.timerId);
        this.element.remove();
    }
    remove(){
        this.element.remove();
    }
    createTemplate(){
        return `
        <div class="notification ${this.type}" style="--value:${this.duration/1000}s">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">success</div>
                <div class="notification-body">
                    ${this.text}
                </div>
            </div>
        </div>`
    }
    createElement(template) {
        const element = document.createElement('div');
    
        element.innerHTML = template;
    
        return element.firstElementChild;
    }
}
