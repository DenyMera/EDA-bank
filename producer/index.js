const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'cajero-automatico',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const enviarEvento = async (tipo, monto, cuentaId) => {
  await producer.connect();
  
  const evento = {
    cuentaId: cuentaId,
    tipo: tipo, // 'DEPOSITO' o 'RETIRO'
    monto: monto,
    fecha: new Date().toISOString()
  };

  // Enviamos el evento al tópico
  await producer.send({
    topic: 'transacciones-bancarias',
    messages: [
      { value: JSON.stringify(evento) }
    ],
  });

  console.log(`📤 Evento Enviado: ${tipo} de $${monto} para cuenta ${cuentaId}`);
  await producer.disconnect();
};

// --- SIMULACIÓN DE USO ---
// Cambia estos valores para probar
const run = async () => {
    // Simulamos un depósito inicial
    await enviarEvento('DEPOSITO', 100, 'cuenta-123');
    
    // Simulamos un retiro
    await enviarEvento('RETIRO', 50, 'cuenta-123');
    
    // Simulamos otro depósito
    await enviarEvento('DEPOSITO', 200, 'cuenta-123');
};

run().catch(console.error);