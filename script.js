var events = [
    {
        id: 1,
        title: 'Neon Dreams: Synthwave Concert',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
        date: 'March 15, 2024',
        venue: 'Phoenix Arena, Mumbai',
        category: 'Music',
        city: 'Mumbai',
        price: 1500
    },
    {
        id: 2,
        title: 'Laugh Out Loud: Standup Special',
        image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=600&fit=crop',
        date: 'March 20, 2024',
        venue: 'Comedy Central, Delhi',
        category: 'Comedy',
        city: 'Delhi',
        price: 800
    },
    {
        id: 3,
        title: 'Tech Innovators Summit 2024',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
        date: 'March 25, 2024',
        venue: 'Convention Hall, Bengaluru',
        category: 'Workshop',
        city: 'Bengaluru',
        price: 2500
    },
    {
        id: 4,
        title: 'Sunburn Arena: DJ Snake',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
        date: 'April 5, 2024',
        venue: 'Beach Paradise, Goa',
        category: 'Nightlife',
        city: 'Goa',
        price: 3000
    },
    {
        id: 5,
        title: 'Midnight Jazz & Blues',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop',
        date: 'March 28, 2024',
        venue: 'Blue Note Club, Mumbai',
        category: 'Music',
        city: 'Mumbai',
        price: 1200
    },
    {
        id: 6,
        title: 'Pottery & Wine Workshop',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop',
        date: 'April 10, 2024',
        venue: 'Creative Studio, Pune',
        category: 'Workshop',
        city: 'Pune',
        price: 1800
    },
    {
        id: 7,
        title: 'Culinary Masterclass: Italian',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
        date: 'April 15, 2024',
        venue: 'Chef Kitchen, Bengaluru',
        category: 'Workshop',
        city: 'Bengaluru',
        price: 2200
    },
    {
        id: 8,
        title: 'Indie Rock Night',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop',
        date: 'April 20, 2024',
        venue: 'Underground Club, Delhi',
        category: 'Nightlife',
        city: 'Delhi',
        price: 1000
    }
];

var filteredEvents = [];
var selectedCategory = 'all';
var selectedCity = 'all';
var myTickets = [];
var currentEvent = null;
var currentQuantity = 1;

function startApp() {
    filterAndShowEvents();
    connectAllButtons();
}

function connectAllButtons() {
    var filterButtons = document.querySelectorAll('.filter-btn');
    for (var i = 0; i < filterButtons.length; i++) {
        filterButtons[i].onclick = whenCategoryClicked;
    }
    document.getElementById('cityFilter').onchange = whenCityChanged;
    document.getElementById('myTicketsBtn').onclick = showOrHideTickets;
    document.getElementById('backHomeBtn').onclick = goBackToEvents;
    document.getElementById('modalClose').onclick = closePopup;
    document.getElementById('increaseBtn').onclick = addMoreTickets;
    document.getElementById('decreaseBtn').onclick = removeSomeTickets;
    document.getElementById('bookBtn').onclick = confirmBooking;
    document.getElementById('modalOverlay').onclick = function(e) {
        if (e.target === document.getElementById('modalOverlay')) {
            closePopup();
        }
    };
}

function whenCategoryClicked(e) {
    var allButtons = document.querySelectorAll('.filter-btn');
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].className = 'filter-btn';
    }
    e.target.className = 'filter-btn active';
    selectedCategory = e.target.getAttribute('data-category');
    filterAndShowEvents();
}

function whenCityChanged(e) {
    selectedCity = e.target.value;
    filterAndShowEvents();
}

function filterAndShowEvents() {
    filteredEvents = [];
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var categoryMatches = false;
        var cityMatches = false;

        if (selectedCategory === 'all') {
            categoryMatches = true;
        } else {
            if (event.category === selectedCategory) {
                categoryMatches = true;
            }
        }

        if (selectedCity === 'all') {
            cityMatches = true;
        } else {
            if (event.city === selectedCity) {
                cityMatches = true;
            }
        }

        if (categoryMatches === true && cityMatches === true) {
            filteredEvents.push(event);
        }
    }
    showEventsOnPage();
}

function showEventsOnPage() {
    var eventsContainer = document.getElementById('eventsGrid');

    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = '<div class="empty-state"><p>No events found. Try different filters!</p></div>';
        return;
    }

    var htmlCode = '';
    for (var i = 0; i < filteredEvents.length; i++) {
        var event = filteredEvents[i];
        htmlCode = htmlCode + '<div class="event-card" onclick="openPopup(' + event.id + ')">';
        htmlCode = htmlCode + '<img src="' + event.image + '" alt="' + event.title + '" class="event-image">';
        htmlCode = htmlCode + '<div class="event-details">';
        htmlCode = htmlCode + '<span class="event-category">' + event.category + '</span>';
        htmlCode = htmlCode + '<h3 class="event-title">' + event.title + '</h3>';
        htmlCode = htmlCode + '<p class="event-info">Date: ' + event.date + '</p>';
        htmlCode = htmlCode + '<p class="event-info">Venue: ' + event.venue + '</p>';
        htmlCode = htmlCode + '<p class="event-price">Rs ' + event.price + '</p>';
        htmlCode = htmlCode + '</div>';
        htmlCode = htmlCode + '</div>';
    }
    eventsContainer.innerHTML = htmlCode;
}

