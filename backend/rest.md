# REST API

## What is REST?
REST is a software archictural style for APIs that contains guidelines and best practices for creating scalable web services.
REST uses simple HTTP to make call between components.

- `POST`: Create a resource.
- `GET`: Retrieve a resource.
- `PUT`: Update a resource.
- `DELETE`: Delete a resource.

The data are retrieved in most of the time in `JSON` format.

## Features of the REST API

- Client-Server: The client do not have to worry about the data storage and the server do not have to deal with the interface. The data is portable and can be used by mutiple clients.
- Cacheable: clients can, and should, cache responses to improve performance, and avoid the server with every request.
- Stateless: The request itself descripes the request.
- Uniform interface: The transferred information comes in standardised form.
- Layered System: The system is structured in layers. Each component cannot see beyond its layer.


The URL is used to direct to a specific location. So you can reach the resource with a unique path.
For example: `https://www.leanix.net/en/blog`
With this url you lead to the LeanIX blog.

And so a REST-API should look like. It should be understandable what the API does even if someone does not know the circumstances. In my case you can get the tournaments with GET call at `heruko.com/tournaments`.
