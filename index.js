const cluster = require('cluster');
const http = require('http');
const os = require('os');
const client = require('prom-client');

const numCPUs = os.cpus().length;

const register = new client.Registry();

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'code'],
  registers: [register],
});

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); 
  });
} else {
  http.createServer((req, res) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    setTimeout(() => {
      res.writeHead(200);
      res.end(`Hello from Worker ${process.pid}\n`);
      end({ method: req.method, code: res.statusCode });
    }, Math.random() * 1000); 
  }).listen(3000, () => {
    console.log(`Worker ${process.pid} started on port 3000`);
  });

  http.createServer((req, res) => {
    if (req.url === '/metrics') {
      res.set('Content-Type', register.contentType);
      res.end(register.metrics());
    }
  }).listen(3001); 
}