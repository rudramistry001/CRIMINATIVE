// Navigation state
let currentScreen = null;

export function initializeNavigation() {
    // Add click handlers to all nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const screen = e.target.getAttribute('data-screen');
            navigateToScreen(screen);
        });
    });

    // Add click handlers for back buttons
    document.getElementById('backToHomeFromEmergency')?.addEventListener('click', () => {
        navigateToScreen('home');
    });
}

export function navigateToScreen(screenId) {
    // Hide all screens
    hideAllScreens();

    // Show the requested screen
    const screen = document.getElementById(`${screenId}-screen`);
    if (screen) {
        screen.classList.remove('hidden');
        currentScreen = screenId;
    }

    // Special handling for screens that need map refresh
    if (screenId === 'welcome' || screenId === 'home') {
        // Trigger map refresh if needed
        const map = document.getElementById('map');
        if (map) {
            window.dispatchEvent(new Event('resize'));
        }
    }
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
}

export function getCurrentScreen() {
    return currentScreen;
} 