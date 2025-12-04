// Configuration: Add your image filenames here
// Place your images in the 'images/' folder
const IMAGE_PATHS = [
    'images/air-force.jpg',
    'images/artic-ice.jpg',
    'images/barley.jpg',
    'images/blackstone.jpg',
    'images/blossom.jpg',
    'images/bluegrass.jpg',
    'images/bubblegum.jpg',
    'images/bubbles.jpg',
    'images/butterscotch.jpg',
    'images/campfire.jpg',
    'images/cilantro.jpg',
    'images/city-lights.jpg',
    'images/claret.jpg',
    'images/coney-island.jpg',
    'images/cranberry.jpg',
    'images/deep-lagoon.jpg',
    'images/dreamcatcher.jpg',
    'images/driftwood.jpg',
    'images/eden.jpg',
    'images/fairy.jpg',
    'images/fall-leaves.jpg',
    'images/fern.jpg',
    'images/fig.jpg',
    'images/flax.jpg',
    'images/fossil.jpg',
    'images/galaxy.jpg',
    'images/glacier.jpg',
    'images/graphite.jpg',
    'images/grass.jpg',
    'images/grey-blue-pink.jpg',
    'images/hydro.jpg',
    'images/jam-cookie.jpg',
    'images/kale.jpg',
    'images/marble.jpg',
    'images/marsh.jpg',
    'images/metropolis.jpg',
    'images/moonlight.jpg',
    'images/mustard.jpg',
    'images/navy.jpg',
    'images/obsidian.jpg',
    'images/oil-slick.jpg',
    'images/peanut.jpg',
    'images/petrol-blue.jpg',
    'images/potion.jpg',
    'images/raisin.jpg',
    'images/rapids.jpg',
    'images/raspberry.jpg',
    'images/red-beacon.jpg',
    'images/river-run.jpg',
    'images/rouge.jpg',
    'images/seaglass.jpg',
    'images/seashell.jpg',
    'images/sequoia.jpg',
    'images/slate.jpg',
    'images/spice-market.jpg',
    'images/spice.jpg',
    'images/spiced-apple.jpg',
    'images/storm-front.jpg',
    'images/succulent.jpg',
    'images/toasted-almond.jpg',
];

class ScarfTournament {
    constructor() {
        this.images = [];
        this.currentRound = [];
        this.winners = [];
        this.roundNumber = 1;
        this.decisionTree = null; // Will store the decision tree structure
        this.comparisons = []; // Track all comparisons made
        this.init();
    }

    init() {
        // Setup phase elements
        this.setupPhase = document.getElementById('setup-phase');
        this.tournamentPhase = document.getElementById('tournament-phase');
        this.winnerPhase = document.getElementById('winner-phase');
        
        // Setup elements
        this.imagePreviewContainer = document.getElementById('image-preview-container');
        this.startTournamentBtn = document.getElementById('start-tournament-btn');
        
        // Tournament elements
        this.image1 = document.getElementById('image-1');
        this.image2 = document.getElementById('image-2');
        this.name1 = document.getElementById('name-1');
        this.name2 = document.getElementById('name-2');
        this.selectButtons = document.querySelectorAll('.btn-select');
        
        // Winner elements
        this.winnerImage = document.getElementById('winner-image');
        this.restartBtn = document.getElementById('restart-btn');
        this.decisionTreeContainer = document.getElementById('decision-tree');
        
        this.loadImages();
        this.setupEventListeners();
    }

    loadImages() {
        // Load all images from the IMAGE_PATHS array
        this.images = IMAGE_PATHS.map((path, index) => ({
            id: index,
            src: path
        }));
        
        this.updatePreview();
    }

