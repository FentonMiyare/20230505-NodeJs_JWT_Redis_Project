import authHeader from './auth-header';

const API_URL = '/api/v1/';


class UserService {
  getPublicContent() {
    fetch(API_URL + 'test/all')
    .then(response => response.json()) // one extra step
    .then(data => {
      console.log(data)
    })
    .catch(error => console.error(error));
  }
  
  getUserBoard() {
    fetch(API_URL + 'user', { headers: authHeader() })
    .then(response => response.json()) // one extra step
    .then(data => {
      console.log(data)
    })
    .catch(error => console.error(error));
  }
  
  getWriterBoard() {
    fetch(API_URL + 'writer', { headers: authHeader() })
    .then(response => response.json()) // one extra step
    .then(data => {
      console.log(data)
    })
    .catch(error => console.error(error));
  }

  getAdminBoard() {
    fetch(API_URL + 'admin', { headers: authHeader() })
    .then(response => response.json()) // one extra step
    .then(data => {
        console.log(data)
    })
    .catch(error => console.error(error));
  }
}

export default new UserService();

