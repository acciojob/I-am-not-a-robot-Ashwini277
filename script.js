document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'img1.jpg',
        'img2.jpg',
        'img3.jpg',
        'img4.jpg',
        'img5.jpg'
    ];

    const imageContainer = document.getElementById('image-container');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const resultPara = document.getElementById('para');

    let selectedImages = [];

    function shuffleImages() {
        const shuffled = images.slice();
        const randomIndex = Math.floor(Math.random() * images.length);
        shuffled.push(shuffled[randomIndex]);
        return shuffled.sort(() => 0.5 - Math.random());
    }

    function renderImages() {
        imageContainer.innerHTML = '';
        const shuffledImages = shuffleImages();
        shuffledImages.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = `img${index + 1}`;
            img.addEventListener('click', () => handleImageClick(img));
            imageContainer.appendChild(img);
        });
    }

    function handleImageClick(img) {
        if (selectedImages.length < 2 && !img.classList.contains('selected')) {
            img.classList.add('selected');
            selectedImages.push(img);
        }

        if (selectedImages.length > 0) {
            resetButton.style.display = 'block';
        }

        if (selectedImages.length === 2) {
            verifyButton.style.display = 'block';
        }
    }

    function resetSelection() {
        selectedImages.forEach(img => img.classList.remove('selected'));
        selectedImages = [];
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';
        resultPara.textContent = '';
    }

    function verifySelection() {
        if (selectedImages[0].src === selectedImages[1].src) {
            resultPara.textContent = 'You are a human. Congratulations!';
            resultPara.style.color = 'green';
        } else {
            resultPara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
            resultPara.style.color = 'red';
        }
        verifyButton.style.display = 'none';
    }

    resetButton.addEventListener('click', resetSelection);
    verifyButton.addEventListener('click', verifySelection);

    renderImages();
});

