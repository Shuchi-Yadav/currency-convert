
// https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

import {useState, useEffect} from 'react';

function App() {

  const [amount, setAmount] = useState(1);
  const [fromCur, setfromCur] = useState("EUR");
  const [toCur, settoCur] = useState("USD");
  const [converted, setConverted] = useState("")
  const [isloading, setIsLoading] =useState(false)

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const response = await fetch(`
          https://api.frankfurther.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`);

        const data = await response.json();
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      }

      if (fromCur === toCur) return setConverted(amount);
      convert();
    },
    [amount, fromCur, toCur]
  );
  return (
    <div className="App">
        <input type='text' value={amount} onChange={(e) => setAmount(Number(e.target.value))}
         disabled={isloading} />

        <select value={fromCur} onChange={(e) => setfromCur(e.target.value)} disabled={isloading}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
        </select> 

        <select value={toCur} onChange={(e) => settoCur(e.target.value)} disabled={isloading}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>

        <p>
          {converted} {toCur}
        </p>

    </div>
  );
}

export default App;
