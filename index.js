import "./exceptionHandler.js";
import Env       from "./environment.js";
import Logger    from "./spinLogger.js";
import Benchmark from "./benchmark.js";

// Tests //
import service_v1 from "./service_v1.js";
import service_v2 from "./service_v2.js";
import service_v3 from "./service_v3.js";
import service_v4 from "./service_v4.js";

// Execute tests //
( async() =>
{
  let   length     = Env.as.number( "STARTING_LENGTH" ) || 1;
  const iterations = Env.as.number( "ITERATIONS" ) || 1;
  const multiplier = Env.as.number( "MULTIPLIER" ) || 1;

  /// Debug info ///
  Logger( `STARTING LENGTH: ${length} | ITERATIONS: ${iterations} | MULTIPLIER: ${multiplier} ` , { log : "info" });

  //// Do benchmark ////

  for( let i = 0; i < iterations; ++i )
  {
    Logger( `\n---------- Iteration #${i+1} | Length: ${length} ---------------\n` , { log : "info" });
    await Benchmark( async() => service_v1( length ) , "V1 - Concatenation" );

    Logger( "-------------------------" , { log : "info" });
    await Benchmark( async() => service_v2( length ) , "V2 - File system as buffer" );

    Logger( "-------------------------" , { log : "info" });
    await Benchmark( async() => service_v3( length ) , "V3 - Direct Buffers" );

    Logger( "-------------------------" , { log : "info" });
    await Benchmark( async() => service_v4( length ) , "V4 - Using Arrays" );

    length *= 10; // Increase the length.
  }

  Logger( "--- Testing finished ---" , { finish : true });
})();
