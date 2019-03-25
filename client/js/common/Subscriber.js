export class Subscriber{

    constructor(context) {
        this.sender = context;
        this.subscribers = [];
    }

    attach(listener) {
        this.subscribers.push(listener);
    }

    notify(...args) {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i](this.sender, ...args);
        }
    }
}