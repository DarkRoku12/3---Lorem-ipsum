import Lorem              from "./lorem-ipsum.js";
import { seek }           from "./fs-ext-async.js";
import { promises as fs } from "fs";

/*
  Use file system as buffer.
*/
export default async function generate_lorem_v2( lengths )
{
  const text     = await Lorem.as.text();
  const tempFile = await fs.open( "./lorem-ipsum-text.temp" , "w+" );

  for( let i = 0; i < lengths; ++i )
  {
    await tempFile.write( text );
    if( i < lengths - 1 ) await tempFile.write( "\n\n" );
  }

  // Reset the cursor to beginning of the file.
  await seek( tempFile , 0 , 0 );

  // Read the whole file content.
  // This will read a buffer and then turn it into a immutable string.
  const ret = await tempFile.readFile({ encoding : "utf8" });

  // Don't forget to close the file handler.
  await tempFile.close();

  return ret;
};