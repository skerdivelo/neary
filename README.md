## Neary - Meeting Point Finder

This project is a web application that helps multiple users find a convenient meeting point based on their input addresses. Using the OpenStreetMap and Leaflet.js libraries, the application geocodes user addresses, calculates a central meeting point, and displays it on a map. Additionally, it draws lines from each user's address to the central meeting point, ensuring it is located on a street or other suitable location.

## Features

- **Dynamic Input Generation**: Users can specify the number of addresses they want to input.
- **Geocoding**: The application uses the Nominatim service to convert addresses to geographic coordinates.
- **Central Meeting Point**: The application calculates the average coordinates and uses reverse geocoding to find a nearby valid location.
- **Interactive Map**: Displays user addresses, the central meeting point, and connecting lines on a map using Leaflet.js.

## Open Source and Attribution

This project is open source under the [MIT License](LICENSE). You are free to use and modify the code for your own purposes. However, if you use this project or its codebase in your own work, please provide attribution by linking back to this repository or mentioning the original author, [Your Name], and a link to this GitHub repository.
