const {Kafka} = require('kafkajs')


exports.kafka = new Kafka({
    clientId:'my_app',
    brokers:['localhost:9092'],

})