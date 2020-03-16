const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8888
});
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    listenMessage(ws, message);
  });

  ws.send(
    formatMessage({
      operate: 'CONNECTED',
      data: 'CONNECTED'
    })
  );
});

function listenMessage(ws, message) {
  const { operate, data } = JSON.parse(message);
  switch (operate) {
    case 'PING':
      ws.send(
        formatMessage({
          operate: 'PING',
          data: 'PONG'
        })
      );
      break;
    case 'MATCH':
      const opponentInfo = getOpponentInfo();
      sleep(2000).then(() => {
        ws.send(
          formatMessage({
            operate: 'MATCH',
            data: {
              rival: opponentInfo,
              subjects: [
                {
                  id: 5,
                  title:
                    '从一般规律来看，不管在30度还是比较低的冬天的气温里，新型冠状病毒都会慢慢( )，所以消毒比提升室温可以有效的预防病毒。',
                  options: [
                    { id: 'A', content: '失去活性\r' },
                    { id: 'B', content: '死亡\r' },
                    { id: 'C', content: '增加活性' }
                  ],
                  answer: 'A',
                  explain: null
                },
                {
                  id: 5,
                  title:
                    '新型冠状病毒都会慢慢( )，所以消毒比提升室温可以有效的预防病毒。',
                  options: [
                    { id: 'A', content: '失去活性\r' },
                    { id: 'B', content: '死亡\r' },
                    { id: 'C', content: '增加活性' }
                  ],
                  answer: 'A',
                  explain: null
                },
                {
                  id: 5,
                  title: '所以消毒比提升室温可以有效的预防病毒。',
                  options: [
                    { id: 'A', content: '失去活性\r' },
                    { id: 'B', content: '死亡\r' },
                    { id: 'C', content: '增加活性' }
                  ],
                  answer: 'A',
                  explain: null
                }
              ]
            }
          })
        );
      });
      break;
    case 'SCORE':
      sleep(1000).then(() => {
        receiveScore(ws);
      });
      break;
    case 'OVER':
      settlementQuiz(ws);
      break;
  }
}

function getOpponentInfo() {
  const avatar =
    'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg';
  const name = '陈波波';
  const victory = 1;
  const score = 1100;
  const level = 5;
  return {
    portrait: avatar,
    nickname: name,
    streak: victory,
    score,
    level
  };
}

function receiveScore(ws) {
  const score = random(1, 10, 10);
  ws.send(
    formatMessage({
      operate: 'SCORE',
      data: { score }
    })
  );
}

function settlementQuiz(ws) {
  const score = 10;
  const experience = 11;
  const streak = 6;
  ws.send(
    formatMessage({
      operate: 'OVER',
      data: {
        score,
        experience,
        streak
      }
    })
  );
}

function sleep(time, val) {
  return new Promise(function(r) {
    return setTimeout(function() {
      return r(val);
    }, time);
  });
}

function random(min = 1, max = 10, step = 1) {
  return Math.floor(Math.random() * max + min) * step;
}

function formatMessage(data) {
  return JSON.stringify(data);
}
