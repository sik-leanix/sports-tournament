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


## Postman

Postman is an API platform for building and using APIs. With APIs tool you can call HTTP methods.

## 5 principles for better APIs

My learnings from [this video](https://www.youtube.com/watch?v=trpkGXeRe9s&list=PL_OwzAze_jNslLV4Lv-8gxNN8bxO2VYSb&index=10)

### Naming

The name of the API should give a the user an idea what they will receive.
Example:
`/products` -> the user get all products
`/products/id` -> the user get a product with that id

### Resources

Direct addressing to a resource not e.g. to a service.

### Representation

The user receive the copy of the requested resource not the resource itself. Only the requested data is sent in the form of a JSON object not the whole set of data from the database.

### Uniform interface

The API responses to HTTP Methods not to any other methods.

### Hyperlinks

Navigate through the API with links. In the video is shown that the user can cancel the order via a link in the API.

## Open API/Swagger

The open API is useful to describe and visualize REST-APIs.

Here are two links to see how a open API looks like:

- [LeanIX Open API](https://app.leanix.net/openapi-explorer)
- [Fruitshop open API](https://api.predic8.de/shop/docs)