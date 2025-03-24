export function renderWelcome() {
    return `
    <section id="welcome-screen" class="screen hidden">
        <div class="container mx-auto px-4">
            <h1 class="text-3xl font-bold mb-4">Welcome to CrimeNative</h1>
            <p class="text-gray-600 mb-6">Your safety is our priority. Report incidents, track their status, and stay connected with local law enforcement.</p>
            
            <div class="hero-cta">
                <button id="getStartedBtn" class="btn btn-primary">Report Incident</button>
                <button id="emergencyBtn" class="btn btn-emergency">Emergency</button>
            </div>

            <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4">Your Location</h2>
                <div id="map" class="map-container"></div>
                <p class="text-sm text-gray-500 mt-2">Showing nearby police stations and your current location</p>
            </div>
        </div>
    </section>`;
} 