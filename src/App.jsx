import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'
import {useState} from "react";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [showStarred, setShowStarred] = useState(false);

  const toggleRead = (id) => {
    const updatedEmails = emails.map(email => {
      if (email.id === id) {
        return { ...email, read: !email.read };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  const toggleStarred = (id) => {
    const updatedEmails = emails.map(email => {
      if (email.id === id) {
        return { ...email, starred: !email.starred };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  const filteredEmails = emails.filter(email => {
    if (hideRead && !email.read) {
      return false;
    }
    return !(showStarred && !email.starred);
    
  });

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">
              {emails.filter((email) => !email.read).length}
            </span>
          </li>
          <li className="item">
            <span className="label">Starred</span>
            <input
                id="hide-read"
                type="checkbox"
                checked={showStarred}
                onChange={() => setShowStarred(!showStarred)}
            />
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
                id="hide-read"
                type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {filteredEmails.map((email) => {
          return (
              <li key={email.id} className='email' style={{ background: email.read ? 'lightgray' : 'white' }}>
                <div className='select'>
                  <input className="select-checkbox" type="checkbox" checked={!email.read} onClick={() => toggleRead(email.id)} />
                </div>
                <div className="star">
                  <input className="star-checkbox" type="checkbox" checked={email.starred} onClick={() => toggleStarred(email.id)} />
                </div>
                <div className="sender" style={{ fontWeight: email.read ? 'bold' : 'normal' }}>{email.sender}</div>
                <div className="title" style={{ fontWeight: email.read ? 'bold' : 'normal' }}>{email.title}</div>
              </li>
          )
        })}
      </main>
    </div>
  )
}

export default App
