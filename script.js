// ========================================
// PORTFOLIO WEBSITE - AUTO-GENERATION SCRIPT
// ========================================

// Navigation functionality
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionName).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Zoom control functions
function zoomIn() {
    const newZoom = currentZoom * 1.3;
    if (newZoom <= 5) {
        currentZoom = newZoom;
        const zoomImage = document.getElementById('zoomImage');
        updateImageTransform(zoomImage);
    }
}

function zoomOut() {
    const newZoom = currentZoom / 1.3;
    if (newZoom >= 0.5) {
        currentZoom = newZoom;
        const zoomImage = document.getElementById('zoomImage');
        updateImageTransform(zoomImage);
    }
}

function resetZoom() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    const zoomImage = document.getElementById('zoomImage');
    updateImageTransform(zoomImage);
}

// ========================================
// SORTING AND DATA PROCESSING
// ========================================

// Function to parse date strings and sort by latest date
function parseDate(dateString) {
    // Handle various date formats: "December 2024", "Jan 2025", "2024-12", etc.
    const months = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
        'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11,
        'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
        'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
    };
    
    const parts = dateString.toLowerCase().trim().split(' ');
    
    if (parts.length >= 2) {
        const monthStr = parts[0];
        const year = parseInt(parts[1]);
        const month = months[monthStr] !== undefined ? months[monthStr] : 0;
        return new Date(year, month, 1);
    }
    
    // Fallback: try to parse as regular date
    return new Date(dateString);
}

function sortByLatestDate(items) {
    return [...items].sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateB - dateA; // Newest first (descending order)
    });
}

// ========================================
// ARTWORK GENERATION (SORTED BY DATE)
// ========================================
function generateArtworkTimeline() {
    const container = document.getElementById('drawings-timeline');
    
    // Sort artworks by latest date first
    const sortedArtworks = sortByLatestDate(artworks);
    
    sortedArtworks.forEach((artwork, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-date">${artwork.date}</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content drawing-timeline-content">
                <div class="timeline-arrow"></div>
                <div class="artwork-container" onclick="openZoom('${artwork.image}', '${artwork.title}', '${artwork.date} - ${artwork.materials}')">
                    <div class="drawing-placeholder-timeline">
                        <img src="${artwork.image}" alt="${artwork.alt}" class="artwork-photo">
                        <div class="artwork-overlay"></div>
                        <div class="artwork-authenticity">ORIGINAL ARTWORK</div>
                        <div class="medium-tag">${artwork.medium}</div>
                        <!--<div class="artwork-watermark">© ${config.name} ${config.year}</div>-->
                        <div class="click-hint">🔍 Click to zoom</div>
                    </div>
                </div>
                <h3>${artwork.title}</h3>
                <div class="artwork-details">
                    <div class="artwork-specs">
                        <div class="spec-item">📐 <span>${artwork.size}</span></div>
                        <div class="spec-item">🎨 <span>${artwork.materials}</span></div>
                        <div class="spec-item">📅 <span>${artwork.date}</span></div>
                    </div>
                    <p>${artwork.description}</p>
                    <div class="protection-notice">
                        ${artwork.notice}
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(timelineItem);
    });
}

// ========================================
// BOOK REVIEWS GENERATION (SORTED BY DATE)
// ========================================
function generateBooksTimeline() {
    const container = document.getElementById('books-timeline');
    
    // Sort books by latest date first
    const sortedBooks = sortByLatestDate(books);
    
    sortedBooks.forEach((book, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Generate star rating
        const stars = Array.from({length: 5}, (_, i) => 
            i < book.rating ? '★' : '☆'
        ).map(star => `<span class="star">${star}</span>`).join('');
        
        timelineItem.innerHTML = `
            <div class="timeline-date">${book.date}</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content book-timeline-content">
                <div class="timeline-arrow"></div>
                <h3 class="book-timeline-title">${book.title}</h3>
                <p class="book-timeline-author">by ${book.author}</p>
                <div class="rating">
                    ${stars}
                </div>
                <p>${book.review}</p>
            </div>
        `;
        
        container.appendChild(timelineItem);
    });
}

