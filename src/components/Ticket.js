import React, { useState } from 'react';

import '../styles/Form.sass';
import '../styles/Page/Ticket.sass';

const Ticket = ({ totalPrice, tickets, day, repertoire }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggleInfo = () => {
    setToggle((prev) => !prev);
  };

  console.log(totalPrice);
  return (
    <div className="tickets">
      <button
        type="button"
        className="ticket-button"
        onClick={handleToggleInfo}
      >
        {repertoire.movie.title} {day}
      </button>
      {toggle && (
        <div className="my-ticket">
          <ul>
            <li>Cena Łącznie: {totalPrice}zł</li>
            <li>Czas rozpoczęcia filmu: {repertoire.start_time}</li>
            <li>Czas trwania filmu: {repertoire.movie.duration}</li>
            <li>
              Kupione bilety:
              {tickets.map((item) => {
                const { ticket_id, seat } = item;
                return (
                  <div key={ticket_id}>
                    <ul>
                      <li>Numer siedzenia: {seat}</li>
                    </ul>
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Ticket;
