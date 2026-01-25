# Preflight Requests

A preflight request is an automatic HTTP OPTIONS request sent by browsers before certain cross-origin requests (for example, when using non-simple methods or custom headers). The preflight asks the server which methods and headers are allowed by sending Access-Control-Request-Method and Access-Control-Request-Headers; the server must respond with the appropriate Access-Control-Allow-* headers (such as Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers) to permit the actual request.

In Express, preflight requests can be handled by responding to OPTIONS requests and setting the required CORS headers manually, or more simply by using the `cors` middleware (npm package) which automatically handles preflight responses for allowed origins and methods.
