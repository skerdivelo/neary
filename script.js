var map = L.map("mapid").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function generateInputs() {
    var numUsers = document.getElementById("numUsers").value;
    var inputContainer = document.getElementById("inputContainer");
    inputContainer.innerHTML = "";
    for (var i = 0; i < numUsers; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Indirizzo " + (i + 1);
        input.id = "address" + i;
        inputContainer.appendChild(input);
    }
}

function showOnMap() {
    var numUsers = document.getElementById("numUsers").value;
    var promises = [];

    for (var i = 0; i < numUsers; i++) {
        var address = document.getElementById("address" + i).value;
        var url =
            "https://nominatim.openstreetmap.org/search?format=json&q=" +
            encodeURIComponent(address);
        promises.push(fetch(url).then((response) => response.json()));
    }

    Promise.all(promises)
        .then((results) => {
            var latSum = 0,
                lonSum = 0,
                validResults = 0;
            var userLocations = [];
            results.forEach((data) => {
                if (data.length > 0) {
                    var lat = parseFloat(data[0].lat);
                    var lon = parseFloat(data[0].lon);
                    latSum += lat;
                    lonSum += lon;
                    validResults++;
                    userLocations.push([lat, lon]);
                    L.marker([lat, lon]).addTo(map);
                }
            });

            if (validResults > 0) {
                var avgLat = latSum / validResults;
                var avgLon = lonSum / validResults;
                var centralIcon = L.icon({
                    iconUrl: "centralIcon.png",
                    iconSize: [38, 38],
                    iconAnchor: [19, 38],
                    popupAnchor: [0, -38],
                });

                L.marker([avgLat, avgLon], { icon: centralIcon })
                    .addTo(map)
                    .bindPopup("Punto di incontro")
                    .openPopup();
                map.setView([avgLat, avgLon], 13);

                userLocations.forEach((location) => {
                    L.polyline([location, [avgLat, avgLon]], {
                        color: "blue",
                    }).addTo(map);
                });
            } else {
                console.log("Nessun indirizzo valido trovato");
            }
        })
        .catch((error) => {
            console.log("Errore: " + error);
        });
}

// Via Buttafuoco 25123
// Via Paolo Veronese 25123
