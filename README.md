# Desafio balanceo de carga"


pm2 start server.js --name="Server1" --watch -- 8081
pm2 start server.js --name="Server2" --watch -i max -- 8082   
pm2 start server.js --name="Server3" --watch -i max -- 8083  
pm2 start server.js --name="Server4" --watch -i max -- 8084   
pm2 start server.js --name="Server5" --watch -i max -- 8085   

# Desafio Loggers"

1 -> node server.js

Se iniciara en modo FORK
Server is running on port 8080
{"level":30,"time":1671549485918,"pid":4668,"hostname":"CACOSTA_NBK","msg":"Peticion entrante --> Ruta: /, metodo: GET"}

2 -> node --prof server.js 

Se iniciara en modo FORK
Server is running on port 8080

3 -> artillery quick -c 50 -n 20 "http://localhost:8080/api/info"> artyllery-suma.log

4-> node --prof-process info-v8.log > info.log.txt

5 -> npm start

> desafc22@1.0.0 start
> 0x server.js

ProfilingSe iniciara en modo FORK
Server is running on port 8080

6 -> npm run test

> desafc22@1.0.0 test
> node benchmarks.js

node:internal/modules/cjs/loader:959
  throw err;

Error: Cannot find module 'C:\Users\cacosta\Desktop\Proyectos\Backend\Entrega desafios\DesafC32\benchmarks.js'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:956:15)
    at Function.Module._load (node:internal/modules/cjs/loader:804:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
PS C:\Users\cacosta\Desktop\Proyectos\Backend\Entrega desafios\DesafC32> npm run test

> desafc22@1.0.0 test
> node benchmarks.js

Running all benchmarks in parallel ...
Running 20s test @ http://localhost:8080/api/info
500 connections


┌─────────┬───────┬────────┬────────┬────────┬───────────┬─────────┬────────┐
│ Stat    │ 2.5%  │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev   │ Max    │
├─────────┼───────┼────────┼────────┼────────┼───────────┼─────────┼────────┤
│ Latency │ 22 ms │ 134 ms │ 282 ms │ 370 ms │ 121.38 ms │ 84.5 ms │ 880 ms │
└─────────┴───────┴────────┴────────┴────────┴───────────┴─────────┴────────┘
┌───────────┬────────┬────────┬─────────┬─────────┬─────────┬────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%     │ 97.5%   │ Avg     │ Stdev  │ Min    │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┼────────┤
│ Req/Sec   │ 1291   │ 1291   │ 4339    │ 4887    │ 4101.15 │ 872.13 │ 1291   │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┼────────┤
│ Bytes/Sec │ 603 kB │ 603 kB │ 2.03 MB │ 2.28 MB │ 1.91 MB │ 407 kB │ 603 kB │
└───────────┴────────┴────────┴─────────┴─────────┴─────────┴────────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

83k requests in 20.18s, 38.3 MB read
