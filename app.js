let streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0;
let emoji = document.getElementById("emoji");
let streakText = document.getElementById("streak");
let imgContainer = document.querySelector(".img-container");

// Funksjon for å oppdatere UI og legge til riftene
function updateUI() {
    // Oppdater streak-telleren
    streakText.innerHTML = `Streak: ${streak} 🔥`;

    // Bytt bilde basert på streak
    if (streak === 0) {
        emoji.src = "img/NarutoSad.jpg"; // Når streak er 0
        clearRifts(); // Fjern alle rifter når streak er 0
    } else {
        addRifts(); // Legg til riftene når streak er økt
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

// Funksjon for å legge til riftene med fast posisjon
function addRifts() {
    const groupsPerRow = 6; // Antall grupper på venstre og høyre side per rad
    const groupWidth = 100; // Horisontal avstand mellom grupper
    const riftSpacing = 15; // Avstand mellom rifter i en gruppe
    const rowHeight = 100; // Vertikal avstand mellom rader
    const imgWidth = 600; // Bredden på bildet (img-container)
    const imgMargin = 20; // Ekstra margin mellom gruppene og bildet
    const leftOffset = 70; // Startposisjon for riftene til venstre for bildet
    const rightOffset = leftOffset + imgWidth + imgMargin + groupsPerRow * groupWidth; // Startposisjon for riftene til høyre for bildet

    const maxStreaks = 480; // Maksimalt antall streker som kan tegnes
    const maxGroups = Math.floor(maxStreaks / 5); // Maksimalt antall grupper
    let numberOfGroups = Math.min(Math.floor(streak / 5), maxGroups); // Begrens til maks antall grupper
    let extraRifts = Math.min(streak % 5, maxStreaks - numberOfGroups * 5); // Begrens ekstra rifter

    // Fjern tidligere rifter
    clearRifts();

    for (let group = 0; group < numberOfGroups; group++) {
        // Beregn hvilken side (venstre eller høyre), rad og kolonne gruppen tilhører
        let totalCols = groupsPerRow * 2; // Totalt antall grupper per rad (venstre + høyre)
        let row = Math.floor(group / totalCols); // Beregn raden
        let col = group % totalCols; // Beregn kolonnen

        // Bestem om gruppen skal være på venstre eller høyre side
        let xOffset = col < groupsPerRow
            ? leftOffset + col * groupWidth // Venstre side
            : rightOffset + (col - groupsPerRow) * groupWidth; // Høyre side

        let yOffset = 50 + row * rowHeight; // Y-posisjon for raden

        // Legg til 4 vertikale rifter for denne gruppen
        for (let i = 0; i < 4; i++) {
            let rift = createRift(xOffset + i * riftSpacing, yOffset);
            document.body.appendChild(rift);
        }

        // Legg til den skrå riften
        let angledRift = createRift(xOffset - 20, yOffset + 20);
        angledRift.style.transform = "rotate(-25deg)";
        angledRift.style.width = "90px"; // Bred nok til å krysse alle fire linjene
        angledRift.style.height = "5px"; // Tynn for å matche de vertikale linjene
        document.body.appendChild(angledRift);
    }

    // Legg til eventuelle resterende rifter som ikke danner en full gruppe
    if (numberOfGroups < maxGroups) {
        let totalCols = groupsPerRow * 2; // Totalt antall grupper per rad
        let lastRow = Math.floor(numberOfGroups / totalCols); // Beregn den siste raden
        let lastCol = numberOfGroups % totalCols; // Beregn kolonnen i siste raden

        let xOffset = lastCol < groupsPerRow
            ? leftOffset + lastCol * groupWidth // Venstre side
            : rightOffset + (lastCol - groupsPerRow) * groupWidth; // Høyre side

        let yOffset = 50 + lastRow * rowHeight; // Y-posisjon for siste rad

        for (let i = 0; i < extraRifts; i++) {
            let rift = createRift(xOffset + i * riftSpacing, yOffset);
            document.body.appendChild(rift);
        }
    }
}

// Funksjon for å lage en individuell rift
function createRift(left, top) {
    let rift = document.createElement("div");
    rift.classList.add("rift");
    rift.style.left = `${left}px`;
    rift.style.top = `${top}px`;
    return rift;
}

// Funksjon for å fjerne alle rifter når streak er 0
function clearRifts() {
    let rifts = document.querySelectorAll('.rift');
    rifts.forEach(rift => {
        rift.remove();
    });
}

// function incrementStreak() {
//     streak++;
//     localStorage.setItem("streak", streak); // Lagre ny streak-verdi
//     updateUI();
// }

function incrementStreak() {
    const maxStreaks = 480; // Maksimalt antall streker
    if (streak >= maxStreaks) {
        alert("Du har nådd max streak!!! Endre koden hvis du vil fortsette med streaken! :D");
        return; // Stopper funksjonen hvis maks streak er nådd
    }
    streak++;
    localStorage.setItem("streak", streak); // Lagre ny streak-verdi
    updateUI();
}

function resetStreak() {
    streak = 0;
    localStorage.setItem("streak", streak); // Nullstill streak
    updateUI();
}

function setStreak() {
    const maxStreaks = 480; // Maksimalt antall streker
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

// Oppdater UI ved oppstart
updateUI();
