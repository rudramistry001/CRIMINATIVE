# CrimeNative - Crime Reporting Web Application

A responsive web application built with HTML and Tailwind CSS for reporting crime incidents with live location detection.

## Features

- **User-friendly Interface**: Modern, responsive design optimized for both mobile and desktop devices.
- **Onboarding Experience**: Tutorial for first-time users explaining the app's key features.
- **Live Location Detection**: Automatically detects and displays the user's current location on a map.
- **Incident Reporting**: Comprehensive form for reporting various types of crime incidents.
- **Location Confirmation**: Interactive map interface to confirm and adjust the incident location.
- **Nearby Police Stations**: Displays nearby police stations on the map relative to the incident location.
- **Report Summary**: Generates a detailed summary of the submitted report with a unique tracking ID.
- **Report History**: View past reports with their current status and details.
- **Emergency Contacts**: Quick access to police, medical, and other emergency numbers.
- **User Authentication**: Login and registration functionality (frontend only in this demo).

## Technical Stack

- **HTML5**: For structuring the application.
- **Tailwind CSS**: For styling via CDN.
- **JavaScript**: For client-side functionality.
- **Leaflet.js**: For interactive maps and location services.
- **LocalStorage**: For storing onboarding preferences and demo data.

## Project Structure

```
├── index.html           # Main HTML file
├── css/
│   └── styles.css       # Custom CSS styles
├── js/
│   └── app.js           # JavaScript functionality
└── components/          # For future component-based architecture
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/criminative.git
   ```

2. Open the project directory:
   ```
   cd criminative
   ```

3. Open `index.html` in your web browser:
   - Double-click the file or use Live Server in VS Code

## Usage

1. **Onboarding**: First-time users will see a guided walkthrough of the application's features.
2. **Home Screen**: View your current location and access the reporting feature.
3. **Login/Register**: Create an account or sign in (demo only).
4. **Report Incident**: Fill out the incident details form.
5. **Confirm Location**: Verify and adjust the incident location on the map.
6. **Review Submission**: Get a summary and reference number for your report.
7. **History**: Access your past reports and check their current status.
8. **Emergency Contacts**: Quickly access emergency numbers and nearby police stations.

## Important Notes

- This is a frontend-only demonstration. In a production environment, it would need to be connected to a backend server.
- The location service requires permission from your browser to access your location.
- Police station data is simulated and would be replaced with real API data in a production version.
- The history and emergency contacts contain demo data for Vadodara, Gujarat, India.

## Future Enhancements

- Backend integration with a database for storing reports and user information.
- Real API integration for police station locations.
- Push notifications for report status updates.
- Offline functionality for areas with poor connectivity.
- Multilingual support.
- Emergency SOS feature with one-tap calling.
- Integration with local emergency services.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Leaflet.js for the mapping functionality.
- Tailwind CSS for the styling framework.
- OpenStreetMap for map tiles. 