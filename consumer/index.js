const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'procesador-banco',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'grupo-banco' });

// "Base de datos" en memoria para el demo
let saldoCuentas = {};

const procesarTransaccion = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'transacciones-bancarias', fromBeginning: true });

  console.log("🏦 Banco escuchando transacciones...");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const evento = JSON.parse(message.value.toString());
      const { cuentaId, tipo, monto } = evento;

      // Inicializar cuenta si no existe
      if (!saldoCuentas[cuentaId]) saldoCuentas[cuentaId] = 0;

      // Lógica de negocio (EDA)
      console.log(`\n📥 Recibido: ${tipo} de $${monto}`);
      
      if (tipo === 'DEPOSITO') {
          saldoCuentas[cuentaId] += monto;
      } else if (tipo === 'RETIRO') {
          if (saldoCuentas[cuentaId] >= monto) {
              saldoCuentas[cuentaId] -= monto;
          } else {
              console.log(`⚠️  RECHAZADO: Saldo insuficiente para cuenta ${cuentaId}`);
              return; 
          }
      }

      console.log(`✅ Saldo actualizado cuenta ${cuentaId}: $${saldoCuentas[cuentaId]}`);
    },
  });
};

procesarTransaccion().catch(console.error);