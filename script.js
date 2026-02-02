const players = [
    {
        name: "DARK",
        realName: "DARK",
        bio: "Controller main. Provides site smokes, enemy intel, and stability for the team. A dependable clutch player in high-pressure rounds.",
        image: "assets/player_placeholder.png",
        hasHighlights: true,
        highlightVideo: "assets/0202.mp4",
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
        image: "assets/player_placeholder.png"
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
        highlightVideo: "assets/55.mp4",
        highlightDesc: "TALAL is the team’s sniper extraordinaire. Give him a long line of sight and the round is often decided before it begins. Known across the region for lightning-fast reflexes and elite precision, TALAL consistently controls key angles and punishes even the smallest mistakes. His calm aim under pressure and exceptional positioning make him a constant threat, forcing opponents to rethink every peek and every push."
    }
];

let currentIdx = 0;
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
const highlightVideo = document.getElementById('highlight-video');

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
    updateUI();
}

function updateSelection(index) {
    if (index < 0) index = players.length - 1;
    if (index >= players.length) index = 0;

    currentIdx = index;
    updateUI();
}

function updateUI() {
    // Update Track Position
    const cards = document.querySelectorAll('.player-card');
    if (cards.length > 0) {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // match gap in CSS (2rem = 32px usually, or we can compute it)
        const offset = currentIdx * -(cardWidth + gap);
        track.style.transform = `translateX(${offset}px)`;
    }

    // Update Cards
    cards.forEach((card, idx) => {
        if (idx === currentIdx) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    // Update Left Panel with animation
    infoPanel.classList.remove('active');
    infoContent.scrollTop = 0; // Reset scroll

    setTimeout(() => {
        const player = players[currentIdx];
        displayRealName.textContent = player.realName;
        displayHandle.textContent = player.name;
        displayBio.textContent = player.bio;
        currentIndexDisplay.textContent = currentIdx + 1;
        progressFill.style.width = `${((currentIdx + 1) / players.length) * 100}%`;

        // highlights logic
        if (player.hasHighlights) {
            highlightsSection.style.display = 'block';
            highlightDesc.textContent = player.highlightDesc;

            // Update video source if it's different
            const currentVideoSrc = highlightVideo.querySelector('source').src;
            const newVideoSrc = window.location.origin + '/' + player.highlightVideo;

            if (!currentVideoSrc.includes(player.highlightVideo)) {
                highlightVideo.querySelector('source').src = player.highlightVideo;
                highlightVideo.load();
            }

            highlightVideo.play().catch(() => { }); // auto play if possible
        } else {
            highlightsSection.style.display = 'none';
            highlightVideo.pause();
        }

        infoPanel.classList.add('active');
    }, 300);
}

document.getElementById('prev-btn').onclick = () => updateSelection(currentIdx - 1);
document.getElementById('next-btn').onclick = () => updateSelection(currentIdx + 1);

// Initialize
initCarousel();
infoPanel.classList.add('active');

window.addEventListener('resize', updateUI);
