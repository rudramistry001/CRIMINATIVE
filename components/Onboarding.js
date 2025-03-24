export function renderOnboarding() {
    return `
    <section id="onboarding-screen" class="hidden">
        <div class="onboarding-slide active" data-slide="1">
            <img src="public/images/location.svg" alt="Location tracking">
            <h2>Live Location Tracking</h2>
            <p>We use your location to find nearby police stations and help authorities respond quickly in emergencies.</p>
            <div class="onboarding-nav">
                <button class="btn btn-secondary prev-slide" disabled>Back</button>
                <button class="btn btn-primary next-slide">Next</button>
            </div>
        </div>

        <div class="onboarding-slide hidden" data-slide="2">
            <img src="public/images/report.svg" alt="Report incident">
            <h2>Easy Incident Reporting</h2>
            <p>Report incidents quickly and efficiently with our user-friendly form. Track the status of your reports in real-time.</p>
            <div class="onboarding-nav">
                <button class="btn btn-secondary prev-slide">Back</button>
                <button class="btn btn-primary next-slide">Next</button>
            </div>
        </div>

        <div class="onboarding-slide hidden" data-slide="3">
            <img src="public/images/community.svg" alt="Community safety">
            <h2>Community Safety</h2>
            <p>Join our community effort to make Vadodara safer. Your reports help law enforcement improve security in your area.</p>
            <div class="onboarding-nav">
                <button class="btn btn-secondary prev-slide">Back</button>
                <button class="btn btn-primary" id="finishOnboarding">Get Started</button>
            </div>
        </div>
    </section>`;
} 