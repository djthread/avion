var
  redisModule = require('redis'),
  client      = redisModule.createClient();


// I seem to get redis timeout errors after some time of server inactivity. Some forum guys
// said something like this worked for him to prevent it. (publish on 20-min interval.)
setInterval(function() { client.publish('_please_dont_drop_me', '1'); }, 1200000);


var publish = function(signal, payload, req) {

  if (_.isObject(payload) && !_.isArray(payload)) {
    var obj = {};

    Object.keys(payload.toJSON ? payload.toJSON() : payload).forEach(function(k) {
      obj[k] = payload[k];
    });

    // if (req && req.socket) {
    //   obj.socketId = req.socket.id;
    // }

    payload = obj;
  }

  var stringified = JSON.stringify(payload);
  console.log('publishing ' + signal, stringified);
  client.publish(signal, stringified);
};

module.exports = {

  socketOnConnection: function(session, socket) {
    // Create a new redis connection for the new websocket.
    socket.redis = redisModule.createClient();

    var dropFix = setInterval(function() {
      client.publish('_please_dont_drop_me', '1');
    }, 1200000);

    // This is critical to clean up the redis connection when the
    // corresponding websocket closes.
    socket.on('disconnect', function() {
      clearInterval(dropFix);
      socket.redis.quit();
    });

    // When a redis event comes in that the client has subscribed to,
    // forward it along over the websocket.
    socket.redis.on('message', function(channel, message) {
      message = JSON.parse(message);

      // If the message included a socketId key, replace it with a 'you' key.
      // This will be true for the socket belonging to the defined socketId
      // and false otherwise.
      // if (message.socketId) {
      //   message.you = message.socketId === socket.id;
      //   delete message.socketId;
      // }

      // console.log('redis->socket[' + socket.handshake.sessionID + '] ' +
      console.log('redis->socket[' + socket.id + '] ' + channel +
        ':', JSON.stringify(message));

      socket.emit(channel, message);
    });

  },

};
