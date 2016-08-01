import request from 'request';

const messages = [
  '{name} さん、お願いします',
  '選ばれたのは、{name} でした :tea:',
  '{name} さん :pray:'
];

module.exports = (robot) => {
  robot.respond(/.*(random|抽選|選ぶ).*/, (msg) => {
    const url = 'https://slack.com/api/channels.list?token=' + process.env.HUBOT_SLACK_TOKEN;

    // チャンネル一覧を取得
    request(url, (err, res, body) => {
      // msg.message.room で現在のチャンネル名が取れる
      const channel = findChannel(JSON.parse(body).channels, msg.message.room);
      console.log('Channel found');
      console.log(channel);

      // bot 自身を除外して抽選
      const botId = robot.adapter.self.id;
      const filterdMembers = channel.members.filter((member) => {
        return member !== botId;
      });
      console.log(filterdMembers);
      const member = msg.random(filterdMembers);

      const message = msg.random(messages);
      msg.send(message.replace('{name}', `<@${member}>`));
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
