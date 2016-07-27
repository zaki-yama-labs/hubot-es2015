import request from 'request';

module.exports = (robot) => {
  robot.respond(/.*(random|抽選).*/, (msg) => {
    const url = 'https://slack.com/api/channels.list?token=' + process.env.HUBOT_SLACK_TOKEN;

    // チャンネル一覧を取得
    request(url, (err, res, body) => {
      // msg.message.room で現在の channel 名が取れる
      const channel = findChannel(JSON.parse(body).channels, msg.message.room);
      console.log('Channel found');
      console.log(channel);
      const member = msg.random(channel.members);
      msg.send('選ばれたのは <@' + member + '> です');
    });
  });
}

function findChannel(channels, targetName) {
  for (const channel of channels) {
    if (channel.name === targetName) {
      return channel;
    }
  }
  return null;
};
