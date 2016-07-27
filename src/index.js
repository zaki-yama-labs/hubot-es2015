import request from 'request';

module.exports = (robot) => {
  robot.respond(/.*(random|抽選).*/, (msg) => {
    //msg.send(msg.message.id);
    const url = 'https://slack.com/api/channels.list?token='
      + process.env.HUBOT_SLACK_TOKEN;
    //msg.send(url);

    // 1. チャンネル一覧を取得
    request(url, (err, res, body) => {
      let members;
      for (const channel of JSON.parse(body).channels) {
        if (channel.name === msg.message.room) {
          console.log('Channel found');
          console.log(channel);
          members = channel.members;
          break;
        }
      }
      const member = msg.random(members);

      // 2. user.id から名前取得
      const url = 'https://slack.com/api/users.info?token='
        + process.env.HUBOT_SLACK_TOKEN
        + '&user=' + member;
      //console.log(url);
      request(url, (err, res, body) => {
        msg.send('<@' + JSON.parse(body).user.name + '> よろしくお願いします！');
      });
    });
  });
}
