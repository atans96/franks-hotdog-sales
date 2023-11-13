import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BeatLoader from 'react-spinners/BeatLoader';
import { toast, ToastContainer } from 'react-toastify'; // Import the toast function and ToastContainer component
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

function CashierApp() {
  const [hotdog, setHotdog] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [baseSauce, setBaseSauce] = useState({
    bolognese: false,
    blackpepper: false,
  });
  const [item, setItem] = useState('hotdog');
  const [topping, setTopping] = useState({
    mustard: false,
    chili: false,
    mayonnaise: false,
  });
  const [toppingFrenchFries, setToppingFrenchFries] = useState({
    keju: false,
    bbq: false,
    balado: false,
    jagungBakar: false,
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleHotdogChange = event => {
    setHotdog(event.target.value);
  };

  const handleGenderChange = event => {
    setGender(event.target.value);
  };

  const handleBaseSauceChange = event => {
    setBaseSauce({ ...baseSauce, [event.target.value]: event.target.checked });
  };

  const handleToppingChange = event => {
    setTopping({ ...topping, [event.target.value]: event.target.checked });
  };

  const handleToppingFrenchFries = event => {
    setToppingFrenchFries({
      ...toppingFrenchFries,
      [event.target.value]: event.target.checked,
    });
  };

  const submitHandler = event => {
    event.preventDefault();
    if (item === 'hotdog') {
      if (!hotdog) {
        toast.error('Please select a hotdog type.');
        return;
      }
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }
    setIsLoading(true);
    axios
      .post(
        'https://sheet.best/api/sheets/dc0d2a1c-6848-4d63-840b-5abb7024d876',
        {
          date: new Date().toLocaleString(),
          type: item,
          hotdogType: hotdog,
          baseSauce: JSON.stringify(baseSauce),
          toppingSauce: JSON.stringify(topping),
          toppingFrenchFries: JSON.stringify(toppingFrenchFries),
          gender,
          paymentMethod,
        },
      )
      .then(response => {
        setIsLoading(false);
        console.log(response);
        // Show a toast notification instead of an alert
        toast.success('Order has been added successfully');
        // Clear the form fields
        setHotdog('');
        setPaymentMethod('');
        setGender('');
        setBaseSauce({
          bolognese: false,
          blackpepper: false,
        });
        setTopping({
          mustard: false,
          chili: false,
          mayonnaise: false,
        });
        setToppingFrenchFries({
          keju: false,
          bbq: false,
          balado: false,
          jagungBakar: false,
        });
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
        toast.error('Something went wrong. Please try again.'); // Show an error toast
      });
  };

  useEffect(() => {
    setHotdog('');
    setPaymentMethod('');
    setGender('');
    setBaseSauce({
      bolognese: false,
      blackpepper: false,
    });
    setTopping({
      mustard: false,
      chili: false,
      mayonnaise: false,
    });
    setToppingFrenchFries({
      keju: false,
      bbq: false,
      balado: false,
      jagungBakar: false,
    });
  }, [item]);

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>Franks Hotdog Cashier</h1>
      <div
        className="overlay"
        style={{ display: isLoading ? 'block' : 'none' }}
      />
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>Item</legend>
          <input
            type="radio"
            id="hotdog"
            name="item"
            value="hotdog"
            onChange={e => setItem(e.target.value)}
            checked={item === 'hotdog'}
          />
          <label htmlFor="hotdog">Hotdog</label>
          <br />
          <input
            type="radio"
            id="frenchFries"
            name="item"
            value="frenchFries"
            onChange={e => setItem(e.target.value)}
            checked={item === 'frenchFries'}
          />
          <label htmlFor="frenchFries">French Fries</label>
          <br />
        </fieldset>
        {item === 'frenchFries' && (
          <>
            <fieldset>
              <legend>Toppings</legend>
              <input
                type="checkbox"
                id="keju"
                name="keju"
                value="keju"
                onChange={handleToppingFrenchFries}
              />
              <label htmlFor="keju">Keju</label>
              <br />
              <input
                type="checkbox"
                id="bbq"
                name="bbq"
                value="bbq"
                onChange={handleToppingFrenchFries}
              />
              <label htmlFor="bbq">BBQ</label>
              <br />
              <input
                type="checkbox"
                id="balado"
                name="balado"
                value="balado"
                onChange={handleToppingFrenchFries}
              />
              <label htmlFor="balado">Balado</label>
              <br />
              <input
                type="checkbox"
                id="jagungBakar"
                name="jagungBakar"
                value="jagungBakar"
                onChange={handleToppingFrenchFries}
              />
              <label htmlFor="jagungBakar">Jagung Bakar</label>
              <br />
            </fieldset>
          </>
        )}
        {item === 'hotdog' && (
          <>
            <fieldset>
              <legend>Hotdog Type</legend>
              <label>
                <input
                  type="radio"
                  name="hotdogType"
                  value="Original"
                  checked={hotdog === 'Original'}
                  onChange={handleHotdogChange}
                  required
                  onInvalid={event =>
                    event.target.setCustomValidity(
                      'Please select a hotdog type.',
                    )
                  }
                  onInput={event => event.target.setCustomValidity('')}
                />
                Original
              </label>
              <label>
                <input
                  type="radio"
                  name="hotdogType"
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
                  name="baseSauce"
                  checked={baseSauce.bolognese}
                  onChange={handleBaseSauceChange}
                />
                Bolognese
              </label>
              <label>
                <input
                  type="checkbox"
                  value="blackpepper"
                  name="baseSauce"
                  checked={baseSauce.blackpepper}
                  onChange={handleBaseSauceChange}
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
          </>
        )}
        <fieldset>
          <legend>Gender</legend>
          <select
            value={gender}
            onChange={handleGenderChange}
            required
            onInvalid={event =>
              event.target.setCustomValidity('Please select the gender.')
            }
            onInput={event => event.target.setCustomValidity('')}
          >
            <option value="">Select...</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Payment Method</legend>
          <input
            type="radio"
            id="cash"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={e => setPaymentMethod(e.target.value)}
            required
          />
          <label htmlFor="cash">Cash</label>
          <br />
          <input
            type="radio"
            id="qr"
            name="paymentMethod"
            value="qr"
            checked={paymentMethod === 'qr'}
            onChange={e => setPaymentMethod(e.target.value)}
            required
          />
          <label htmlFor="qr">QR</label>
          <br />
          <input
            type="radio"
            id="grab"
            name="paymentMethod"
            value="grab"
            checked={paymentMethod === 'grab'}
            onChange={e => setPaymentMethod(e.target.value)}
            required
          />
          <label htmlFor="grab">Grab</label>
          <br />
          <input
            type="radio"
            id="gojek"
            name="paymentMethod"
            value="gojek"
            checked={paymentMethod === 'gojek'}
            onChange={e => setPaymentMethod(e.target.value)}
            required
          />
          <label htmlFor="gojek">Gojek</label>
          <br />
        </fieldset>
        <button
          disabled={isLoading}
          type="submit"
          style={{
            width: '100%',
            height: 'auto',
            marginTop: '1rem',
            padding: '10px', // Add some padding
            fontSize: '16px', // Set a font size
            backgroundColor: '#007BFF', // Set a background color
            color: 'white', // Set the text color
            border: 'none', // Remove the border
            borderRadius: '4px', // Add some border radius
            cursor: 'pointer', // Change cursor to pointer when hovering over the button
          }}
        >
          {isLoading ? (
            <BeatLoader color={'#ffffff'} loading={isLoading} size={10} />
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
}

export default CashierApp;
