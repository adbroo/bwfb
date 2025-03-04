// Initial setup for 3D scene
let scene, camera, renderer, birthdayText;
let textMesh;

function init() {
    // Create scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Set up lighting
    let light = new THREE.AmbientLight(0x404040, 2); // Ambient light
    scene.add(light);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // 3D Text Creation
    let loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/droid/droid_sans_bold.typeface.json', function (font) {
        let textGeometry = new THREE.TextGeometry('Happy Birthday Bhumika!', {
            font: font,
            size: 5,
            height: 0.5,
        });

        let textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        textMesh = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(textMesh);

        // Positioning the text
        textMesh.position.set(-15, 0, -50);
        camera.position.z = 100;

        // Start the animation
        animateText();

        // Make the text appear with a fade-in effect
        setTimeout(() => {
            document.body.classList.add('fade-in');
        }, 2000);
    });

    // Set up birthday cake object (3D rotating cake)
    let cakeGeometry = new THREE.CylinderGeometry(5, 5, 2, 32);
    let cakeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    let cake = new THREE.Mesh(cakeGeometry, cakeMaterial);
    cake.position.set(0, -15, -40);
    scene.add(cake);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

// Text Animation (Rotation and Scaling)
function animateText() {
    let scale = 0.1;
    let rotation = 0;
    
    // Animating the text
    function animateTextStep() {
        textMesh.rotation.y += 0.01;  // Rotate text
        textMesh.scale.set(scale, scale, scale);  // Scale the text
        scale += 0.005;
        
        // Continue rotating cake and text
        textMesh.position.x += Math.sin(rotation) * 0.05; 
        textMesh.position.y += Math.cos(rotation) * 0.05;
        rotation += 0.05;

        // Update the animation every frame
        requestAnimationFrame(animateTextStep);
    }

    animateTextStep();
}

// Black Fade-In Effect
window.onload = () => {
    setTimeout(init, 2000); // Wait for the page to load and then start the animation
};

// Responsive resizing for canvas
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
