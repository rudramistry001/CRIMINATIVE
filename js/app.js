document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const onboardingScreen = document.getElementById('onboarding-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    const loginScreen = document.getElementById('login-screen');
    const incidentScreen = document.getElementById('incident-screen');
    const locationScreen = document.getElementById('location-screen');
    const confirmationScreen = document.getElementById('confirmation-screen');
    const historyScreen = document.getElementById('history-screen');
    const emergencyScreen = document.getElementById('emergency-screen');

    const loginBtn = document.getElementById('loginBtn');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const emergencyBtn = document.getElementById('emergencyBtn');
    const toggleAuthBtn = document.getElementById('toggleAuthBtn');
    const useCurrentLocationBtn = document.getElementById('use-current-location');
    const confirmLocationBtn = document.getElementById('confirm-location-btn');
    const backToReportBtn = document.getElementById('back-to-report');
    const submitReportBtn = document.getElementById('submit-report-btn');
    const downloadReportBtn = document.getElementById('download-report');
    const returnHomeBtn = document.getElementById('return-home');
    const cancelReportBtn = document.getElementById('cancel-report');
    const backToHomeFromHistoryBtn = document.getElementById('backToHomeFromHistory');
    const backToHomeFromEmergencyBtn = document.getElementById('backToHomeFromEmergency');
    const finishOnboardingBtn = document.getElementById('finishOnboarding');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authTitle = document.getElementById('auth-title');

    // Onboarding elements
    const nextButtons = document.querySelectorAll('.next-slide');
    const prevButtons = document.querySelectorAll('.prev-slide');
    const onboardingSlides = document.querySelectorAll('.onboarding-slide');

    // Check if first visit
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';

    // Maps and Location variables
    let map = null;
    let locationMap = null;
    let userMarker = null;
    let userLocation = null;
    let policeStations = [
        { name: "Central Police Station", address: "123 Main St, City Center", lat: 0, lng: 0, distance: "2.1 km" },
        { name: "North District Police", address: "456 North Ave, North District", lat: 0, lng: 0, distance: "3.7 km" }
    ];

    // Only initialize maps if onboarding is complete or not needed
    if (hasCompletedOnboarding || !onboardingScreen) {
        initMaps();
    }

    // Onboarding navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentSlide = document.querySelector('.onboarding-slide.active');
            const currentIndex = parseInt(currentSlide.getAttribute('data-slide'));
            const nextIndex = currentIndex + 1;
            
            currentSlide.classList.remove('active');
            currentSlide.classList.add('hidden');
            
            const nextSlide = document.querySelector(`.onboarding-slide[data-slide="${nextIndex}"]`);
            if (nextSlide) {
                nextSlide.classList.remove('hidden');
                nextSlide.classList.add('active');
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentSlide = document.querySelector('.onboarding-slide.active');
            const currentIndex = parseInt(currentSlide.getAttribute('data-slide'));
            const prevIndex = currentIndex - 1;
            
            currentSlide.classList.remove('active');
            currentSlide.classList.add('hidden');
            
            const prevSlide = document.querySelector(`.onboarding-slide[data-slide="${prevIndex}"]`);
            if (prevSlide) {
                prevSlide.classList.remove('hidden');
                prevSlide.classList.add('active');
            }
        });
    });

    if (finishOnboardingBtn) {
        finishOnboardingBtn.addEventListener('click', function() {
            localStorage.setItem('hasCompletedOnboarding', 'true');
            onboardingScreen.classList.add('hidden');
            welcomeScreen.classList.remove('hidden');
            
            // Initialize maps after onboarding is complete
            if (!map) {
                initMaps();
            }
        });
    }

    // Navigation event listeners
    loginBtn.addEventListener('click', () => {
        hideAllScreens();
        loginScreen.classList.remove('hidden');
    });

    getStartedBtn.addEventListener('click', () => {
        hideAllScreens();
        incidentScreen.classList.remove('hidden');
    });

    emergencyBtn.addEventListener('click', () => {
        hideAllScreens();
        emergencyScreen.classList.remove('hidden');
    });

    toggleAuthBtn.addEventListener('click', () => {
        if (loginForm.classList.contains('hidden')) {
            // Switch to login
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            toggleAuthBtn.textContent = 'Register';
            authTitle.textContent = 'Login';
        } else {
            // Switch to register
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            toggleAuthBtn.textContent = 'Login';
            authTitle.textContent = 'Register';
        }
    });

    useCurrentLocationBtn.addEventListener('click', () => {
        if (!userLocation) {
            getUserLocation();
        } else {
            document.getElementById('incident-location').value = `Lat: ${userLocation.lat.toFixed(6)}, Lng: ${userLocation.lng.toFixed(6)}`;
        }
    });

    confirmLocationBtn.addEventListener('click', () => {
        hideAllScreens();
        locationScreen.classList.remove('hidden');
        setTimeout(() => {
            locationMap.invalidateSize();
            if (userLocation) {
                updateLocationMap(userLocation);
            } else {
                getUserLocation().then(loc => {
                    updateLocationMap(loc);
                });
            }
        }, 100);
    });

    backToReportBtn.addEventListener('click', () => {
        hideAllScreens();
        incidentScreen.classList.remove('hidden');
    });

    submitReportBtn.addEventListener('click', () => {
        // Simulate report submission
        hideAllScreens();
        confirmationScreen.classList.remove('hidden');
        
        // Update report summary with form data
        updateReportSummary();
    });

    cancelReportBtn.addEventListener('click', () => {
        hideAllScreens();
        welcomeScreen.classList.remove('hidden');
    });

    returnHomeBtn.addEventListener('click', () => {
        hideAllScreens();
        welcomeScreen.classList.remove('hidden');
    });

    // Add navigation for new screens
    if (backToHomeFromHistoryBtn) {
        backToHomeFromHistoryBtn.addEventListener('click', () => {
            hideAllScreens();
            welcomeScreen.classList.remove('hidden');
        });
    }

    if (backToHomeFromEmergencyBtn) {
        backToHomeFromEmergencyBtn.addEventListener('click', () => {
            hideAllScreens();
            welcomeScreen.classList.remove('hidden');
        });
    }

    // Nav menu links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const text = e.target.textContent.toLowerCase();
            
            if (text === 'home') {
                hideAllScreens();
                welcomeScreen.classList.remove('hidden');
            } else if (text === 'report incident') {
                hideAllScreens();
                incidentScreen.classList.remove('hidden');
            } else if (text === 'history') {
                hideAllScreens();
                historyScreen.classList.remove('hidden');
            } else if (text === 'emergency contacts') {
                hideAllScreens();
                emergencyScreen.classList.remove('hidden');
            }
        });
    });

    // Form submission handlers
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality would connect to a backend server in a real application.');
        hideAllScreens();
        welcomeScreen.classList.remove('hidden');
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Registration functionality would connect to a backend server in a real application.');
        hideAllScreens();
        welcomeScreen.classList.remove('hidden');
    });

    // Helper Functions
    function hideAllScreens() {
        welcomeScreen.classList.add('hidden');
        loginScreen.classList.add('hidden');
        incidentScreen.classList.add('hidden');
        locationScreen.classList.add('hidden');
        confirmationScreen.classList.add('hidden');
        historyScreen.classList.add('hidden');
        emergencyScreen.classList.add('hidden');
    }

    function initMaps() {
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
    }

    function getUserLocation() {
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
                        if (!incidentScreen.classList.contains('hidden')) {
                            document.getElementById('incident-location').value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
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

    function updateLocationMap(location) {
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
                document.getElementById('incident-location').value = `Lat: ${position.lat.toFixed(6)}, Lng: ${position.lng.toFixed(6)}`;
                
                // Update police stations based on new position
                updatePoliceStationsBasedOnLocation(position, locationMap);
            });
        } else {
            // Create a new marker for location map
            let locationMarker = L.marker([location.lat, location.lng], {
                draggable: true
            }).addTo(locationMap);
            
            locationMarker.bindPopup("Drag to adjust incident location").openPopup();
        }

        // Add police stations to map
        updatePoliceStationsBasedOnLocation(location, locationMap);
    }

    function updatePoliceStationsBasedOnLocation(location, targetMap) {
        // In a real app, you would fetch nearby police stations from an API
        // For demo purposes, we'll use our dummy data and just adjust positions

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
                locationMap.setView([station.lat, station.lng], 15);
                
                // Find and open the popup for this station
                locationMap.eachLayer((layer) => {
                    if (layer instanceof L.Marker && 
                        layer.getLatLng().lat === station.lat && 
                        layer.getLatLng().lng === station.lng) {
                        layer.openPopup();
                    }
                });
            });
            
            list.appendChild(listItem);
        });
    }

    function updateReportSummary() {
        // Get values from form
        const incidentType = document.getElementById('incident-type').value;
        const description = document.getElementById('incident-description').value;
        const location = document.getElementById('incident-location').value;
        const date = document.getElementById('incident-date').value;
        
        // Generate a random report ID
        const reportId = 'CR-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 100000);
        
        // Update summary elements
        document.getElementById('summary-id').textContent = reportId;
        document.getElementById('summary-date').textContent = new Date().toLocaleDateString();
        document.getElementById('summary-type').textContent = getIncidentTypeText(incidentType);
        document.getElementById('summary-location').textContent = location;
        document.getElementById('summary-description').textContent = description || 'No description provided';
    }
    
    function getIncidentTypeText(value) {
        const types = {
            'robbery': 'Robbery',
            'assault': 'Assault',
            'theft': 'Theft',
            'traffic': 'Traffic Accident',
            'vandalism': 'Vandalism',
            'other': 'Other'
        };
        
        return types[value] || 'Not specified';
    }

    // Initialize with welcome screen
    hideAllScreens();
    
    // Check if the user has completed onboarding
    if (!hasCompletedOnboarding && onboardingScreen) {
        onboardingScreen.classList.remove('hidden');
    } else {
        welcomeScreen.classList.remove('hidden');
    }
}); 