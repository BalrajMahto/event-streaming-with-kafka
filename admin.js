const {kafka} = require('./client')

async function init() {
    const admin = kafka.admin()
    console.log("admin connecting...");
    admin.connect();
    console.log('admin connected');
    console.log('creating topics [rider-updates]');
    
    await admin.createTopics({
        topics:[{
            topic:'rider-updates',
            numPartitions:2,
        }]
    })
    console.log('topics created [rider-updates]');
    await admin.disconnect()
    console.log("admin disconnected");
    
}

init()