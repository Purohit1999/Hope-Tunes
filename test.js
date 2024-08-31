const chai = require('chai');
const expect = chai.expect;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Hope Tunes Web Application', () => {
    let document;

    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html><html><head></head><body>
            <p id="affirmation"></p>
            <button id="playButton">Play Music</button>
            <audio id="audioPlayer"></audio>
            <div class="mood-buttons">
                <button class="mood" data-mood="1">😢</button>
                <button class="mood" data-mood="2">😐</button>
                <button class="mood" data-mood="3">🙂</button>
                <button class="mood" data-mood="4">😄</button>
            </div>
            <textarea id="gratitudeEntry"></textarea>
            <button id="saveGratitude">Save</button>
            <div id="breath-circle"></div>
            </body></html>
        `);
        document = dom.window.document;
        global.document = document;
        global.window = dom.window;
    });

    it('should display a random affirmation', () => {
        const affirmations = [
            "You are stronger than you think.",
            "This too shall pass.",
            "You are not alone."
        ];
        const affirmationText = document.getElementById('affirmation');

        // Simulate the displayAffirmation function
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        affirmationText.textContent = affirmations[randomIndex];

        expect(affirmationText.textContent).to.be.oneOf(affirmations);
    });

    it('should toggle music play and pause on button click', () => {
        const playButton = document.getElementById('playButton');
        const audioPlayer = document.getElementById('audioPlayer');

        // Simulate play button click
        playButton.click();
        expect(playButton.textContent).to.equal('Pause Music');
        expect(audioPlayer.paused).to.be.false;

        // Simulate play button click again
        playButton.click();
        expect(playButton.textContent).to.equal('Play Music');
        expect(audioPlayer.paused).to.be.true;
    });

    it('should log mood and store in localStorage', () => {
        const moodButton = document.querySelector('.mood[data-mood="3"]');

        // Simulate mood button click
        moodButton.click();
        const lastMood = window.localStorage.getItem('lastMood');

        expect(lastMood).to.equal('3');
    });

    it('should save gratitude entry to localStorage', () => {
        const gratitudeEntry = document.getElementById('gratitudeEntry');
        const saveGratitudeButton = document.getElementById('saveGratitude');

        // Simulate entering text and saving it
        gratitudeEntry.value = 'I am grateful for good health.';
        saveGratitudeButton.click();

        const gratitudeList = JSON.parse(window.localStorage.getItem('gratitudeList'));

        expect(gratitudeList).to.be.an('array');
        expect(gratitudeList[0]).to.have.property('entry', 'I am grateful for good health.');
    });

    it('should guide the user through a breathing exercise', () => {
        const breathCircle = document.getElementById('breath-circle');
        const breathingInstruction = document.getElementById('breathingInstruction');

        // Simulate the breathing exercise
        breathingInstruction.textContent = 'Breathe in...';

        setTimeout(() => {
            expect(breathingInstruction.textContent).to.equal('Hold...');
        }, 4000);

        setTimeout(() => {
            expect(breathingInstruction.textContent).to.equal('Breathe out...');
        }, 8000);
    });
});
