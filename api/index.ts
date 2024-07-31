
process.on('uncaughtException', (err: any, origin: any) => {
  console.error('uncaughtException', err, origin);

  process.exit(1);

});

process.on('unhandleRejection', (err: any, origin: any) => {
  console.error('unhandleRejection', err), origin;

  process.exit(1);

});

async function main() {

  const HAPIServer = await import('./services/httpServer').then(x => x.default);
  const httpServer = new HAPIServer();
  await httpServer.initialize();

  await httpServer.start();
}

main();
