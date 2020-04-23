# PiHome

A dashboard to see data collated from esp32-logger's.

## Requirements

This was designed for a Pi 3. You'll need:

- MongoDB 3.X (I used the [installation guide here](https://andyfelong.com/2016/01/mongodb-3-0-9-binaries-for-raspberry-pi-2-jessie/), but using the [updated libraries here](https://andyfelong.com/2017/08/mongodb-3-0-14-for-raspbian-stretch/))

## Caveats

This is not designed to be safe, secure, or in any way public.
The endpoints provided by this server will be, for all intents and purposes, completely unauthenticated and open.
I **strongly** recommend not leaving this public.

## Development Data

You can copy all the data from your pi by first creating a tunnel:

```
$ ssh -L 27018:localhost:27017 pihome
```

Then just `yarn db:copy` to bring it into your local mongo.

## License

GNU GPL v3
