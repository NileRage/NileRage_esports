const players = [
    {
        name: "DARK",
        realName: "DARK",
        bio: "Controller main. Provides site smokes, enemy intel, and stability for the team. A dependable clutch player in high-pressure rounds.",
        image: "assets/player_placeholder.png",
        hasHighlights: true,
        highlightVideo: "https://drive.google.com/file/d/1Jgmur4WuHlF_-6wyl-lnSns_kTv5bMq3/preview",
        highlightDesc: "DARK, 20 years old, is an experienced esports player representing NileRage. With years of competitive experience in the esports field, he has built strong mechanical skill, precise aim, and solid game sense. His consistency and calm performance under pressure make him tournament-ready, while his teamwork and discipline allow him to adapt to high-level competitive environments. DARK is always prepared for official matches and competitive tours, bringing focus and reliability to his team."
    },
    {
        name: "MANSY",
        realName: "MANSY",
        bio: "Main Initiator. Delivers enemy info, executes effective fakes, and applies heavy pressure to break enemy defenses.",
        image: "assets/player_placeholder.png"
    },
    {
        name: "DIXI",
        realName: "DIXI",
        bio: "An absolute firepower machine. DIXI brings the heat in every duel, consistently topping the leaderboards with aggressive yet calculated entries.",
        image: "assets/player_placeholder.png",
        hasHighlights: true,
        highlightVideo: "https://drive.google.com/file/d/19y9cCkiGSUOsUhojJpZIUJBxXLwnEY7F/preview",
        highlightDesc: "DIXI is a VALORANT duelist for NileRage, known for his aggressive playstyle and strong mechanical potential. As a new player in the competitive scene, he is focused on rapid improvement and continuous development within a structured team environment.\n\nDIXI brings confidence in entry situations and is actively working on refining his decision-making, positioning, and consistency under pressure. With the support of NileRage’s competitive system, he is developing his skills to meet high-level standards and contribute effectively to the team’s long-term goals.\n\nHis dedication, willingness to learn, and adaptability make him a promising talent within the roster and a player to watch as he grows in the Egyptian VALORANT scene."
    },
    {
        name: "MOHANAD",
        realName: "MOHANAD",
        bio: "The anchor of the team. When MOHANAD is on a site, it's effectively locked down. Immense patience and perfect timing define his defensive playstyle.",
        image: "assets/player_placeholder.png"
    },
    {
        name: "TALAL",
        realName: "TALAL",
        bio: "The sniper extraordinaire. Give him a long line of sight and the game is already over. TALAL's reflexes are second to none in the region.",
        image: "assets/player_placeholder.png",
        hasHighlights: true,
        highlightVideo: "https://drive.google.com/file/d/1c-qGdpATAs9R72aGNvMtYRp9XUD0LYDy/preview",
        highlightDesc: "TALAL is the team’s sniper extraordinaire. Give him a long line of sight and the round is often decided before it begins. Known across the region for lightning-fast reflexes and elite precision, TALAL consistently controls key angles and punishes even the smallest mistakes. His calm aim under pressure and exceptional positioning make him a constant threat, forcing opponents to rethink every peek and every push."
    }
];

let currentIdx = 0;
let lastSelectedIdx = -1;
const track = document.getElementById('carousel-track');
const infoPanel = document.getElementById('player-info');
const infoContent = document.querySelector('.info-content');
const displayRealName = document.getElementById('display-real-name');
const displayHandle = document.getElementById('display-handle');
const displayBio = document.getElementById('display-bio');
const currentIndexDisplay = document.getElementById('current-idx');
const progressFill = document.getElementById('progress-fill');
const highlightsSection = document.getElementById('highlights-section');
const highlightDesc = document.getElementById('display-highlight-desc');
const videoContainer = document.getElementById('video-container');

function initCarousel() {
    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = `player-card ${index === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <div class="card-label">PROFILE // ${player.name}</div>
            <div class="notch-left"></div>
            <img src="${player.image}" alt="${player.name}" class="player-img">
        `;
        card.onclick = () => updateSelection(index);
        track.appendChild(card);
    });
    updateUI(true);
}

function updateSelection(index) {
    if (index < 0) index = players.length - 1;
    if (index >= players.length) index = 0;

    currentIdx = index;
    updateUI(true);
}

function updateUI(isSelectionChange = false) {
    // Update Track Position
    const cards = document.querySelectorAll('.player-card');
    if (cards.length > 0) {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // match gap in CSS (2rem = 32px usually, or we can compute it)
        const offset = currentIdx * -(cardWidth + gap);
        track.style.transform = `translateX(${offset}px)`;
    }

    // 2. Only update player content and active classes if the selection actually changed
    if (isSelectionChange) {
        cards.forEach((card, idx) => {
            if (idx === currentIdx) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update Left Panel with animation
        infoPanel.classList.remove('active');

        setTimeout(() => {
            const player = players[currentIdx];

            // Check if we actually need to update the content (new player selected)
            if (lastSelectedIdx !== currentIdx) {
                infoContent.scrollTop = 0; // Reset scroll
                displayRealName.textContent = player.realName;
                displayHandle.textContent = player.name;
                displayBio.textContent = player.bio;
                currentIndexDisplay.textContent = currentIdx + 1;
                progressFill.style.width = `${((currentIdx + 1) / players.length) * 100}%`;

                // highlights logic
                if (player.hasHighlights) {
                    highlightsSection.style.display = 'block';
                    highlightDesc.textContent = player.highlightDesc;

                    // Only re-inject Iframe if it's not already there or it's a different video
                    const existingIframe = videoContainer.querySelector('iframe');
                    if (!existingIframe || existingIframe.src !== player.highlightVideo) {
                        videoContainer.innerHTML = `
                            <iframe 
                                src="${player.highlightVideo}" 
                                width="100%" 
                                height="100%" 
                                frameborder="0" 
                                allow="autoplay; fullscreen" 
                                allowfullscreen="true">
                            </iframe>
                        `;
                    }
                } else {
                    highlightsSection.style.display = 'none';
                    videoContainer.innerHTML = '';
                }

                lastSelectedIdx = currentIdx;
            }

            infoPanel.classList.add('active');
        }, 300);
    }
}

document.getElementById('prev-btn').onclick = () => updateSelection(currentIdx - 1);
document.getElementById('next-btn').onclick = () => updateSelection(currentIdx + 1);

// Initialize
initCarousel();
infoPanel.classList.add('active');

window.addEventListener('resize', () => updateUI(false));
// Reveal About Section on Scroll
window.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 150;

        if (sectionTop < triggerPoint) {
            aboutSection.classList.add('visible');
        }
    }
});

// Initial load check
window.dispatchEvent(new Event('scroll'));
