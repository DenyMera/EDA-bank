# Banco Kafka EDA

Proyecto de ejemplo de Event-Driven Architecture (EDA) usando Apache Kafka, con un productor y consumidor implementados en Node.js.

## Descripción

Este proyecto demuestra cómo implementar un sistema de eventos con:
- **Productor**: Envía eventos a un tema de Kafka
- **Consumidor**: Consume eventos del tema de Kafka
- **Docker Compose**: Configuración para levantar Kafka localmente

## Estructura del Proyecto

```
EDA-BANK/
├── producer/           # Servicio productor de eventos
│   ├── index.js
│   └── package.json
├── consumer/           # Servicio consumidor de eventos
│   ├── index.js
│   └── package.json
├── docker-compose.yml  # Configuración de Docker
├── .gitignore
└── README.md
```

## Requisitos

- Docker y Docker Compose
- Node.js 14+
- npm o yarn

## Instalación y Uso

### 1. Clonar el repositorio

------

### 2. Levantar Kafka con Docker Compose

```bash
docker-compose up -d
```

Esto iniciará:
- Zookeeper (puerto 2181)
- Kafka (puerto 9092)

### 3. Instalar dependencias

```bash
# Para el productor
cd producer
npm install

# Para el consumidor
cd ../consumer
npm install
```

### 4. Ejecutar el productor

```bash
cd producer
npm start
```

### 5. Ejecutar el consumidor (en otra terminal)

```bash
cd consumer
npm start
```

## Configuración

Los servicios se conectan a Kafka usando las siguientes variables por defecto:
- **Host**: localhost
- **Puerto**: 9092
- **Tema**: eventos (configurable)


## Detener los servicios

```bash
docker-compose down
```

## Desarrollo

Para modificar el comportamiento del productor o consumidor, edita los archivos `index.js` en sus respectivas carpetas.

## Licencia

MIT