// ========================================
// GAMES GENERATION (SORTED BY DATE)
// ========================================
function generateGamesTimeline() {
    const container = document.getElementById('games-timeline');
    
    // Sort games by latest date first
    const sortedGames = sortByLatestDate(games);
    
    sortedGames.forEach((game, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Determine status class and text
        const statusClass = `status-${game.status}`;
        const statusText = game.status === 'playing' ? 'Currently Playing' :
                          game.status === 'completed' ? 'Completed' :
                          game.status === 'backlog' ? 'In Backlog' : 'Unknown Status';
        
        timelineItem.innerHTML = `
            <div class="timeline-date">${game.date}</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content game-timeline-content">
                <div class="timeline-arrow"></div>
                <div class="game-timeline-header">
                    <div class="game-timeline-icon">${game.icon}</div>
                    <div>
                        <h3>${game.title}</h3>
                        <div class="game-platform">${game.platform}</div>
                    </div>
                </div>
                <div class="game-status ${statusClass}">${statusText}</div>
                <div class="game-hours">⏱️ ${game.hours}</div>
                <p>${game.review}</p>
            </div>
        `;
        
        container.appendChild(timelineItem);
    });
}

// ========================================
// ZOOM FUNCTIONALITY WITH ZOOM IN/OUT
// ========================================
let currentZoom = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

function openZoom(imageSrc, title, info) {
    const modal = document.getElementById('zoomModal');
    const zoomImage = document.getElementById('zoomImage');
    const zoomInfo = document.getElementById('zoomInfo');
    
    // Reset zoom and position
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    
    zoomImage.src = imageSrc;
    zoomImage.alt = title;
    zoomInfo.textContent = title + ' - ' + info;
    
    // Apply initial transform
    updateImageTransform(zoomImage);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add zoom and pan event listeners
    addZoomListeners(zoomImage);
}

function closeZoom() {
    const modal = document.getElementById('zoomModal');
    const zoomImage = document.getElementById('zoomImage');
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Remove event listeners
    removeZoomListeners(zoomImage);
    
    // Reset values
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
}

function updateImageTransform(image) {
    image.style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
}

function addZoomListeners(image) {
    // Mouse wheel zoom
    image.addEventListener('wheel', handleWheelZoom, { passive: false });
    
    // Touch events for mobile
    image.addEventListener('touchstart', handleTouchStart, { passive: false });
    image.addEventListener('touchmove', handleTouchMove, { passive: false });
    image.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Mouse drag events
    image.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Double-click to zoom
    image.addEventListener('dblclick', handleDoubleClick);
    
    // Prevent default image behaviors
    image.style.pointerEvents = 'auto';
    image.style.cursor = 'grab';
}

function removeZoomListeners(image) {
    image.removeEventListener('wheel', handleWheelZoom);
    image.removeEventListener('touchstart', handleTouchStart);
    image.removeEventListener('touchmove', handleTouchMove);
    image.removeEventListener('touchend', handleTouchEnd);
    image.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    image.removeEventListener('dblclick', handleDoubleClick);
    
    image.style.pointerEvents = 'none';
    image.style.cursor = 'default';
}

// Mouse wheel zoom
function handleWheelZoom(e) {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = currentZoom * delta;
    
    // Limit zoom range
    if (newZoom >= 0.5 && newZoom <= 5) {
        currentZoom = newZoom;
        updateImageTransform(e.target);
    }
}

// Touch events for pinch-to-zoom
let lastTouchDistance = 0;
let touches = [];

