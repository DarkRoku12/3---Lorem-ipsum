import Lorem from "./lorem-ipsum.js";

/*
  String concatenation implementation.
*/
export default async function generate_lorem_v1( lengths )
{
  const text = await Lorem.as.text();
  let   ret  = "";

  for( let i = 0; i < lengths; ++i )
  {
    ret += `${text}`;
    if( i < lengths - 1 ) ret += "\n\n";
  }

  return ret;
};