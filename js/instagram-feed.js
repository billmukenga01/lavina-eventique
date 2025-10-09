function loadInstagramFeed() {
    // Static sample data - replace with real Instagram API integration later
    const sampleData = {
        data: [
            {
                id: '1',
                media_type: 'IMAGE',
                media_url: 'img/bg-img/11.jpg',
                permalink: 'https://www.instagram.com/lavina_eventique/',
                caption: 'Sample Instagram Post'
            },
            {
                id: '2',
                media_type: 'IMAGE',
                media_url: 'img/bg-img/12.jpg',
                permalink: 'https://www.instagram.com/lavina_eventique/',
                caption: 'Sample Instagram Post'
            },
            {
                id: '3',
                media_type: 'IMAGE',
                media_url: 'img/bg-img/13.jpg',
                permalink: 'https://www.instagram.com/lavina_eventique/',
                caption: 'Sample Instagram Post'
            },
            {
                id: '4',
                media_type: 'IMAGE',
                media_url: 'img/bg-img/14.jpg',
                permalink: 'https://www.instagram.com/lavina_eventique/',
                caption: 'Sample Instagram Post'
            },
            {
                id: '5',
                media_type: 'IMAGE',
                media_url: 'img/bg-img/15.jpg',
                permalink: 'https://www.instagram.com/lavina_eventique/',
                caption: 'Sample Instagram Post'
            },
            {
                id: '6',
                media_type: 'IMAGE',
                media_url: 'img/bg-img/16.jpg',
                permalink: 'https://www.instagram.com/lavina_eventique/',
                caption: 'Sample Instagram Post'
            }
        ]
    };

    const container = document.querySelector('.instagram-feed-area');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Create the header
    const header = document.createElement('div');
    header.className = 'instagram-heading text-center';
    header.innerHTML = `
        <h3>Follow Instagram</h3>
        <a href="https://www.instagram.com/lavina_eventique/" target="_blank">@lavina_eventique</a>
    `;
    container.appendChild(header);

    // Create the feed container
    const feedContainer = document.createElement('div');
    feedContainer.className = 'instagram-feed-thumb owl-carousel';
    
    // Add images to the carousel
    sampleData.data.forEach(post => {
        const item = document.createElement('div');
        item.className = 'instagram-gallery-single-item';
        item.innerHTML = `
            <a href="${post.permalink}" target="_blank">
                <img src="${post.media_url}" alt="${post.caption || 'Instagram post'}">
                <div class="instagram-hover-content text-center d-flex align-items-center justify-content-center">
                    <span class="zoom-icon"><i class="fa fa-instagram"></i></span>
                </div>
            </a>
        `;
        feedContainer.appendChild(item);
    });

    container.appendChild(feedContainer);

    // Initialize Owl Carousel
    $(feedContainer).owlCarousel({
        items: 6,
        margin: 0,
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });
}

// Load the feed when the document is ready
document.addEventListener('DOMContentLoaded', loadInstagramFeed);
