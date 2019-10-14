class FSM {

    constructor(config) {
        this.config = config;
        this.currentState = this.config.initial;
    }

    getState() {
        return this.currentState;
    }

    changeState(state) {
        if (this.config.states[state] == undefined) {
            throw new Error('hmmm... exception?');
        }
        this.currentState = state;
    }

    trigger(event) {
        if (this.config.states[this.currentState].transitions[event] == undefined) {
            throw new Error('hmmm... exception?');
        }
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

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
