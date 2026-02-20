document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.getElementById('cta-button');
    const planningForm = document.getElementById('planning-form');
    const planList = document.getElementById('plan-list');

    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.getElementById('planner').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (planningForm) {
        planningForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const destination = document.getElementById('destination').value;
            const date = document.getElementById('date').value;
            const activityType = document.getElementById('activity-type').value;

            if (destination && date) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span><strong>${activityType.toUpperCase()}</strong> at ${destination}</span>
                    <span>${date}</span>
                `;
                
                planList.appendChild(listItem);
                planningForm.reset();
            }
        });
    }

    const navLinks = document.querySelectorAll('#nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});