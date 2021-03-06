# API Design

- `POST`: Create a resource.
- `GET`: Retrieve a resource.
- `PUT`: Update a resource.
- `DELETE`: Delete a resource.
## Routes:

Info: Pagination is out of scope for the first iteration of the API.

- [`/tournaments` (POST)](#tournaments)
- [`/tournaments/<id>` (PUT, DELETE, GET)](#tournamentsid)
- [`/tournaments/<id>/actions/close-registrations` (POST)](#tournamentsidactionsclose-registrations)
- [`/tournaments/<id>/actions/open-registrations` (POST)](#tournamentsidactionsopen-registrations)
- [`/tournaments/<id>/actions/trigger-matchmaking` (POST)](#tournamentsidactionstrigger-matchmaking)
- [`/tournaments/<id>/players` (POST, GET)](#tournamentsidplayer)
- [`/tournaments/<id>/players/<id>` (PUT, DELETE, GET)](#tournamentsidplayerid)
- [`/tournaments/<id>/registrations` (POST, GET)](#tournamentsidregistrations)
- [`/tournaments/<id>/registrations/<id>` (PUT, DELETE, GET)](#tournamentsidregistrationsid)
- [`/tournaments/<id>/matches` (POST, GET)](#tournamentsidmatches)
- [`/tournaments/<id>/matches/<id>` (PUT, GET)](#tournamentsidmatches)

## Examples:

### tournaments
#### POST `/tournaments`

Will create a new tournament. The request body contains the information provided in the form by the organizer.

Returned HTTP codes:
- 200: Tournament created successfully
- 400: Missing required attributes in the provided payload

### tournaments/id

#### PUT `/tournaments/<id>`

Updates the data of an existing tournament.

Returned HTTP codes:
- 200: Tournament updated successfully
- 400: Missing required attributes in the provided payload
- 404: Tournament with that ID could not be found
- 401: User is not authorized to update this tournament (e.g. because their request does not contain a token which was created based on the password required to manage this tournament)

#### DELETE `/tournaments/<id>`

Deletes a tournament.

Returned HTTP codes: 
- 200: Deletion succesful
- 404: Tournament with that ID could not be found
- 401: User not authorized

#### GET `/tournaments/<id>`

Gets the data of an existing tournament.

Returned HTTP codes:
- 200: Request was succesful
- 404: Tournament with that ID could not be found

### tournaments/id/actions/close-registrations

### POST `/tournaments/<id>/actions/close-registrations`

Closes the registrations for a tournament

Returned HTTP codes: 
- 200: Tournament closed successfully
- 404: Tournament with that ID could not be found
- 401: User not authorized

### tournaments/id/actions/open-registrations

### POST `/tournaments/<id>/actions/open-registrations`

Opens the registrations for a tournament.

Returned HTTP codes: 
- 200: Tournament opened successfully
- 404: Tournament with that ID could not be found
- 401: User not authorized

### tournaments/id/actions/trigger-matchmaking

### POST `/tournaments/<id>/actions/trigger-matchmaking`

Triggers the matchmaking.

Returned HTTP codes: 
- 200: Succesful triggered the matchmaking
- 404: Tournament with that ID could not be found
- 401: User not authorized

### tournaments/id/player

#### POST `/tournaments/<id>/players`

Adds a player to a tournament with these data:
- Skill level
- Name
- Starting point 
TODO

Returned HTTP codes: 
- 200: Added player successfully
- 404: Tournament with that ID could not be found
- 400: Missing required attributes in the provided payload

#### GET `/tournaments/<id>/players`

Gets all participants.

Returned HTTP codes:
- 200: Request all player successful
- 404: Tournament with that ID could not be found

### tournaments/id/player/id

#### GET `/tournaments/<id>/players/<id>`

Gets an existing player from the tournament.

Returned HTTP codes:
- 200: Request player successful
- 404: Tournament or player with that ID could not be found
#### PUT `/tournaments/<id>/players/<id>`

Updates an existing player from the tournament.

Returned HTTP codes:
- 200: Updated participant successfully
- 400: Missing required attributes in the provided payload
- 404: Tournament or player with that ID could not be found
- 401: User not authorized
#### DELETE `/tournaments/<id>/players/<id>`

Deletes a player from the tournament.

Returned HTTP codes:
- 200: Deleted participant successfully
- 404: Tournament or player with that ID could not be found
- 401: User not authorized

### tournaments/id/registrations
#### POST `/tournaments/<id>/registrations`

Player registers for the tournament. With the name and skill level.

Returned HTTP codes:
- 200: Created registration successfully
- 404: Tournament with that ID could not be found
- 401: User not authorized

#### GET `/tournaments/<id>/registrations`

Gets all registrations from a tournament.

Returned HTTP codes:
- 200: Requested all registration successfully
- 404: Tournament with that ID could not be found
- 401: User not authorized

### tournaments/id/registrations/id

#### DELETE `/tournaments/<id>/registrations/<id>`

Deletes a player registration.

Returned HTTP codes:
- 200: Deleted registration successfully
- 404: Tournament or registration with that ID could not be found
- 401: User not authorized

#### PUT `/tournaments/<id>/registrations/<id>`

Updates a player registration.

Returned HTTP codes:
- 200: Updated registration successfully
- 400: Missing required attributes in the provided payload
- 404: Tournament or registration with that ID could not be found
- 401: User not authorized

#### GET `/tournaments/<id>/registrations/<id>`

Gets a registration from a player.

Returned HTTP codes:
- 200: Request registration successfully
- 404: Tournament or registration with that ID could not be found

### tournaments/id/matches

#### POST `/tournaments/<id>/matches`

Creates a tournament match. With opponents, ... :TODO

Returned HTTP codes:
- 200: Match created successfully
- 404: Tournament with that ID could not be found
- 401: User not authorized
- 400: Missing required attributes in the provided payload

#### GET `/tournaments/<id>/matches`

Gets all tournament matches.

Returned HTTP codes:
- 200: Request matches successfully
- 404: Tournament with that ID could not be found

### tournaments/id/matches/id

#### PUT `/tournaments/<id>/matches/<id>`

Updates an existing match.

Returned HTTP codes:
- 200: Match updated successfully
- 404: Tournament or match with that ID could not be found
- 401: User not authorized
- 400: Missing required attributes in the provided payload

#### GET `/tournaments/<id>/matches/<id>`

Gets the data from an exising match.

Returned HTTP codes:
- 200: Request match successfully
- 404: Tournament or match with that ID could not be found
