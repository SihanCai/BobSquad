# Bob's Bus Tour

Bob's Bus Tour is a website where you can learn about the systemic discrimination towards the black population that has ocurred throughout St. Louis history. **Please read before making contributions to this website.**

## Hosting

Bob's bus tour is currently hosted on an AWS ec2 instance running Ubuntu 20.04.2. We are using apache2 to serve the main page of our website. By default apache2 serves up "/var/www/html/index.html" as the homepage of the website. Currently we have this html page immediately redirect to the home page of the repository stored in "/var/www/html/BobSquad/Window/index.html"

To update the website after pushing changes to the repository:
1. ssh into the ec2 instance by running the following command in the root directory of this repository:

    ```bash
    ssh -i "bobsquad.pem" ubuntu@ec2-18-191-145-124.us-east-2.compute.amazonaws.com
    ```

2. Pull the most recent changes to the repository whose root directory is "/var/www/html/BobSquad"

3. Restart the apache server by running the following command on the ec2 instance:

    ```bash
    sudo systemctl restart apache2.service
    ```
## Running Locally

Running the site locally for development purposes:

1. Clone this repository to your local computer.

2. Open the Windows folder in "Visual Studio Code".

3. Install the "Live Server" Visual Studio Code extension.

4. Right click on the "index.html" file and select "Open with Live Server".

## Adding to the Site

### Map Basics:

For the map we are using google maps api. We are using a combination of polygons, markers, and infowindows to display the relavent information on map. For reference to the specific map elements and how they work visit: https://developers.google.com/maps/documentation/javascript/examples

### Adding Markers to Map:

The marker locations for the map are all stored in the data.json file. Adding another element to the data.json file will automatically add it to the map and also create the page for viewing the video or photos associated with the location.

### Adding Highlighted Areas to the Map:

The highlighted areas of the map are polygons. The code for the polygons is inside of the map.js file. Instructions for creating polygons are listed on google's developers website: https://developers.google.com/maps/documentation/javascript/examples/polygon-simple 
There are also examples of the current polygons in the map.js file.

### Embedding YouTube Videos on the Website:

First the video will need to be uploaded to the YouTube account. Make sure that it is unlisted and can only be viewed through a link. If you are viewing the video that you would like to embed, copy the url and paste into the json file in the "link" propterty. Then replace "watch" with "embed" inside of the url.

### Adding Photos to the Website:

First the photo will need added to the img/data folder. Copy the filepath of the photo and paste it into the json file in the "link" propterty. Currently photos can only be listed in groups of 3.

### Finding Latitude and Longitude Coordinates:

A simple way to find latitude and longitude coordinates is by opening google maps and right clicking in the location where you would like to know the coordinates. Clicking on the coordinates automatically copies it to the clipboard.

Another way to find the latitude and longitude coodinates that lets you visualize them a little better is by creating a new map with Google My Maps and adding a marker in the location where you would like to know the latitude and longitude. Clicking on the marker after it has been created in the My Maps map will display the latitude and longitude coordinates in the bottom left of the infowindow that appears.

### Infowindows on Hover:

Currently the only InfoWindows that are implemented are shown when you hover the curser over a few select polygons on the map. There is a function in map.js called addListenersOnPolygon() that will create the listeners for creating the infowindow when passed a polygon and infowindow as parameters. It is important to set the content for the infowindow and set the position using the latitude and longitued coordinates before calling addListenersOnPolygon(). There are several examples in the map.js file for reference.

If you want to add infowindows to markers, google maps api has in depth documentation on how to do so. https://developers.google.com/maps/documentation/javascript/infowindows

### Adding Elements to the Timeline:
Adding a timeline element requires adding an additional heading list element with the following syntax:

    <li><a href="#0" data-date="InsertDateHere" class="cd-h-timeline__date">InsertTimelineYear</a></li>

It also requires adding one of the list elements that are contained within the main body of the file.

## Content for the Website

Ultimately the main source of information for this map has come from Bob Hansman and he is probably going to be the easiest source of information for new content in the future. However, anything that is relavent and accurate information about the systemic discrimination towards black people throughout the history of St. Louis can definitely be added to this website. It is also important that any photos, videos, and other content that is not from Bob Hansman is free from copyright and cited correctly.

### Photos:

There are a lot of photos that have been collected by Bob Hansman over the years. Some of the photos have been uploaded to the google drive folder in the form of PowerPoints. However, currently most of the photos are completely unlabeled, so it is unclear where or when they were taken. Bob knows most of the background of the pictures, so it will be a process of sitting down with him and going through the photos together to document the date, location, and significance of each of those photographs.

### Videos:

At the moment all of our video content has come from the medical school documentary directed by Cory Brandt. In the future the source of videos could branch out to new footage of Bob's Tour or other informational videos. Another potential way of improving the current medschool footage would be to intermingle birds eye view drone footage or intermingle more current and historical photos into Bob's storytelling.

### New Locations:

There are so many events that have happened throughout St. Louis History and that are continuing to occur that we have not had nearly enough time to incorporate everything into the website. We hope that in the future more locations and more in-depth information can be added to the website to give a bigger picture of the systemic racism that has occurred and is continuing to occur throughout St. Louis history.

### Links to Additional Information:

There are groups throughout St. Louis that are working to combat much of this systemic discrimination. Along with showing all of the unfortunate history of St. Louis we think it would be great to include links to groups where people can attempt to make a positive impact and attempt to stope the reoccuring patterns. 

There are also other sources of information that are adjacent to what is included in our website but go more into depth on a specific topic. It would be great to give links to other sources with helpful information.

## Contacts:

Bob Hansman - hansman@wustl.edu

### Original Contributers:

Jeremiah Brannon - jeremiah.brannon@gmail.com  
Grant Gardner - g.e.gardner@wustl.edu  
Tom Sihan - sihantom@wustl.edu  
Will Engelhardt - wengelhardt@wustl.edu  
Ryan Feinfield - feinfir@wustl.edu

### Website Overseer:

Seema Dahlheimer - seema@seas.wustl.edu