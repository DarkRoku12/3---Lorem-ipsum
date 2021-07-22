import { promises as fs } from "fs";
import { Buffer }         from "buffer";

let loremCache = null;
let loremBlob  = null;

const lorem = { as : {} };

lorem.as.text = async function()
{
  if( loremCache ) return loremCache;
  loremCache = await fs.readFile( "./lorem-ipsum.txt" , "utf8" );
  return loremCache;
};

lorem.as.buffer = async function()
{
  if( loremBlob ) return loremBlob;
  loremBlob = new Buffer.from( ( await lorem.as.text() ) + "\n\n" );
  return loremBlob;
};

export default lorem;