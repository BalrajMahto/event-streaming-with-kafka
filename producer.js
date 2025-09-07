const { kafka } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function init() {
  const producer = kafka.producer();
  console.log('connecting producer...');
  await producer.connect();
  console.log('producer connected successfully');

  rl.setPrompt('> ');
  rl.prompt();

  rl.on('line', async function (line) {
    const [riderName, location] = line.split(' ');  // ✅ split by space
    if (!riderName || !location) {
      console.log("⚠️ Usage: <name> <location>");
      rl.prompt();
      return;
    }

    await producer.send({
      topic: 'rider-updates',
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: 'location_update',
          value: JSON.stringify({ name: riderName, loc: location })  // ✅ dynamic
        }
      ]
    });

    console.log(`✅ Sent: ${riderName} @ ${location}`);
    rl.prompt();
  }).on('close', async () => {
    await producer.disconnect();
  });
}

init().catch(console.error);
