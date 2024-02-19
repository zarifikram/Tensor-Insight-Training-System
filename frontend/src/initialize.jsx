import axios from 'axios';
import Cookies from 'js-cookie';

const setCSRFToken = () => {
   // const csrf_token = Cookies.get('csrf');
    //if (csrf_token){

        axios.get('http://127.0.0.1:8000/api/get-csrftoken/')
        .then(response => {
        const csrfToken = response.data.csrftoken;
        console.log(csrfToken);
        axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
        Cookies.set('csrf', csrfToken, { expires: 7 });
    
        })
        .catch(error => {
        console.error('Error fetching CSRF token:', error);
        });

       // }
    
  };

  export default setCSRFToken;