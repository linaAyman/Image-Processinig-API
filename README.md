# Image-Processinig-API
first Udacity full-stack nanodegree project

# USER GUIDE TO USE THE API

### The main endpoint is ("/api").
### The endpoint for handling the resizing is ("/api/resize").
### The API retreives images if found when given filename param only OR resizes images if given the width and height params.
### The API shows an error message if the user typed incorrect endpoint.

## How to resize the images or retrieve image without resizing:
1- The image must be in the "assets/images/original" folder.
2- You can either retreive the image without resizing by passing the filename query parameter only in the url
example:
http://localhost:3000/api/resize?name=santamonica
Or by passing the filename along with the wanted width and height
example:
http://localhost:3000/api/resize?name=santamonica&width=300&height=150

3-The image is shown if found no errors in the parameters.

4- If the image exists caching is applied as the image will not be resized again and the image will be shown.

5- All the resized images are in the "assets/images/thumbnails" folder this folder is created if not already found.

6- Naming of thumbnails follows this convention: original picture name-(width,height).jp. ie: santamonica-(300,150).jpg.

## To start the application 
## In development
npm run start-dev
## In production
npm run start-prod

## To start building
npm run build

## To start testing
npm run test 

## To run pretty
npm run prettify

## To run lint fix
npm run lint-fix
