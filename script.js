document.addEventListener('DOMContentLoaded', () => {
    const games = {
        1: {
            name: 'Riding Extreme 3D',
            appToken: 'd28721be-fd2d-4b45-869e-9f253b554e50',
            promoId: '43e35910-c168-4634-ad4f-52fd764a843f',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        2: {
            name: 'Chain Cube 2048',
            appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
            promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        3: {
            name: 'My Clone Army',
            appToken: '74ee0b5b-775e-4bee-974f-63e7f4d5bacb',
            promoId: 'fe693b26-b342-4159-8808-15e3ff7f8767',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        4: {
            name: 'Train Miner',
            appToken: '82647f43-3f87-402d-88dd-09a90025313f',
            promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        5: {
            name: 'Merge Away',
            appToken: '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
            promoId: 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        6: {
            name: 'Twerk Race 3D',
            appToken: '61308365-9d16-4040-8bb0-2f4a4c69074c',
            promoId: '61308365-9d16-4040-8bb0-2f4a4c69074c',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        7: {
            name: 'Polysphere',
            appToken: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
            promoId: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        8: {
            name: 'Mow and Trim',
            appToken: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
            promoId: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        9: {
            name: 'Mud Racing',
            appToken: '8814a785-97fb-4177-9193-ca4180ff9da8',
            promoId: '8814a785-97fb-4177-9193-ca4180ff9da8',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        10: {
            name: 'Cafe Dash',
            appToken: 'bc0971b8-04df-4e72-8a3e-ec4dc663cd11',
            promoId: 'bc0971b8-04df-4e72-8a3e-ec4dc663cd11',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        11: {
            name: 'Zoopolis',
            appToken: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            promoId: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        },
        12: {
            name: 'Gangs Wars',
            appToken: 'b6de60a0-e030-48bb-a551-548372493523',
            promoId: 'c7821fa7-6632-482c-9635-2bd5798585f9',
            timing: 0, // No delay
            attempts: 1, // Only 1 attempt
        }
    };

    const gameOptions = document.querySelectorAll('.game-option');
    const keyCountGroup = document.getElementById('keyCountGroup');
    const keyRange = document.getElementById('keyRange');
    const keyValue = document.getElementById('keyValue');
    const startBtn = document.getElementById('startBtn');
    const keyCountLabel = document.getElementById('keyCountLabel');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressLog = document.getElementById('progressLog');
    const keyContainer = document.getElementById('keyContainer');
    const keysList = document.getElementById('keysList');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const generatedKeysTitle = document.getElementById('generatedKeysTitle');
    const copyStatus = document.getElementById('copyStatus');
    const generateMoreBtn = document.getElementById('generateMoreBtn');
    const sourceCode = document.getElementById('sourceCode');

    let selectedGame = null;

    sourceCode.addEventListener('click', () => {
        window.open('https://github.com/ShafiqSadat/HamsterKeyGenWeb', '_blank');
    });

    gameOptions.forEach(option => {
        option.addEventListener('click', () => {
            gameOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedGame = option.dataset.game;

            keyCountGroup.classList.remove('hidden');
            startBtn.classList.remove('hidden');

            // Smooth scroll to the key count group
            keyCountGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    keyRange.addEventListener('input', () => {
        keyValue.innerText = keyRange.value;
    });

    startBtn.addEventListener('click', async () => {
        const keyCount = parseInt(keyRange.value);
        if (!selectedGame) {
            alert('Please select a game first.');
            return;
        }

        const gameChoice = parseInt(selectedGame);
        const game = games[gameChoice];

        // Hide the form sections
        document.querySelector('.grid-container').style.display = 'none';
        keyCountGroup.style.display = 'none';

        keyCountLabel.innerText = `Number of keys: ${keyCount}`;

        progressBar.style.width = '0%';
        progressText.innerText = '0%';
        progressLog.innerText = 'Starting...';
        progressContainer.classList.remove('hidden');
        keyContainer.classList.add('hidden');
        generatedKeysTitle.classList.add('hidden');
        keysList.innerHTML = '';
        copyAllBtn.classList.add('hidden');
        startBtn.classList.add('hidden');
        startBtn.disabled = true;

        let progress = 0;
        const updateProgress = (increment, message) => {
            progress += increment;
            progressBar.style.width = `${progress}%`;
            progressText.innerText = `${progress}%`;
            progressLog.innerText = message;
        };

        const generateKeyProcess = async () => {
            const clientId = generateClientId();
            let clientToken;
            try {
                clientToken = await login(clientId, game.appToken);
            } catch (error) {
                alert(`Failed to login: ${error.message}`);
                startBtn.disabled = false;
                return null;
            }

            try {
                const key = await generateKey(clientToken, game.promoId);
                updateProgress(100 / keyCount, 'Generating key...');
                return key;
            } catch (error) {
                alert(`Failed to generate key: ${error.message}`);
                return null;
            }
        };

        const keys = await Promise.all(Array.from({ length: keyCount }, generateKeyProcess));

        if (keys.length > 1) {
            keysList.innerHTML = keys.filter(key => key).map(key =>
                `<div class="key-item">
                    <input type="text" value="${key}" readonly>
                    <button class="copyKeyBtn" data-key