function handleTouchStart(e) {
    e.preventDefault();
    touches = Array.from(e.touches);
    
    if (touches.length === 1) {
        // Single touch - start dragging
        isDragging = true;
        startX = touches[0].clientX - translateX;
        startY = touches[0].clientY - translateY;
        e.target.style.cursor = 'grabbing';
    } else if (touches.length === 2) {
        // Two finger pinch
        lastTouchDistance = getTouchDistance(touches[0], touches[1]);
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    touches = Array.from(e.touches);
    
    if (touches.length === 1 && isDragging) {
        // Single touch - drag
        translateX = touches[0].clientX - startX;
        translateY = touches[0].clientY - startY;
        updateImageTransform(e.target);
    } else if (touches.length === 2) {
        // Two finger pinch - zoom
        const currentDistance = getTouchDistance(touches[0], touches[1]);
        const scale = currentDistance / lastTouchDistance;
        const newZoom = currentZoom * scale;
        
        if (newZoom >= 0.5 && newZoom <= 5) {
            currentZoom = newZoom;
            updateImageTransform(e.target);
        }
        
        lastTouchDistance = currentDistance;
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    isDragging = false;
    e.target.style.cursor = 'grab';
}

function getTouchDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Mouse drag events
function handleMouseDown(e) {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    e.target.style.cursor = 'grabbing';
}

function handleMouseMove(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    
    const zoomImage = document.getElementById('zoomImage');
    updateImageTransform(zoomImage);
}

function handleMouseUp(e) {
    isDragging = false;
    const zoomImage = document.getElementById('zoomImage');
    if (zoomImage) {
        zoomImage.style.cursor = 'grab';
    }
}

// Double-click to zoom
function handleDoubleClick(e) {
    e.preventDefault();
    
    if (currentZoom === 1) {
        // Zoom in to 2x
        currentZoom = 2;
    } else {
        // Reset to fit
        currentZoom = 1;
        translateX = 0;
        translateY = 0;
    }
    
    updateImageTransform(e.target);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Easy function to add new artwork (automatically sorts by date)
function addArtwork(artworkData) {
    artworks.push(artworkData); // Add to array
    refreshDrawingsTimeline(); // Refresh will automatically sort
}

// Easy function to add new book (automatically sorts by date)
function addBook(bookData) {
    books.push(bookData); // Add to array
    refreshBooksTimeline(); // Refresh will automatically sort
}

// Easy function to add new game (automatically sorts by date)
function addGame(gameData) {
    games.push(gameData); // Add to array
    refreshGamesTimeline(); // Refresh will automatically sort
}

// Refresh functions
function refreshDrawingsTimeline() {
    document.getElementById('drawings-timeline').innerHTML = '';
    generateArtworkTimeline();
}

function refreshBooksTimeline() {
    document.getElementById('books-timeline').innerHTML = '';
    generateBooksTimeline();
}

function refreshGamesTimeline() {
    document.getElementById('games-timeline').innerHTML = '';
    generateGamesTimeline();
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Generate all content from data
    generateArtworkTimeline();
    generateBooksTimeline();
    generateGamesTimeline();
    
    // Update personal information
    updatePersonalInfo();
    
    // Add hover effects to timeline cards
    addHoverEffects();
    
    // Setup keyboard and mouse events
    setupEventListeners();
    
    console.log('🎨 Scalable Portfolio Website Loaded!');
    console.log(`📊 Loaded: ${artworks.length} artworks, ${books.length} books, ${games.length} games`);
    console.log('📅 Content automatically sorted by latest date (newest first)');
});

// Update personal information from config
function updatePersonalInfo() {
    // Update title
    document.title = `${config.name} - Creative Portfolio`;
    
    // Update header
    document.querySelector('h1').textContent = config.name;
    
    // Update watermarks
    // document.querySelector('.zoom-watermark').textContent = `© ${config.name} ${config.year} - Original Artwork`;
    
    // Update contact links (if you want to make them functional)
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const text = item.textContent.trim();
        if (text.includes('Email')) item.href = `mailto:${config.email}`;
        if (text.includes('Instagram')) item.href = config.social.instagram;
        if (text.includes('Twitter')) item.href = config.social.twitter;
        if (text.includes('LinkedIn')) item.href = config.social.linkedin;
    });
}

// Add hover effects
function addHoverEffects() {
    // This will work with dynamically generated content
    document.addEventListener('mouseenter', function(e) {
        if (e.target.closest('.timeline-content')) {
            e.target.closest('.timeline-content').style.transform = 'translateY(-5px)';
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target.closest('.timeline-content')) {
            e.target.closest('.timeline-content').style.transform = 'translateY(0)';
        }
    }, true);
}

// Setup event listeners
function setupEventListeners() {
    // Close zoom on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeZoom();
        }
    });

    // Prevent zoom modal content from closing when clicked
    const zoomModalContent = document.querySelector('.zoom-modal-content');
    if (zoomModalContent) {
        zoomModalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Disable right-click on images for additional protection
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // Disable keyboard shortcuts for saving images
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 's' || e.key === 'a')) {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        }
    });
}

// ========================================
// DEVELOPER CONSOLE HELPERS
// ========================================
// These functions are available in the browser console for easy testing

window.portfolioHelpers = {
    addArtwork: addArtwork,
    addBook: addBook,
    addGame: addGame,
    artworks: artworks,
    books: books,
    games: games,
    config: config
};