## String concatenation in NodeJS ##

This repo contains the full code of my [blog entry](https://code.darkroku12.ovh/3-nodejs-string-concatenation/).

## Install instructions:

1) Run `npm install`. (This is a NodeJS app).
2) Create a file named `.env` in the root folder.

The `.env` file content:
```c++
STARTING_LENGTH=10            # Starting number of concatenations.
MULTIPLIER=10                 # Multiply <STARTING_LENGTH> by this number in every iteration. 
ITERATIONS=5                  # Number of iterations to be tested with.
#DISABLE_BUFF_TO_STRING=true  # Disable converting `Buffer` to `String` in `service_v3.js`.
```

## Running instructions:

In order to the test to be fair `node <file.js>` must be ran using the flag `--expose-gc`,
so we can use `global.gc()` to do a full garbage collector run before test, so the garbage collector does not run
in the middle of the tests.

There are two 'different' ways of running it:
1) `node --expose-gc index.js`
2) `node --jitless --expose-gc index.js`

The way #2 actually disable the `jit` compiler with the flag `--jitless`. 

## Notes:

`Environment: DISABLE_BUFF_TO_STRING` --> If you set it to true (you can just uncomment the line by removing the leading `#`) 
you can see that the services actually runs faster, but the result is __not__ the same, but can be useful depending on your scenario.

## Setup info:
- CPU: I7-9700K
- RAM: 32GB - 3200MHz
- Windows 10 (20H2)
- Node version: v16.5.0

## Running samples:

`STARTING_LENGTH: 10 | MULTIPLIER: 10 | ITERATIONS: 5 | DISABLE_BUFF_TO_STRING: true`
| service version            | iteration #1      | iteration #2     | iteration #3    | iteration #4     | iteration #5        |
|----------------------------|-------------------|------------------|-----------------|------------------|---------------------|
| V1 - Concatenation         | 0ms (27.14 MB)    | 0ms  (27.73 MB)  | 0ms (27.64 MB)  | 0ms  (29.57 MB)  | 20ms (40.26 MB)     |
| V2 - File system as buffer | 26ms (27.44 MB)   | 10ms (28.41 MB)  | 80ms (36.20 MB) | 735ms (97.33 MB) | 6745ms  (708.92 MB) |
| V3 - Direct Buffers        | 0ms (27.45)       | 0ms  (27.92 MB)  | 1ms (32.91 MB)  | 7ms  (63.60 MB)  | 74ms (374.65 MB)    |
| V4 - Using Arrays          | 0ms (27.72 MB)    | 0ms  (27.91 MB)  | 2ms (32.91 MB)  | 12ms (63.67 MB)  | 127ms (376.08 MB)   |

Those results are extracted from `logs/standard_run.txt`.
Memory were measured with `process.memoryUsage.rss() / 1024 / 1024`.
If you need more test results, please, test it by yourself 😊.

## Author:
#### Enmanuel Reynoso | DarkRoku12 | enmarey2012@hotmail.com