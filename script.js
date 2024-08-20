let score = 0;
let timeLeft = 180; 
let timer;
const correctWords = [
    'BONECA', 'JANELA', 'CANETA', 'ESTRELA', 'CADERNO', 
    'CAMINHO', 'AJUDA', 'AMIGO', 'PALAVRA', 'SORRISO', 
    'CIDADE', 'ANIMAL', 'FAZENDA', 'COELHO', 'APRENDER',
];
let usedWords = new Set(); // Conjunto para rastrear palavras já usadas

const slots = document.querySelectorAll('.empty-slot');
const syllables = document.querySelectorAll('.syllable');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

syllables.forEach(syllable => {
    syllable.addEventListener('dragstart', dragStart);
});

slots.forEach(slot => {
    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const syllableId = e.dataTransfer.getData('text');
    const syllable = document.getElementById(syllableId);
    e.target.textContent = syllable.textContent;
    e.target.setAttribute('data-syllable', syllableId);
}

function checkWord() {
    const slot1 = document.getElementById('slot-1').getAttribute('data-syllable');
    const slot2 = document.getElementById('slot-2').getAttribute('data-syllable');
    const slot3 = document.getElementById('slot-3').getAttribute('data-syllable');

    const syllablesFormed = [slot1, slot2, slot3].filter(Boolean).join('');

    if (correctWords.includes(syllablesFormed)) {
        if (usedWords.has(syllablesFormed)) {
            alert('Essa palavra já foi usada. Tente outra.');
            score -= 5;
        } else {
            alert('Parabéns! Você formou uma palavra correta.');
            score += 10;
            usedWords.add(syllablesFormed); // Adiciona a palavra ao conjunto de palavras usadas
        }
    } else {
        alert('A palavra está incorreta. Tente novamente.');
        score -= 5;
    }

    scoreDisplay.textContent = score;
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Tempo esgotado! Sua pontuação final é: ' + score);
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function restartGame() {
    // Limpar slots
    slots.forEach(slot => {
        slot.textContent = '';
        slot.removeAttribute('data-syllable');
    });

    // Resetar a pontuação e o temporizador
    score = 0;
    timeLeft = 180;
    scoreDisplay.textContent = score;
    updateTimerDisplay();

    // Reiniciar o temporizador
    clearInterval(timer);
    startTimer();

    // Limpar o conjunto de palavras usadas
    usedWords.clear();
}

// Inicia o temporizador ao carregar a página
window.onload = startTimer;