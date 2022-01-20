# API Design

## Routes:

/tournaments
/tournaments/<id>
/tournaments/<id>/players
/tournaments/<id>/players/<id>
/tournaments/<id>/registrations
/tournaments/<id>/registrations/<id>
/tournaments/<id>/actions/close-registrations
/tournaments/<id>/actions/trigger-matchmaking
/tournaments/<id>/matches
/tournaments/<id>/matches/<id>

## Examples:

### POST /tournaments
Will create a new tournament. The request body contains the information provided in the form by the organizer.

Returned HTTP codes:
200: Tournament created successfully
400: Missing required attributes in the provided payload

### PUT / tournaments/<id>
Updates the data of an existing tournament.

Returned HTTP codes:
200: Tournament updated successfully
400: Missing required attributes in the provided payload
404: tournament with that ID could not be found
403: User is not authorized to update this tournament (e.g. because their request does not contain a token which was created based on the password required to manage this tournament(

### DELETE /tournaments/<id>
Deletes a tournament.

Returned HTTP codes: 200, 404, 403 (similar reasons as above)

### POST /tournaments/<id>/actions/close-registrations
Closes the registrations for a tournament

Returned HTTP codes: 200, 404, 403 (similar reasons as above)