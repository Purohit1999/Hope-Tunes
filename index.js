document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById('playButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const affirmationText = document.getElementById('affirmation');
    const backgroundContainer = document.querySelector('.background-container');
    const moodButtons = document.querySelectorAll('.mood');
    const gratitudeEntry = document.getElementById('gratitudeEntry');
    const saveGratitude = document.getElementById('saveGratitude');
    const breathingInstruction = document.getElementById('breathingInstruction');

    const affirmations = [
        "You are stronger than you think.",
        "This too shall pass.",
        "You are not alone.",
        "You are valued and loved.",
        "There is hope, even in the darkest times.",
        "Your life matters.",
        "Every day is a new beginning.",
        "Your potential is limitless.",
        "Believe in yourself and all that you are.",
        "You have the power to create change."
    ];

    const backgrounds = [
        "./assets/warrior1.jpeg",
        "./assets/warrior2.jpeg",
        "./assets/warrior3.jpeg",
        "./assets/warrior4.jpeg"
    ];

    let backgroundIndex = 0;

    function changeBackground() {
        backgroundContainer.style.opacity = '0';
        setTimeout(() => {
            backgroundIndex = (backgroundIndex + 1) % backgrounds.length;
            backgroundContainer.style.backgroundImage = `url('${backgrounds[backgroundIndex]}')`;
            backgroundContainer.style.opacity = '1';
        }, 1000);
    }

    function displayAffirmation() {
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        affirmationText.textContent = affirmations[randomIndex];
    }

    playButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = 'Pause Music';
        } else {
            audioPlayer.pause();
            playButton.textContent = 'Play Music';
        }
    });

    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mood = this.dataset.mood;
            console.log(`Mood logged: ${mood}`);
            localStorage.setItem('lastMood', mood);
            alert(`Mood logged: ${['😢', '😐', '🙂', '😄'][mood - 1]}`);
        });
    });

    saveGratitude.addEventListener('click', function() {
        const entry = gratitudeEntry.value;
        if (entry) {
            const gratitudeList = JSON.parse(localStorage.getItem('gratitudeList') || '[]');
            gratitudeList.push({ date: new Date().toISOString(), entry });
            localStorage.setItem('gratitudeList', JSON.stringify(gratitudeList));
            gratitudeEntry.value = '';
            alert('Your gratitude entry has been saved!');
        }
    });

    function breathingExercise() {
        breathingInstruction.textContent = 'Breathe in...';
        setTimeout(() => {
            breathingInstruction.textContent = 'Hold...';
            setTimeout(() => {
                breathingInstruction.textContent = 'Breathe out...';
                setTimeout(breathingExercise, 4000);
            }, 4000);
        }, 4000);
    }

    // Initialize
    changeBackground();
    setInterval(changeBackground, 10000);
    displayAffirmation();
    breathingExercise();

    // Display last mood if available
    const lastMood = localStorage.getItem('lastMood');
    if (lastMood) {
        alert(`Your last recorded mood: ${['😢', '😐', '🙂', '😄'][lastMood - 1]}`);
    }
});
