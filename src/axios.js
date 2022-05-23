import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/posts'

//Get
axios.get(url).then((res) => {
  console.log(res)
}).catch((error) => {
  console.error(error)
})

// Same to .post .put and etc...

// Alternative syntax
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

//Config
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});


//axios
const urlAxios = 'https://jsonplaceholder.typicode.com/posts'
const data = {
  a: 10,
  b: 20,
};
axios
  .post(urlAxios, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
  .then(({data}) => {
    console.log(data);
  });

// fetch
const urlFetch = "https://jsonplaceholder.typicode.com/todos";
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({
    a: 10,
    b: 20,
  }),
};
fetch(urlFetch, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

//abort example
//axios
axios({
  method: 'post',
  url: '/login',
  timeout: 4000,    // 4 seconds timeout
  data: {
    firstName: 'David',
    lastName: 'Pollock'
  }
})
  .then(response => {/* handle the response */})
  .catch(error => console.error('timeout exceeded'))

//fetch
const controller = new AbortController();
const optionsFetch = {
  method: 'POST',
  signal: controller.signal,
  body: JSON.stringify({
    firstName: 'David',
    lastName: 'Pollock'
  })
};
const promise = fetch('/login', optionsFetch);
const timeoutId = setTimeout(() => controller.abort(), 4000);

promise
  .then(response => {/* handle the response */})
  .catch(error => console.error('timeout exceeded'));

// Axios automatically .json() our data