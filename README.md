# Project Cattus

## Check it out right here
<https://cattus.azurewebsites.net/>

## Description

## Visuals

## Installation

## Usage

## Known issues

### Express session cannot be stored in the database

The session cannot be stored in our mongo database because the connection cannot be closed.

This causes tests to remain running and therefore our pipeline freezes and never concludes. The libraries we use do not provide the means to properly close this connection.

Things we tried:

- Moved session from `auth.mjs` to `app.mjs`
- Moved session into its own file and exported the middle ware

## Authors and acknowledgment

Maedeh Hassani
Kelsey Pereira Costa
Bogdan Ivan
Johnny Hoang

## License

For open source projects, say how it is licensed.
