var mosca = require('mosca');

var settings = {
  port: 1883,
  http: {
    port: 3000
  }
};

var authenticate = function (client, username, password, callback) {
  console.log(username);
  var authorized = (username === 'admin' && password.toString() === 'admin');
  if (authorized) client.user = username;
  callback(null, authorized);
}


//here we start mosca
var server = new mosca.Server(settings);
server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  server.authenticate = authenticate;
  console.log('Mosca server is up and running')
}

// fired whena  client is connected
server.on('clientConnected', function (client) {

});

function getRandomNumber(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// fired when a message is received
server.on('published', function (packet, client) {
  // console.log('Published : ', packet.payload);
});

// fired when a client subscribes to a topic
server.on('subscribed', function (topic, client) {
  console.log('subscribed : ', topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function (topic, client) {
  console.log('unsubscribed : ', topic);
});

// fired when a client is disconnecting
server.on('clientDisconnecting', function (client) {
  console.log('clientDisconnecting : ', client.id);
});

// fired when a client is disconnected
server.on('clientDisconnected', function (client) {
  console.log('clientDisconnected : ', client.id);
});

setInterval(function () {
  var value = getRandomNumber(20, 99)
  var message = {
    topic: 'sensor-status',
    payload: new Buffer(value.toString()), // or a Buffer
    qos: 0, // 0, 1, or 2
    retain: false // or true
  };

  server.publish(message, function () {
    console.log('done!');
  });
}, 2000);