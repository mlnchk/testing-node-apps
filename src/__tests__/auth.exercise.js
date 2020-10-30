// Testing Authentication API Routes

// 🐨 тут импортируем все, что нужно для теста
// 💰 для удобства я все подготовил, просто расскоментируй :)
// import axios from 'axios'
// import {resetDb} from 'utils/db-utils'
// import * as generate from 'utils/generate'
// import startServer from '../start'

// 🐨 перед началом тестов сервер надо запускать, а в конце — закрывать. beforeAll/afterAll в помощь
// 💰 сервер запускается так: server = await startServer({port: 8000})

// 🐨 beforeEach test in this file we want to reset the database
// 🐨 перед каждым тест-кейсом (beforeEach) надо сбрасывать базу данных функцией resetDb()

test('auth flow', async () => {
  // 🐨 достань константы username и password из generate.loginForm()
  //
  // register
  // 🐨 используй await axios.post(url, body) чтобы отправить username и password на сервер по адресу регистрации
  // 💰 http://localhost:8000/api/auth/register
  //
  // 🐨 проверь, правильные ли ты получил результаты (они будут в res.data.user)
  // 💰 it'll have an id and a token that will be random every time.
  // 💰 в каждом ответе будут случайные id и token
  //    Достаточно просто проверить, что `result.data.user.username` правильный,
  //    а для доп. задания 💯 можно попробовать `expect.any(String)` для остальных полей
  // 📜 https://jestjs.io/docs/en/expect#expectanyconstructor
  // 📜 https://jestjs.io/docs/en/expect#toequalvalue
  //
  // login
  // 🐨 используй await axios.post(url, body) чтобы отправить username и password на сервер по адресу логина
  // 💰 http://localhost:8000/api/auth/login
  //
  // 🐨 проверь, правильные ли ты получил результаты (они будут в res.data.user)
  // 💰 данные вернутся такие же, которые ты отправил на регистрации
  //
  // authenticated request
  // 🐨 используй await axios.get(url, config) xnj, чтобы получить информацию о пользователе
  // 💰 http://localhost:8000/api/auth/me
  // 💰 Запрос должен содержать Authorization header котрый можно добавить в config:
  //    {headers: {Authorization: `Bearer ${token}`}}
  //    Токен ты получил в обоих прошлых запросах
  //
  // 🐨 проверь, правильные ли ты получил результаты (они будут в res.data.user)
  // 💰 (и снова, данные вернутся такие же, которые ты отправил на регистрации)
})
