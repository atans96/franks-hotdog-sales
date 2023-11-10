import React, { useState } from 'react';
import axios from 'axios';
function CashierApp() {
  const [hotdog, setHotdog] = useState('');
  const [gender, setGender] = useState('');
  const [sauce, setSauce] = useState({
    bolognese: false,
    blackpepper: false,
  });
  const [topping, setTopping] = useState({
    mustard: false,
    chili: false,
    mayonnaise: false,
  });

  const handleHotdogChange = (event) => {
    setHotdog(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSauceChange = (event) => {
    setSauce({ ...sauce, [event.target.value]: event.target.checked });
  };

  const handleToppingChange = (event) => {
    setTopping({ ...topping, [event.target.value]: event.target.checked });
  };

  const submitHandler = (event) => {
  event.preventDefault();
    axios.post("https://sheet.best/api/sheets/dc0d2a1c-6848-4d63-840b-5abb7024d876", {
    date: new Date().toLocaleString(),
    type: hotdog,
    baseSauce: JSON.stringify(sauce),
      toppingSauce: JSON.stringify(topping),
    gender
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
};

  return (
    <div>
      <h1>Frank's Cashier</h1>
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>Hotdog Type</legend>
          <label>
            <input
              type="radio"
              value="Original"
              checked={hotdog === 'Original'}
              onChange={handleHotdogChange}
            />
            Original
          </label>
          <label>
            <input
              type="radio"
              value="Mozzarella"
              checked={hotdog === 'Mozzarella'}
              onChange={handleHotdogChange}
            />
            Mozzarella
          </label>
        </fieldset>

        <fieldset>
          <legend>Sauce Options</legend>
          <label>
            <input
              type="checkbox"
              value="bolognese"
              checked={sauce.bolognese}
              onChange={handleSauceChange}
            />
            Bolognese
          </label>
          <label>
            <input
              type="checkbox"
              value="blackpepper"
              checked={sauce.blackpepper}
              onChange={handleSauceChange}
            />
            Blackpepper
          </label>
        </fieldset>

        <fieldset>
          <legend>Topping Options</legend>
          <label>
            <input
              type="checkbox"
              value="mustard"
              checked={topping.mustard}
              onChange={handleToppingChange}
            />
            Mustard
          </label>
          <label>
            <input
              type="checkbox"
              value="chili"
              checked={topping.chili}
              onChange={handleToppingChange}
            />
            Chili
          </label>
          <label>
            <input
              type="checkbox"
              value="mayonnaise"
              checked={topping.mayonnaise}
              onChange={handleToppingChange}
            />
            Mayonnaise
          </label>
        </fieldset>
        <fieldset>
          <legend>Gender</legend>
          <select value={gender} onChange={handleGenderChange}>
            <option value="">Select...</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </fieldset>
        <button type="submit" style={{
          width: "100%",
          height: "auto",
          marginTop: "1rem",
          padding: '10px', // Add some padding
          fontSize: '16px', // Set a font size
          backgroundColor: '#007BFF', // Set a background color
          color: 'white', // Set the text color
          border: 'none', // Remove the border
          borderRadius: '4px', // Add some border radius
          cursor: 'pointer', // Change cursor to pointer when hovering over the button
        }}>Submit</button>
      </form>
    </div>
  );
}

export default CashierApp;