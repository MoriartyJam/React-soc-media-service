import React, { Component } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import Notification from './Notification'
import { nanoid } from 'nanoid';


class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0, 
    contacts: [],
    filter: '',
    contactName: '', 
    contactPhone: ''

  };

handleFeedback = (type) => {
  this.setState((prevState) => ({
    [type]: prevState[type] + 1,
  }));
};

countTotalFeedback = () => {
  const {good, neutral, bad} = this.state;
  return good + neutral + bad;
}

countPositiveFeedbackPercentage = () => {
  const total = this.countTotalFeedback();
  const { good } = this.state;
  return total ? Math.round((good / total) * 100) : 0;
}

handleChange = (event) => {
  const { name, value } = event.target;
  this.setState ({ [name]: value })
}

handleSubmit = (event) => {
  event.preventDefault();
  const {contactName, contacts, contactPhone} = this.state;

  if (contactName.trim() === '' || contactPhone.trim === '') {
    return;
  }
  
  const newContact = {
    id: nanoid(),
    name: contactName.trim(),
    phone: contactPhone.trim()
    
  };

  this.setState((prevState) => ({
    contacts: [...prevState.contacts, newContact],
    contactName:'',
    contactPhone:''

  }));
}

getFilteredContacts = () => {
  const { contacts, filter } = this.state;
  const normalizedFilter = filter.toLocaleLowerCase()

  return contacts.filter (contact =>
    contact.name.toLocaleLowerCase().includes(normalizedFilter)
  );
};

render() {
  const { good, neutral, bad, contacts, contactName, contactPhone, filter} = this.state;
  const total = this.countTotalFeedback();
  const positivePercentage = this.countPositiveFeedbackPercentage();
  const filteredContacts = this.getFilteredContacts();


  return (
    <div>
      <Section title="Please leave feedbck">
        <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={this.handleFeedback}
        />
      </Section>

      <Section title="Statistics">
      { total > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
      /> ): (
        <Notification message = "There is no feedback" />       )}
      </Section>
      <Section title="Add a contact">
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='contactName'
              value={contactName}
              onChange={this.handleChange}
              placeholder='Enter Name'
              required
            />
            <input
              type='tel'
              name='contactPhone'
              value={contactPhone}
              onChange={this.handleChange}
              placeholder='Enter phone'
              required
            />
            <button type='submit'>Add Contact</button>
          </form>

          <input
            type="text"
            name="filter"
            value={filter} 
            onChange={this.handleChange}
            placeholder='Search contacts'
            />
          <h2>Contacts</h2>
            <ul>
              {filteredContacts.map((contact) => (
                <li key={contact.id}>
                  {contact.name}: {contact.phone}
                  
                </li>

              ))}
            </ul>


      </Section>
    </div>
   );
  }
}

export default App;