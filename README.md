## Mosca MQTT Web Example:

![Screenshot](/mosca-mqtt-web.png)
#### Installation:

```
1. npm i

2. Start Server on port 3000:
    npm run server

3. Start Client 4on port 4200:
    npm run client

```

#### Auth over server:

```
var authenticate = function(client, username, password, callback) {
  var authorized = (username === 'alice' && password.toString() === 'secret');
  if (authorized) client.user = username;
  callback(null, authorized);
}
```

