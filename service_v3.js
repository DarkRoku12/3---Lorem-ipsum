import Lorem      from "./lorem-ipsum.js";
import { Buffer } from "buffer";
import Env        from "./environment.js";

const SpacingBuffer   = new Buffer.from( "\n\n" );
const DisableToString = Env.as.boolean( "DISABLE_BUFF_TO_STRING" );

/*
  Direct buffer implementation (with Buffer.allocUnsafe())
  - A little bit faster than `Buffer.alloc()` but no so significant.
*/
export default async function generate_lorem_v3_fast( lengths )
{
  const textBuffer   = await Lorem.as.buffer();
  const bufferLen    = textBuffer.length * lengths - SpacingBuffer.length;
  const outputBuffer = new Buffer.allocUnsafe( bufferLen );
  outputBuffer.fill( textBuffer );
  return DisableToString ? outputBuffer : outputBuffer.toString();
};

/*
  Direct buffer implementation (with Buffer.alloc())
*/
export async function generate_lorem_v3_slow( lengths )
{
  const textBuffer   = await Lorem.as.buffer();
  const bufferLen    = textBuffer.length * lengths - SpacingBuffer.length;
  const outputBuffer = new Buffer.alloc( bufferLen , textBuffer , "utf8" );
  return DisableToString ? outputBuffer : outputBuffer.toString();
};
