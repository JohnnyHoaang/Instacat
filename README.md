# Project Cattus

## Check it out right here!
https://cattus.azurewebsites.net/

## Description

Instacat is a social media network for posting and adopting cats. We provide cat adoption and exclusive cat pictures. We are going to focus on the feed features. Our set of customers are cat enjoyers, fosters, people looking to adopt cats.  

## Features
- Seperate admin application to fetch data from APIs and push to the database
- Has an API route called `api/cat/all` that sends all existing posts in json format from the MongoDB database
- Has an API route `api/cat/id/:id` that sends specific post in json format based on the given `id` parameter from the MongoDB database
- Can add post with an image and a caption to the database through a POST route 
- Navigate several cat posts on a home page
- Can "like" a post
- All cats can be seen on the main page
- Can click on the cat images and see all the information about that particular cat 
- With the first click, the number of likes increases and with the next click, it returns to the first number

## Installation

### Importer application
- Requires .NET 3.1 or greater
- For the time being:
    1. Change to the **DatabaseApp** directory from the project root
    2. Run `dotnet restore` to install dependencies
    3. Run `dotnet run` to start the application. It might take a while on first boot

### Website

## Usage

### Importer application
When successfully logged in, a user can:
    - Fetch data from APIs and store them into files
    - Push the data from the files to the database
    - Delete a database collection
    - Benchmark (potential future idea)
    - Exit

### Website


## Known issues/bugs
- Liking doesn't work. Currently, it's entirely on current website state and any changes disappear should the website reload
- If you upload a file that has the same name as one of the files stored in the azure blob storage, the uploaded file will override the old file and change the image of the post that depended on the old file.
- Importer application crashes should some credentials or credential data be wrong

## Authors and acknowledgment

Maedeh Hassani
Kelsey Pereira Costa
Bogdan Ivan
Johnny Hoang
