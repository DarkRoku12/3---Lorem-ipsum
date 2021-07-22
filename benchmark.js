import Logger from "./spinLogger.js";

const getTime = () => ( new Date ).getTime();

const CollectGarbage = function()
{
  if( global.gc )
    global.gc();
  else
    console.warn( "No GC hook: please, start the program as: node --expose-gc index.js" );
};

export default async function Benchmark( callback , name )
{
  CollectGarbage();
  Logger( `Benchmarking: ${name}` );
  const start = getTime();
  const str   = await callback();
  const end   = getTime();
  const mem   = process.memoryUsage.rss() / 1024 / 1024;
  Logger( `** Took: ${end - start}ms | memory: ${mem} MB | string length: ${str.length}` );
};