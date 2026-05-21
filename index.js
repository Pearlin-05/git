const http = require('http');
const querystring = require('querystring');

const loginPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Simple Login</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f0f2f5;
    }
    .card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
      width: 320px;
    }
    .card h1 {
      margin-top: 0;
      font-size: 1.5rem;
    }
    .field {
      margin-bottom: 16px;
    }
    .field label {
      display: block;
      margin-bottom: 6px;
      font-size: 0.95rem;
    }
    .field input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
    }
    button {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 6px;
      background: #007bff;
      color: white;
      font-size: 1rem;
      cursor: pointer;
    }
    .message {
      margin-top: 14px;
      color: #d8000c;
      font-size: 0.95rem;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Login</h1>
    <form method="POST" action="/login">
      <div class="field">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</body>
</html>`;

const successPage = (email) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Successful</title>
</head>
<body style="font-family: Arial, sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f2f5; margin:0;">
  <div style="background:white; padding:24px; border-radius:12px; box-shadow:0 12px 24px rgba(0,0,0,0.08); text-align:center;">
    <h1>Welcome</h1>
    <p>You are logged in as <strong>${email}</strong>.</p>
  </div>
</body>
</html>`;

const errorPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Failed</title>
</head>
<body style="font-family: Arial, sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f2f5; margin:0;">
  <div style="background:white; padding:24px; border-radius:12px; box-shadow:0 12px 24px rgba(0,0,0,0.08); text-align:center;">
    <h1>Login Failed</h1>
    <p>Invalid email or password. <a href="/">Try again</a>.</p>
  </div>
</body>
</html>`;

const validCredentials = {
  email: 'user@example.com',
  password: 'password123',
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(loginPage);
    return;
  }

  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const data = querystring.parse(body);
      if (data.email === validCredentials.email && data.password === validCredentials.password) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(successPage(data.email));
      } else {
        res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(errorPage);
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
