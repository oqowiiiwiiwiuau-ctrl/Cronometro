// Variables del DOM
const historyPanel = document.getElementById('history-panel');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('startBtn');
const historyBtn = document.getElementById('historyBtn');
const playAllAudiosBtn = document.getElementById('playAllAudiosBtn');
const resetBtn = document.getElementById('resetBtn');

// Variables del cronómetro
let timer;
let seconds = 0;
let isRunning = false;
let currentAudioIndex = 0;

// Crear un array con las rutas de tus archivos de audio
const audioFiles = [
    'krillin.mp3',
    'estrategia.mp3',
    'momento.mp3',
    'cell.mp3',
    'risa.mp3',
    'xokas.mp3'
];

// Función para obtener un audio aleatorio
function getRandomAudio() {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    return new Audio(audioFiles[randomIndex]);
}

let alarm;

// Función para actualizar el cronómetro
function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (seconds === 60) {
        playRandomAlarm();
        stopTimer();
    }
}

// Función para iniciar/detener el cronómetro
function startTimer() {
    if (isRunning) {
        stopTimer();
    } else {
        timer = setInterval(updateTimer, 1000);
        startBtn.textContent = "Detener";
        isRunning = true;
        historyPanel.classList.add('history-hidden');
    }
}

// Función para detener y guardar en el historial
function stopTimer() {
    clearInterval(timer);
    timer = null;
    isRunning = false;
    startBtn.textContent = "Iniciar";
    
    const newEntry = document.createElement('p');
    newEntry.textContent = `Tiempo registrado: ${timerDisplay.textContent}`;
    historyPanel.appendChild(newEntry);

    historyPanel.classList.remove('history-hidden');
}

// Función para reiniciar el cronómetro
function resetTimer() {
    clearInterval(timer);
    timer = null;
    isRunning = false;
    seconds = 0;
    timerDisplay.textContent = "00:00";
    startBtn.textContent = "Iniciar";
}

// Función para reproducir un sonido aleatorio de alarma
function playRandomAlarm() {
    alarm = getRandomAudio();
    alarm.play();
}

// Función para reproducir todos los audios de forma secuencial
function playAllAudiosSequentially() {
    if (currentAudioIndex >= audioFiles.length) {
        currentAudioIndex = 0;
        playAllAudiosBtn.textContent = "Escuchar audios";
        return;
    }

    const audio = new Audio(audioFiles[currentAudioIndex]);
    audio.play();
    playAllAudiosBtn.textContent = `Reproduciendo (${currentAudioIndex + 1}/${audioFiles.length})`;

    audio.onended = () => {
        currentAudioIndex++;
        playAllAudiosSequentially();
    };
}

// Eventos de escucha
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
historyBtn.addEventListener('click', () => {
    historyPanel.classList.toggle('history-hidden');
    historyBtn.textContent = historyPanel.classList.contains('history-hidden') ? 'Historial' : 'Ocultar';
});
playAllAudiosBtn.addEventListener('click', playAllAudiosSequentially);