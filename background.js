const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numFlowers = 40; // Number of flowers
let flowerPositions = []; // Array to store flower positions
let petalSize = 10; // Initial size of the flower petals
let growing = true; // Track whether the flowers are growing or shrinking
let rotationAngle = 0; // Angle for flower rotation

// Function to draw a flower at a specific position
function drawFlower(x, y, size, angle) {
    const numPetals = 6; // Number of petals for the flower
    const petalRadius = size; // Radius of each petal

    // Save the current context state
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle); // Rotate the flower by the given angle

    // Set the fill color for the petals
    ctx.fillStyle = 'rgba(255,255,255,0.8)'; // White petals

    // Draw each petal
    for (let i = 0; i < numPetals; i++) {
        const petalAngle = (i * Math.PI * 2) / numPetals; // Angle between each petal
        const petalX = Math.cos(petalAngle) * size;
        const petalY = Math.sin(petalAngle) * size;

        // Draw petal as a small circle
        ctx.beginPath();
        ctx.arc(petalX, petalY, petalRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    // Draw the flower center
    ctx.fillStyle = 'rgba(255, 255, 100, 0.5)'; // Yellow center
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Add stroke to the center
    ctx.strokeStyle = 'rgba(220, 220, 80, 1.0)';
    ctx.lineWidth = 2; // Thickness of stroke
    ctx.stroke();

    // Restore the context state
    ctx.restore();
}

// Function to generate random positions for the flowers
function generateRandomFlowerPositions() {
    flowerPositions = []; // Reset the positions array
    for (let i = 0; i < numFlowers; i++) {
        // Generate random positions within the canvas bounds
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        flowerPositions.push({ x, y });
    }
}

// Function to draw the flower pattern
function drawFlowerPattern() {
    // Clear the canvas before each redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw flowers at the stored positions
    for (const pos of flowerPositions) {
        drawFlower(pos.x, pos.y, petalSize, rotationAngle);
    }
}

// Function to animate the canvas
function animate() {
    // Update the petal size to create a growing and shrinking effect
    if (growing) {
        petalSize += 0.01; // Increase the petal size
        if (petalSize > 12) { // Set a maximum petal size
            growing = false; // Start shrinking when reaching max size
        }
    } else {
      
        petalSize = 1; // Reset to minimum size
        growing = true; // Start growing again
        generateRandomFlowerPositions(); // Generate new random positions
        
    }

    // Update the rotation angle for spinning effect
    rotationAngle += 0.01; // Adjust the speed of rotation here

    // Redraw the flowers with the new petal size and rotation
    drawFlowerPattern();

    // Call animate recursively using requestAnimationFrame
    requestAnimationFrame(animate);
}

// Initialize the flower positions and start the animation
generateRandomFlowerPositions();
animate();

// Redraw the canvas when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateRandomFlowerPositions(); // Regenerate positions on resize
});
