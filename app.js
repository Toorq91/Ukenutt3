let streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0;
let emoji = document.getElementById("emoji");
let streakText = document.getElementById("streak");

// Funksjon for å oppdatere UI og legge til riftene
function updateUI() {
    // Oppdater streak-telleren
    streakText.innerHTML = `Streak: ${streak} 🔥`;

    // Bytt bilde basert på streak
    if (streak === 0) {
        emoji.src = "img/NarutoSad.jpg"; // Når streak er 0
        clearRifts(); // Fjern alle rifter når streak er 0
    } else {
        addRifts(); // Legg til rifter når streak er økt
        if (streak < 10) {
            emoji.src = "img/NarutoHappy.jpg"; // Når streak er mellom 1-9
        } else if (streak < 20) {
            emoji.src = "img/NarutoStreak.png"; // Når streak er 10 eller mer
        } else if (streak < 30) {
            emoji.src = "img/NarutoStreak2.jpg"; // Når streak er 20 eller mer
        } else if (streak < 50) {
            emoji.src = "img/NarutoStreak3.png"; // Når streak er 30 eller mer
        } else {
            emoji.src = "img/NarutoGodlike.jpg"; // Når streak er 50 eller mer
        }
    }
}

// Funksjon for å legge til rifter
function addRifts() {
    const groupsPerRow = 6; // Antall grupper på hver side per rad
    const groupWidth = window.innerWidth * 0.06; // 6% av skjermbredden
    const riftSpacing = groupWidth * 0.15; // 15% av groupWidth
    const rowHeight = window.innerHeight * 0.1; // 10% av skjermhøyden
    const imgWidth = document.querySelector(".img-container").offsetWidth;
    const imgMargin = imgWidth * 0.03; // 3% av bildets bredde
    const leftOffset = imgWidth * 0.1; // 10% av bildets bredde
    const rightOffset = leftOffset + imgWidth + imgMargin + groupsPerRow * groupWidth;

    // Fjern tidligere rifter
    clearRifts();

    const maxStreaks = 540; // Maksimalt antall streker
    const maxGroups = Math.floor(maxStreaks / 5); // Maksimalt antall grupper
    let numberOfGroups = Math.min(Math.floor(streak / 5), maxGroups); // Begrens til maks antall grupper
    let extraRifts = Math.min(streak % 5, maxStreaks - numberOfGroups * 5); // Begrens ekstra rifter

    for (let group = 0; group < numberOfGroups; group++) {
        let totalCols = groupsPerRow * 2; // Totalt antall grupper per rad
        let row = Math.floor(group / totalCols); // Beregn raden
        let col = group % totalCols; // Beregn kolonnen

        let xOffset = col < groupsPerRow
            ? leftOffset + col * groupWidth
            : rightOffset + (col - groupsPerRow) * groupWidth;

        let yOffset = row * rowHeight;

        for (let i = 0; i < 4; i++) {
            let rift = createRift(xOffset + i * riftSpacing, yOffset);
            document.body.appendChild(rift);
        }

        // Legg til skrå rift
        let angledRift = createRift(xOffset - 10, yOffset + rowHeight * 0.4);
        angledRift.classList.add("angled-rift");
        document.body.appendChild(angledRift);
    }

    // Ekstra rifter
    if (numberOfGroups < maxGroups) {
        let totalCols = groupsPerRow * 2;
        let lastRow = Math.floor(numberOfGroups / totalCols);
        let lastCol = numberOfGroups % totalCols;

        let xOffset = lastCol < groupsPerRow
            ? leftOffset + lastCol * groupWidth
            : rightOffset + (lastCol - groupsPerRow) * groupWidth;

        let yOffset = lastRow * rowHeight;

        for (let i = 0; i < extraRifts; i++) {
            let rift = createRift(xOffset + i * riftSpacing, yOffset);
            document.body.appendChild(rift);
        }
    }
}

// Funksjon for å lage en rift
function createRift(left, top) {
    let rift = document.createElement("div");
    rift.classList.add("rift");
    rift.style.left = `${(left / window.innerWidth) * 100}vw`;
    rift.style.top = `${(top / window.innerHeight) * 100}vh`;
    return rift;
}

// Fjern rifter
function clearRifts() {
    let rifts = document.querySelectorAll('.rift');
    rifts.forEach(rift => rift.remove());
}

// Inkrementer streak
function incrementStreak() {
    const maxStreaks = 540;
    if (streak >= maxStreaks) {
        alert("Du har nådd max streak!");
        return;
    }
    streak++;
    localStorage.setItem("streak", streak);
    updateUI();
}

// Tilbakestill streak
function resetStreak() {
    streak = 0;
    localStorage.setItem("streak", streak);
    updateUI();
}

// Sett streak
function setStreak() {
    const maxStreaks = 540; // Maksimalt antall streker
    let inputField = document.getElementById("streakInput");
    let inputValue = inputField.value;
    let newStreak = parseInt(inputValue);

    if (isNaN(newStreak) || newStreak < 0) {
        alert("Vennligst skriv inn et gyldig tall!");
        return;
    }

    if (newStreak > maxStreaks) {
        alert("Du har nådd max streak!!! Endre koden hvis du vil fortsette med streaken!! :D");
        inputField.value = ""; // Tømmer input-feltet
        return;
    }

    streak = newStreak;
    localStorage.setItem("streak", streak); // Lagre ny streak-verdi
    updateUI();
    inputField.value = ""; // Tømmer input-feltet etter bruk
}

// Lytter etter "Enter"-tasten i input-feltet
document.getElementById("streakInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        setStreak(); // Kaller setStreak-funksjonen
    }
});

// Når siden lastes, oppdater streak og UI basert på verdien i localStorage
document.addEventListener("DOMContentLoaded", function () {
    streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0;
    updateUI();
});