function openPopup(eventId) {
    currentEvent = null;
    for (var i = 0; i < events.length; i++) {
        if (events[i].id === eventId) {
            currentEvent = events[i];
            break;
        }
    }

    if (currentEvent === null) {
        return;
    }

    currentQuantity = 1;

    document.getElementById('modalImage').src = currentEvent.image;
    document.getElementById('modalTitle').innerHTML = currentEvent.title;
    document.getElementById('modalDate').innerHTML = currentEvent.date;
    document.getElementById('modalVenue').innerHTML = currentEvent.venue;
    document.getElementById('modalCategory').innerHTML = currentEvent.category;

    updatePriceDisplay();

    document.getElementById('modalOverlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('modalOverlay').style.display = 'none';
    currentEvent = null;
}

function addMoreTickets() {
    if (currentQuantity < 10) {
        currentQuantity = currentQuantity + 1;
        updatePriceDisplay();
    }
}

function removeSomeTickets() {
    if (currentQuantity > 1) {
        currentQuantity = currentQuantity - 1;
        updatePriceDisplay();
    }
}

function updatePriceDisplay() {
    var total = currentEvent.price * currentQuantity;
    document.getElementById('qtyValue').innerHTML = currentQuantity;
    document.getElementById('totalPrice').innerHTML = 'Rs ' + total;
}

function confirmBooking() {
    var newBooking = {
        eventId: currentEvent.id,
        title: currentEvent.title,
        image: currentEvent.image,
        date: currentEvent.date,
        venue: currentEvent.venue,
        quantity: currentQuantity,
        pricePerTicket: currentEvent.price,
        total: currentEvent.price * currentQuantity
    };

    myTickets.push(newBooking);
    alert('Booking Confirmed!\n\nEvent: ' + currentEvent.title + '\nTickets: ' + currentQuantity + '\nTotal: Rs ' + (currentEvent.price * currentQuantity));
    closePopup();
}

function showOrHideTickets() {
    var eventsSection = document.getElementById('eventsSection');
    var ticketsSection = document.getElementById('ticketsSection');

    if (ticketsSection.style.display === 'block') {
        ticketsSection.style.display = 'none';
        eventsSection.style.display = 'block';
    } else {
        eventsSection.style.display = 'none';
        ticketsSection.style.display = 'block';
        showTicketsOnPage();
    }
}

function goBackToEvents() {
    document.getElementById('eventsSection').style.display = 'block';
    document.getElementById('ticketsSection').style.display = 'none';
}

function showTicketsOnPage() {
    var ticketsContainer = document.getElementById('ticketsGrid');

    if (myTickets.length === 0) {
        ticketsContainer.innerHTML = '<div class="empty-state"><p>You have not booked any tickets yet!</p></div>';
        return;
    }

    var htmlCode = '';
    for (var i = 0; i < myTickets.length; i++) {
        var ticket = myTickets[i];
        htmlCode = htmlCode + '<div class="ticket-card">';
        htmlCode = htmlCode + '<img src="' + ticket.image + '" alt="' + ticket.title + '" class="ticket-image">';
        htmlCode = htmlCode + '<div class="ticket-info">';
        htmlCode = htmlCode + '<h3 class="ticket-title">' + ticket.title + '</h3>';
        htmlCode = htmlCode + '<p class="ticket-detail">Date: ' + ticket.date + '</p>';
        htmlCode = htmlCode + '<p class="ticket-detail">Venue: ' + ticket.venue + '</p>';
        htmlCode = htmlCode + '<p class="ticket-detail">Tickets: ' + ticket.quantity + '</p>';
        htmlCode = htmlCode + '</div>';
        htmlCode = htmlCode + '<div class="ticket-pricing">';
        htmlCode = htmlCode + '<p>Rs ' + ticket.pricePerTicket + ' x ' + ticket.quantity + '</p>';
        htmlCode = htmlCode + '<p class="ticket-total">Rs ' + ticket.total + '</p>';
        htmlCode = htmlCode + '</div>';
        htmlCode = htmlCode + '<div class="clearfix"></div>';
        htmlCode = htmlCode + '</div>';
    }
    ticketsContainer.innerHTML = htmlCode;
}

startApp();
