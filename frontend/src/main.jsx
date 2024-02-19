import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import setCSRFToken from './initialize.jsx'

// import Cookies from 'js-cookie'
// import axios from 'axios'

// const csrfToken =  Cookies.get('csrf')
// console.log(csrfToken)
// console.log("b--------------------------")
// if (typeof csrfToken != 'undefined') {
//   axios.defaults.headers.common['X-CSRFToken'] =csrfToken;
//   console.log("cookie was already there");
// } else {
//   console.log("cookie was not there getting cookie");
//   axios.get('http://127.0.0.1:8000/api/get-csrftoken/')
//   .then(response => {
//     console.log("cookie received:"+response.data)
//   const csrfToken = response.data.csrftoken;
//   console.log(csrfToken);
//   axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
//   Cookies.set('csrf', csrfToken, { expires: 7 });
//   })
//   .catch(error => {
//   console.error('Error fetching CSRF token:', error);
//   });
//   console.log("first time entry in the website");
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
