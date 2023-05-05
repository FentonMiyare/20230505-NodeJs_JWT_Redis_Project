const API_URL = "/api/v1/auth/";
// "http://localhost:8080"
const messageText = document.querySelector('.message p');
const message = document.querySelector('.message');
const fields = ["username", "email", "password", "confirmPassword"];


class AuthService {
  login(username, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: username,
        password: password
      }),
    }

    // function showNotification(err) {
    //   message.classList.add('show');
    //   messageText.textContent = err;
    //   setTimeout(() => {
    //     message.classList.remove('show');
    //   }, 4000);
    // }

    async function signAsyncFetch(url, init) {
      try {
        let res = await fetch(url, init);
        const user = await res.json();
        console.log(user)
        if (!res.ok) {
          // throw new Error(user.message)
          alert(user.message)
        }
        if (user) {
          // window.localStorage.setItem("user", JSON.stringify(data.data));
          location.assign("/")
          console.log(user.data.user)
        }
      } catch(err) {
        alert(err.message)
        // showNotification(err.message)
      }





        // const json = await res.json()
      //   console.log("RES==", res)

      //   let text = await res.text()
      //   let resBody = JSON.parse(text)
      //   console.log("TEXT", text)

      //   if(!res.ok) {
      //     console.log(resBody.message)
      //     throw new Error(resBody.message)
      //   }

      //   console.log("DATA==", resBody.data)
      //   if (resBody.data.accessToken) {
      //     window.localStorage.setItem("user", JSON.stringify(resBody.data));
      //   }
      // } catch (error) {
      //   console.log(error)
      //   showNotification(error.message)
      // }
    }

    signAsyncFetch(`${API_URL}login`, requestOptions)
 }
  
  logout() {
    window.localStorage.removeItem("user");
  }
  
  register(username, email, password, confirmPassword) {
    console.log(username, email, password, confirmPassword)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username,
        email,
        password,
        confirmPassword
      }),
    }

    // function showNotification(err) {
    //   message.classList.add('show');
    //   messageText.textContent = err;
    //   setTimeout(() => {
    //     message.classList.remove('show');
    //   }, 4000);
    // }

    async function regAsyncFetch(url, init) {
      try {
        let res = await fetch(url, init);
        const user = await res.json()
        console.log(user)
        if(!res.ok) {
          alert(user.message)
          // throw new Error(user.user.message)
          return
        }

        // if (data.data.user) {
          location.assign("/login")
        // }
        // let text = await res.text()
        // let resBody = JSON.parse(text)
        // console.log("TEXT", text)
      } catch (error) {
        alert(error)
        // showNotification(error.message)
      }
    }

    regAsyncFetch(`${API_URL}signup`, requestOptions)
    
    // fetch(`${API_URL}signup`, requestOptions)
    //   .then((response) => {
    //     // console.log(response)
    //     if (response.ok || response.status === 200 || response.status === 201) {
    //       // message.style.opacity = "1"
    //       // messageText.textContent = "Message sent!";
    //       alert("Successfully signed up!");
    //       return response.json()
    //     }

    //     return response.text()
    //       .then(text => { 
    //         let err = JSON.parse(text)
    //         console.log(err)
    //         // throw new Error(err.message) 
    //       })
    //   })
    //   .then((data) => {
    //       console.log("Data is ", data)
    //   })
    //   .catch(error => {
    //     console.log("Error is", error)
    //     message.style.opacity = "1"
    //     messageText.textContent = error
    //   })
  }
  
  getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('user'));;
  }

  // customFetcher = async () => {
  //   function getCookie(name) {
  //     let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  //     return matches ? decodeURIComponent(matches[1]) : undefined;
  //   }

  //   async function postRefreshToken(token) {
  //     getCookie("refreshToken") = token
  //     let res = await fetch("/api/auth/refreshToken", {
  //       method: 'POST',
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ 'refreshToken': token.token})
  //     })

  //     let data = res.json()
  //     return JSON.stringify(data)
  //   }

  //   function setCookie(name, value, options = {}) {
  //     options = {
  //       path: '/',
  //       ...options
  //     };

  //     if(options.expires instanceof Date) {
  //       options.expires = options.expires.toUTCString();
  //     }

  //     let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  //     for(let optionKey in options) {
  //       updatedCookie += "; " + optionKey;
  //       let optionValue = options[optionKey];
  //       if(optionValue !== true) {
  //         updatedCookie += "=" + optionValue;
  //       }
  //     }

  //     console.log("UpdatedCookie:", updatedCookie)
  //     document.cookie = updatedCookie;
  //   }

  //   let { name } = await postRefreshToken(refreshTokenName)
  //   setCookie('refreshToken', `${name}`, {secure: true, 'max-age': 7 * 24 * 60 * 60 * 1000})
  // }
}

export default new AuthService();
