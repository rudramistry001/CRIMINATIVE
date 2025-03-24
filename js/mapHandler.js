// Map state
let map = null;
let locationMap = null;
let userMarker = null;
let userLocation = null;
let policeStations = [
    { name: "Central Police Station", address: "123 Main St, City Center", lat: 0, lng: 0, distance: "2.1 km" },
    { name: "North District Police", address: "456 North Ave, North District", lat: 0, lng: 0, distance: "3.7 km" }
];

export function initializeMaps() {
    console.log("Initializing maps...");
    // Initialize welcome screen map
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initialize location confirmation map
    locationMap = L.map('location-map').setView([51.505, -0.09], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(locationMap);

    // Get user location for initial map
    getUserLocation();

    // Add window resize handler for map
    window.addEventListener('resize', () => {
        if (map) {
            map.invalidateSize();
        }
        if (locationMap) {
            locationMap.invalidateSize();
        }
    });
}

export function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    userLocation = { lat, lng };
                    
                    // Update maps with user location
                    updateWelcomeMap(userLocation);
                    
                    // Update input field if on incident form
                    const locationInput = document.getElementById('incident-location');
                    if (locationInput) {
                        locationInput.value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
                    }
                    
                    resolve(userLocation);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to retrieve your location. Please enable location services in your browser settings.");
                    reject(error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            reject("Geolocation not supported");
        }
    });
}

function updateWelcomeMap(location) {
    if (!map) return;

    map.setView([location.lat, location.lng], 13);
    
    if (userMarker) {
        userMarker.setLatLng([location.lat, location.lng]);
    } else {
        userMarker = L.marker([location.lat, location.lng]).addTo(map);
        userMarker.bindPopup("You are here").openPopup();
    }

    // Add police stations to map
    updatePoliceStationsBasedOnLocation(location, map);
}

export function updateLocationMap(location) {
    if (!locationMap) return;

    locationMap.setView([location.lat, location.lng], 15);
    
    if (userMarker) {
        // Already have a marker on welcome map, create a new one for location map
        let locationMarker = L.marker([location.lat, location.lng], {
            draggable: true // Make this marker draggable
        }).addTo(locationMap);
        
        locationMarker.bindPopup("Drag to adjust incident location").openPopup();
        
        // Handle marker drag end
        locationMarker.on('dragend', function(event) {
            let marker = event.target;
            let position = marker.getLatLng();
            locationMap.panTo(position);
            
            // Update incident location in form
            const locationInput = document.getElementById('incident-location');
            if (locationInput) {
                locationInput.value = `Lat: ${position.lat.toFixed(6)}, Lng: ${position.lng.toFixed(6)}`;
            }
            
            // Update police stations based on new position
            updatePoliceStationsBasedOnLocation(position, locationMap);
        });
    }

    // Add police stations to map
    updatePoliceStationsBasedOnLocation(location, locationMap);
}

function updatePoliceStationsBasedOnLocation(location, targetMap) {
    if (!targetMap) return;

    // Clear existing police station markers
    targetMap.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer !== userMarker) {
            targetMap.removeLayer(layer);
        }
    });

    // Add police station markers at relative positions to user
    const police1 = {
        lat: location.lat + 0.01,
        lng: location.lng + 0.015
    };
    
    const police2 = {
        lat: location.lat - 0.01,
        lng: location.lng + 0.01
    };

    // Update our police station data
    policeStations[0].lat = police1.lat;
    policeStations[0].lng = police1.lng;
    policeStations[1].lat = police2.lat;
    policeStations[1].lng = police2.lng;

    // Add markers for police stations
    const policeIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Add markers for each police station
    policeStations.forEach(station => {
        const marker = L.marker([station.lat, station.lng], {icon: policeIcon}).addTo(targetMap);
        marker.bindPopup(`<strong>${station.name}</strong><br>${station.address}<br>${station.distance} from your location`);
    });

    // Update police stations list in the UI
    updatePoliceStationsList();
}

function updatePoliceStationsList() {
    const list = document.getElementById('police-stations-list');
    if (!list) return;

    list.innerHTML = '';
    
    policeStations.forEach(station => {
        const listItem = document.createElement('li');
        listItem.className = 'py-4 flex';
        listItem.innerHTML = `
            <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">${station.name}</p>
                <p class="text-sm text-gray-500">${station.address}</p>
                <p class="text-sm text-gray-500">${station.distance}</p>
            </div>
        `;
        
        // Add click event to center map on this police station
        listItem.addEventListener('click', () => {
            if (locationMap) {
                locationMap.setView([station.lat, station.lng], 15);
                
                // Find and open the popup for this station
                locationMap.eachLayer((layer) => {
                    if (layer instanceof L.Marker && 
                        layer.getLatLng().lat === station.lat && 
                        layer.getLatLng().lng === station.lng) {
                        layer.openPopup();
                    }
                });
            }
        });
        
        list.appendChild(listItem);
    });
} 