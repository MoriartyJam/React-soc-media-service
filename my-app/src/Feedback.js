import React, { Component } from 'react';


class Feedback extends Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0,


    };

    handleFeedback = (type) => {
        this.setState((prevState) =>   ({
            [type]: prevState[type] + 1,

        }));     
    };

    render () {
        const { good, neutral, bad} = this.state;

        return (
            <div>
                <h2>Please leave Feedback</h2>
                <button onClick={() => this.handleFeedback('good')}>Good</button>
                <button onClick={() => this.handleFeedback('neutral')}>Neutral</button>
                <button onClick={() => this.handleFeedback('bad')}>Bad</button>
            

            <h3>Statistics</h3>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>

            </div>

            
            ) 


        
        }

        
}

export default Feedback;