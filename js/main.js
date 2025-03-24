import { renderOnboarding } from '../components/Onboarding.js';
import { renderWelcome } from '../components/Welcome.js';
import { renderEmergency } from '../components/Emergency.js';
import { initializeNavigation, navigateToScreen } from './navigation.js';
import { initializeMaps } from './mapHandler.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Render components
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        ${renderOnboarding()}
        ${renderWelcome()}
        ${renderEmergency()}
    `;

    // Initialize navigation
    initializeNavigation();

    // Initialize event listeners and functionality
    initializeEventListeners();

    // Check if we should initialize maps
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    if (hasCompletedOnboarding) {
        initializeMaps();
    }
}

function initializeEventListeners() {
    // Get DOM elements
    const onboardingScreen = document.getElementById('onboarding-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    const emergencyScreen = document.getElementById('emergency-screen');

    const nextButtons = document.querySelectorAll('.next-slide');
    const prevButtons = document.querySelectorAll('.prev-slide');
    const finishOnboardingBtn = document.getElementById('finishOnboarding');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const emergencyBtn = document.getElementById('emergencyBtn');

    // Check if first visit
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';

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

    // Finish onboarding
    if (finishOnboardingBtn) {
        finishOnboardingBtn.addEventListener('click', function() {
            localStorage.setItem('hasCompletedOnboarding', 'true');
            initializeMaps(); // Initialize maps after onboarding
            navigateToScreen('home');
        });
    }

    // Navigation buttons
    getStartedBtn?.addEventListener('click', () => {
        navigateToScreen('report');
    });

    emergencyBtn?.addEventListener('click', () => {
        navigateToScreen('emergency');
    });

    // Initialize with appropriate screen
    if (!hasCompletedOnboarding && onboardingScreen) {
        onboardingScreen.classList.remove('hidden');
    } else {
        navigateToScreen('home');
    }
} 