/**
 * Reports Page JavaScript
 * Handles tab switching, data fetching, and chart rendering
 */

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    const clickedBtn = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }

    // Load data for the tab if needed
    if (tabName === 'overview') {
        loadOverviewData();
    } else if (tabName === 'analytics') {
        loadAnalyticsCharts();
    }
}

// Load overview data
async function loadOverviewData() {
    try {
        const response = await fetch('/api/reports/summary');
        const data = await response.json();

        // Update summary cards
        document.getElementById('totalVehicles').textContent = data.total_vehicles || 0;
        document.getElementById('currentInside').textContent = data.current_inside || 0;
        document.getElementById('todayEntries').textContent = data.today_entries || 0;
        document.getElementById('todayExits').textContent = data.today_exits || 0;
        document.getElementById('avgDuration').textContent = data.avg_parking_duration || 0;
    } catch (error) {
        console.error('Error loading overview data:', error);
    }
}

// Load analytics charts
async function loadAnalyticsCharts() {
    try {
        // Load weekly data
        const weeklyResponse = await fetch('/api/reports/weekly');
        const weeklyData = await weeklyResponse.json();

        // Render weekly chart
        renderWeeklyChart(weeklyData);

        // Load hourly distribution
        const hourlyResponse = await fetch('/api/reports/hourly');
        const hourlyData = await hourlyResponse.json();
        renderHourlyChart(hourlyData);

        // Load color distribution
        const colorResponse = await fetch('/api/reports/color_distribution');
        const colorData = await colorResponse.json();
        renderColorChart(colorData);

    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

// Render weekly traffic chart
function renderWeeklyChart(data) {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;

    const dates = data.map(d => d.date);
    const entries = data.map(d => d.entries);
    const exits = data.map(d => d.exits);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Entries',
                    data: entries,
                    borderColor: '#e8613c',
                    backgroundColor: 'rgba(232, 97, 60, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Exits',
                    data: exits,
                    borderColor: '#f59e42',
                    backgroundColor: 'rgba(245, 158, 66, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Weekly Traffic Trend (Last 7 Days)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Render hourly distribution chart
function renderHourlyChart(data) {
    const ctx = document.getElementById('hourlyChart');
    if (!ctx) return;

    const hours = data.map(d => d.hour + ':00');
    const counts = data.map(d => d.count);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: hours,
            datasets: [{
                label: 'Vehicle Entries',
                data: counts,
                backgroundColor: '#e8613c',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Peak Hours Analysis (Last 30 Days)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Render color distribution chart
function renderColorChart(data) {
    const ctx = document.getElementById('colorChart');
    if (!ctx) return;

    const colors = data.map(d => d.vehicle_color);
    const counts = data.map(d => d.count);

    const backgroundColors = colors.map(color => {
        const colorMap = {
            'White': '#f3f4f6',
            'Black': '#1f2937',
            'Red': '#ef4444',
            'Blue': '#3b82f6',
            'Gray': '#6b7280',
            'Yellow': '#fbbf24',
            'Green': '#22c55e'
        };
        return colorMap[color] || '#8b5cf6';
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: colors,
            datasets: [{
                data: counts,
                backgroundColor: backgroundColors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Vehicle Color Distribution'
                }
            }
        }
    });
}

// Filter records by date range
function filterRecords() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }

    // Reload page with date filters
    window.location.href = `/history_reports?start_date=${startDate}&end_date=${endDate}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Load initial data
    loadOverviewData();
});
