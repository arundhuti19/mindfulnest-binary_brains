// Load existing entries from local storage
document.addEventListener('DOMContentLoaded', loadEntries);

document.getElementById('trackerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const steps = document.getElementById('steps').value || 0;
    const water = document.getElementById('water').value || 0;
    const heartRate = document.getElementById('heartRate').value || 0;
    const weight = document.getElementById('weight').value || 0;
    const temperature = document.getElementById('temperature').value || 0;

    const entry = { date, steps, water, heartRate, weight, temperature };

    // Save entry to local storage
    saveEntry(entry);
    addEntryToList(entry);
    updateChart();

    // Reset form
    document.getElementById('trackerForm').reset();
});

// Function to load entries from local storage
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('healthEntries')) || [];
    entries.forEach(addEntryToList);
    updateChart();
}

// Function to save entry to local storage
function saveEntry(entry) {
    const entries = JSON.parse(localStorage.getItem('healthEntries')) || [];
    entries.push(entry);
    localStorage.setItem('healthEntries', JSON.stringify(entries));
}

// Function to add entry to the list
function addEntryToList(entry) {
    const entryList = document.getElementById('entryList');
    const listItem = document.createElement('li');
    listItem.textContent = `📅 Date: ${entry.date}, 👣 Steps: ${entry.steps}, 💧 Water: ${entry.water}L, ❤️ Heart Rate: ${entry.heartRate} bpm, ⚖️ Weight: ${entry.weight} kg, 🌡️ Temperature: ${entry.temperature} °C`;
    entryList.appendChild(listItem);
}

// Function to update the chart with monthly data
function updateChart() {
    const entries = JSON.parse(localStorage.getItem('healthEntries')) || [];

    const labels = [];
    const stepsData = [];
    const waterData = [];
    const heartRateData = [];
    const weightData = [];

    entries.forEach(entry => {
        labels.push(entry.date);
        stepsData.push(Number(entry.steps));
        waterData.push(Number(entry.water));
        heartRateData.push(Number(entry.heartRate));
        weightData.push(Number(entry.weight));
    });

    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Steps 👣',
                    data: stepsData,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                },
                {
                    label: 'Water Intake 💧',
                    data: waterData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
                {
                    label: 'Heart Rate ❤️',
                    data: heartRateData,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Weight ⚖️',
                    data: weightData,
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Monthly Health Data 📊'
                }
            }
        }
    });
}
