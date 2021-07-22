import Lorem from "./lorem-ipsum.js";

/*
  Using `Array.join()`.
*/
export default async function generate_lorem_v4( lengths )
{
  const txt = await Lorem.as.text();
  const arr = [];

  for( let i = 0; i < lengths; ++i ) arr.push( txt );

  return arr.join( "\n\n" );
};