    setupEventListeners() {
        // Start tournament
        this.startTournamentBtn.addEventListener('click', () => this.startTournament());
        
        // Selection buttons
        this.selectButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const option = parseInt(e.target.dataset.option);
                this.selectWinner(option);
            });
        });
        
        // Restart button
        this.restartBtn.addEventListener('click', () => this.restart());
    }

    updatePreview() {
        this.imagePreviewContainer.innerHTML = '';
        
        if (this.images.length === 0) {
            this.imagePreviewContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No images found. Please add images to the images/ folder and update IMAGE_PATHS in script.js</p>';
            return;
        }
        
        this.images.forEach(img => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = 'Scarf preview';
            imgElement.onerror = () => {
                previewItem.style.border = '2px dashed #ff6b6b';
                previewItem.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b; font-size: 0.8rem;">Image not found</div>';
            };
            
            previewItem.appendChild(imgElement);
            this.imagePreviewContainer.appendChild(previewItem);
        });
    }

    startTournament() {
        if (this.images.length < 2) {
            alert('Please add at least 2 images to the images/ folder and update IMAGE_PATHS in script.js');
            return;
        }
        
        // Shuffle images for random pairing
        this.currentRound = [...this.images].sort(() => Math.random() - 0.5);
        this.winners = [];
        this.roundNumber = 1;
        this.comparisons = [];
        this.decisionTree = null;
        
        this.setupPhase.classList.add('hidden');
        this.tournamentPhase.classList.remove('hidden');
        
        this.nextComparison();
    }

    nextComparison() {
        if (this.currentRound.length === 0) {
            // Round is complete, start next round
            if (this.winners.length === 1) {
                this.currentRound = this.winners;
                this.showWinner();
                return;
            }
            this.roundNumber++;
            this.currentRound = [...this.winners];
            this.winners = [];
        }
        
        if (this.currentRound.length === 1) {
            // Only one left, it advances automatically
            const autoAdvance = this.currentRound.shift();
            this.winners.push(autoAdvance);
            // Record auto-advance in comparisons
            this.comparisons.push({
                round: this.roundNumber,
                option1: autoAdvance,
                option2: null,
                winner: autoAdvance,
                autoAdvance: true
            });
            this.nextComparison();
            return;
        }
        
        // Get next two images
        const option1 = this.currentRound.shift();
        const option2 = this.currentRound.shift();
        
        // Store current comparison for tracking
        this.currentComparison = { option1, option2, round: this.roundNumber };
        
        this.image1.src = option1.src;
        this.image2.src = option2.src;
        this.name1.textContent = this.getImageName(option1.src);
        this.name2.textContent = this.getImageName(option2.src);
    }

    selectWinner(optionNumber) {
        const winner = optionNumber === 1 
            ? this.currentComparison.option1
            : this.currentComparison.option2;
        
        // Record the comparison
        this.comparisons.push({
            round: this.currentComparison.round,
            option1: this.currentComparison.option1,
            option2: this.currentComparison.option2,
            winner: winner,
            autoAdvance: false
        });
        
        // Add winner to winners array for next round
        this.winners.push(winner);
        
        // Continue with next comparison
        this.nextComparison();
    }

    showWinner() {
        this.tournamentPhase.classList.add('hidden');
        this.winnerPhase.classList.remove('hidden');
        
        const winner = this.currentRound[0] || this.winners[0];
        this.winnerImage.src = winner.src;
        
        // Build and display decision tree
        this.buildDecisionTree();
        this.renderDecisionTree();
    }
    
    buildDecisionTree() {
        // Build a proper tree structure by tracking winners through rounds
        const treeNodes = new Map(); // Map of image src -> node
        
        // Initialize all starting images as leaf nodes
        this.images.forEach(img => {
            treeNodes.set(img.src, {
                src: img.src,
                name: this.getImageName(img.src),
                round: 0,
                children: [],
                parent: null,
                isWinner: false
            });
        });
        
        // Process comparisons to build tree upward
        this.comparisons.forEach(comp => {
            if (comp.autoAdvance) {
                // Auto-advance - winner moves up
                const node = treeNodes.get(comp.winner.src);
                if (node) {
                    node.round = comp.round;
                }
            } else {
                // Create parent node for the winner
                const winnerNode = treeNodes.get(comp.winner.src);
                const loserNode = treeNodes.get(comp.option1.src === comp.winner.src ? comp.option2.src : comp.option1.src);
                
                // Create or update winner node
                if (!treeNodes.has(`winner_${comp.round}_${comp.winner.src}`)) {
                    const parentNode = {
                        src: comp.winner.src,
                        name: this.getImageName(comp.winner.src),
                        round: comp.round,
                        children: [winnerNode, loserNode],
                        parent: null,
                        isWinner: true
                    };
                    
                    winnerNode.parent = parentNode;
                    winnerNode.round = comp.round;
                    if (loserNode) {
                        loserNode.parent = parentNode;
                        loserNode.round = comp.round;
                    }
                    
                    treeNodes.set(`winner_${comp.round}_${comp.winner.src}`, parentNode);
                }
            }
        });
        
        this.decisionTree = {
            nodes: Array.from(treeNodes.values()),
            comparisons: this.comparisons
        };
    }
    
    renderDecisionTree() {
        this.decisionTreeContainer.innerHTML = '';
        
        if (!this.decisionTree || !this.decisionTree.comparisons) {
            return;
        }
        
        // Group comparisons by round
        const rounds = {};
        this.decisionTree.comparisons.forEach(comp => {
            if (!rounds[comp.round]) {
                rounds[comp.round] = [];
            }
            rounds[comp.round].push(comp);
        });
        
        const totalRounds = Math.max(...Object.keys(rounds).map(Number), 0);
        if (totalRounds === 0) return;
        
        // Build bracket structure
        const bracketWrapper = document.createElement('div');
        bracketWrapper.className = 'bracket-wrapper';
        
        // Render rounds from right to left (final to first)
        for (let round = totalRounds; round >= 1; round--) {
            const roundData = rounds[round] || [];
            
            const roundColumn = document.createElement('div');
            roundColumn.className = 'bracket-round';
            
            const roundHeader = document.createElement('div');
            roundHeader.className = 'bracket-round-header';
            roundHeader.textContent = round === totalRounds ? 'Final' : `Round ${round}`;
            roundColumn.appendChild(roundHeader);
            
            const matchesContainer = document.createElement('div');
            matchesContainer.className = 'bracket-matches';
            
            roundData.forEach((comp, index) => {
                const matchDiv = document.createElement('div');
                matchDiv.className = 'bracket-match';
                
                if (comp.autoAdvance) {
                    // Bye - single item
                    matchDiv.innerHTML = `
                        <div class="bracket-seed bracket-winner">
                            <div class="bracket-seed-content">
                                <img src="${comp.winner.src}" alt="Winner">
                                <span class="bracket-name">${this.getImageName(comp.winner.src)}</span>
                            </div>
                            <span class="bracket-badge">Bye</span>
                        </div>
                    `;
                } else {
                    // Regular match
                    const option1Winner = comp.option1.src === comp.winner.src;
                    matchDiv.innerHTML = `
                        <div class="bracket-seed ${option1Winner ? 'bracket-winner' : 'bracket-loser'}">
                            <div class="bracket-seed-content">
                                <img src="${comp.option1.src}" alt="Option 1">
                                <span class="bracket-name">${this.getImageName(comp.option1.src)}</span>
                            </div>
                        </div>
                        <div class="bracket-seed ${!option1Winner ? 'bracket-winner' : 'bracket-loser'}">
                            <div class="bracket-seed-content">
                                <img src="${comp.option2.src}" alt="Option 2">
                                <span class="bracket-name">${this.getImageName(comp.option2.src)}</span>
                            </div>
                        </div>
                    `;
                }
                
                matchesContainer.appendChild(matchDiv);
            });
            
            roundColumn.appendChild(matchesContainer);
            bracketWrapper.appendChild(roundColumn);
        }
        
        this.decisionTreeContainer.appendChild(bracketWrapper);
    }
    
    getImageName(src) {
        // Extract filename from path
        const match = src.match(/\/([^\/]+)\.(jpg|jpeg|png|gif|webp)$/i);
        if (match) {
            return match[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
        return 'Scarf';
    }

    restart() {
        this.currentRound = [];
        this.winners = [];
        this.roundNumber = 1;
        this.comparisons = [];
        this.decisionTree = null;
        
        this.winnerPhase.classList.add('hidden');
        this.setupPhase.classList.remove('hidden');
    }
}

// Initialize tournament when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ScarfTournament();
});

