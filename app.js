        // Hente lagrede verdier eller starte på 0
        let streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0;
        let emoji = document.getElementById("emoji");
        let streakText = document.getElementById("streak");

        function updateUI() {
            // Oppdater streak-telleren
            streakText.innerHTML = `Streak: ${streak} 🔥`;
            
            // Bytt bilde basert på streak
            if (streak === 0) {
                emoji.src = "img/NarutoSad.jpg"; // Når streak er 0
            } else if (streak < 10) {
                emoji.src = "img/NarutoHappy.jpg"; // Når streak er mellom 1-9
            } else if (streak < 20) {
                emoji.src = "img/NarutoStreak.png"; // Når streak er 10 eller mer
            } else if (streak < 30) {
                emoji.src = "img/NarutoStreak2.jpg"; // Når streak er 20 eller mer
            } else {
                emoji.src = "img/NarutoStreak3.png"; // Når streak er 30 eller mer
            }
        }

        function incrementStreak() {
            streak++;
            localStorage.setItem("streak", streak); // Lagre ny streak-verdi
            updateUI();
        }

        function resetStreak() {
            streak = 0;
            localStorage.setItem("streak", streak); // Nullstill streak
            updateUI();
        }

        // Oppdater UI ved oppstart
        updateUI();