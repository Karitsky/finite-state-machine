class FSM {

    constructor(config) {
        this.config = config;
        this.currentState = this.config.initial;
        this.history = [false];
        this.backToFuture = [false];
    }

    getState() {
        return this.currentState;
    }

    changeState(state) {
        if (this.config.states[state] == undefined) {
            throw new Error('hmmm... exception?');
        }
        this.history.push(this.currentState);
        this.backToFuture = [false];
        this.currentState = state;
    }

    trigger(event) {
        if (this.config.states[this.currentState].transitions[event] == undefined) {
            throw new Error('hmmm... exception?');
        }
        this.history.push(this.currentState);
        this.backToFuture = [false];
        this.currentState = this.config.states[this.currentState].transitions[event];
    }

    reset() {
        this.currentState = this.config.initial
    }

    getStates(event) {
        let arrayOfStates = [];
        if (event == undefined) {
            arrayOfStates = Object.keys(this.config.states);
        } else {
            let allStates = Object.keys(this.config.states);
            for (let i = 0; i < allStates.length; i++) {
                if (event in this.config.states[allStates[i]].transitions) {
                    arrayOfStates.push(allStates[i]);
                }
            }
        }
        return arrayOfStates;
    }

    undo() {
        if (this.history[this.history.length - 1] != false) {
            this.backToFuture.push(this.currentState);
            this.currentState = this.history.pop();
            return true;
        } else {
            return false;
        }
    }

    redo() {
        if (this.backToFuture[this.backToFuture.length - 1] != false) {
            this.history.push(this.currentState);
            this.currentState = this.backToFuture.pop();
            return true;
        } else {
            return false;
        }
    }

    clearHistory() {
        this.history = [false];
        this.backToFuture = [false];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
