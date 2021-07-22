import exts from "fs-ext";

const promisify =
{
  async seek( fileHandler , offset , whence )
  {
    new Promise( ( resolve , reject ) =>
    {
      const fd = fileHandler instanceof Object ? fileHandler.fd : fd;
      exts.seek( fd , offset , whence , ( error , currFilePos ) =>
      {
        if( error )
          reject( error );
        else
          resolve( currFilePos );
      });
    });
  }
};

export default promisify;

export const { seek } = promisify;