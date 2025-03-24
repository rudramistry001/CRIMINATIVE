export function renderEmergency() {
    return `
    <section id="emergency-screen" class="screen hidden">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold">Emergency Contacts</h1>
                <button id="backToHomeFromEmergency" class="btn btn-secondary">Back to Home</button>
            </div>

            <div class="emergency-section">
                <h3>Important Numbers</h3>
                <div class="emergency-contact-list">
                    <div class="emergency-contact-card police">
                        <div class="contact-name">National Emergency Number</div>
                        <div class="contact-description">For any emergency situation</div>
                        <div class="contact-number">112</div>
                        <button class="btn btn-primary" onclick="window.location.href='tel:112'">Call</button>
                    </div>

                    <div class="emergency-contact-card police">
                        <div class="contact-name">Vadodara Police</div>
                        <div class="contact-description">Local police control room</div>
                        <div class="contact-number">100</div>
                        <button class="btn btn-primary" onclick="window.location.href='tel:100'">Call</button>
                    </div>

                    <div class="emergency-contact-card women">
                        <div class="contact-name">Women Helpline</div>
                        <div class="contact-description">24/7 women safety helpline</div>
                        <div class="contact-number">1091</div>
                        <button class="btn btn-primary" onclick="window.location.href='tel:1091'">Call</button>
                    </div>

                    <div class="emergency-contact-card">
                        <div class="contact-name">Traffic Police</div>
                        <div class="contact-description">For traffic-related emergencies</div>
                        <div class="contact-number">103</div>
                        <button class="btn btn-primary" onclick="window.location.href='tel:103'">Call</button>
                    </div>
                </div>
            </div>

            <div class="emergency-section">
                <h3>Nearby Police Stations</h3>
                <div id="police-stations-list"></div>
            </div>

            <div class="emergency-section">
                <h3>Personal Emergency Contacts</h3>
                <div class="personal-contact-list">
                    <div class="personal-contact-item">
                        <div class="personal-contact-header">
                            <div class="personal-contact-name">John Doe</div>
                            <div class="personal-contact-relationship">Family</div>
                        </div>
                        <div class="personal-contact-phone">+91 98765 43210</div>
                        <div class="personal-contact-actions">
                            <button class="btn btn-primary" onclick="window.location.href='tel:+919876543210'">Call</button>
                            <button class="btn btn-secondary">Edit</button>
                        </div>
                    </div>

                    <div class="personal-contact-item">
                        <div class="personal-contact-header">
                            <div class="personal-contact-name">Jane Smith</div>
                            <div class="personal-contact-relationship">Friend</div>
                        </div>
                        <div class="personal-contact-phone">+91 98765 43211</div>
                        <div class="personal-contact-actions">
                            <button class="btn btn-primary" onclick="window.location.href='tel:+919876543211'">Call</button>
                            <button class="btn btn-secondary">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
} 