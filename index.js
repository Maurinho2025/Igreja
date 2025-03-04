document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar-container');
    const eventList = document.getElementById('event-list');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const currentMonthYearDisplay = document.getElementById('currentMonthYear');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const events = [
        { title: 'Jantar Casais', start: '2025-03-14T19:00:00' },
        { title: 'Encontro Pastores & Líderes', start: '2025-03-29T09:00:00' },
        { title: 'Culto Presbitério', start: '2025-02-22T19:30:00' },
        { title: 'Encontro Mulheres', start: '2025-06-14T14:00:00' },
        { title: 'Retiro Igreja', start: '2025-05-16T09:00:00' },
        { title: 'Retiro Igreja', start: '2025-05-17T09:00:00' },
        { title: 'Retiro Igreja', start: '2025-05-18T09:00:00' },
        { title: 'Retiro Igreja', start: '2025-05-19T09:00:00' },
        { title: 'Retiro Igreja', start: '2025-05-20T09:00:00' },
        { title: 'Retiro Jovens', start: '2025-04-18T09:00:00' },
        { title: 'Retiro Jovens', start: '2025-04-19T09:00:00' },
        { title: 'Retiro Jovens', start: '2025-04-20T09:00:00' },
        { title: 'Batismo', start: '2025-04-27T10:00:00' },
    ];

    function generateCalendar(year, month) {
        calendarContainer.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        currentMonthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const daysOfWeekRow = createRow(daysOfWeek, 'fw-bold');
        calendarContainer.appendChild(daysOfWeekRow);

        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            const weekRow = document.createElement('div');
            weekRow.classList.add('row');
            for (let j = 0; j < 7; j++) {
                const dayCell = document.createElement('div');
                dayCell.classList.add('col', 'border', 'p-2', 'text-center', 'calendar-day');
                if (i === 0 && j < firstDay) {
                    dayCell.textContent = '';
                } else if (dayCounter <= daysInMonth) {
                    dayCell.textContent = dayCounter;
                    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayCounter.toString().padStart(2, '0')}`;
                    appendEventsToCell(dayCell, dateStr);
                    dayCounter++;
                }
                weekRow.appendChild(dayCell);
            }
            calendarContainer.appendChild(weekRow);
            if (dayCounter > daysInMonth) break;
        }
        displayUpcomingEvents();
    }

    function createRow(elements, additionalClass = '') {
        const row = document.createElement('div');
        row.classList.add('row', 'mb-2', additionalClass);
        elements.forEach(text => {
            const col = document.createElement('div');
            col.classList.add('col', 'text-center');
            col.textContent = text;
            row.appendChild(col);
        });
        return row;
    }

    function appendEventsToCell(cell, dateStr) {
        const matchingEvents = events.filter(event => event.start.startsWith(dateStr));
        matchingEvents.forEach(event => {
            const eventMarker = document.createElement('div');
            eventMarker.classList.add('bg-primary', 'text-white', 'rounded', 'p-1', 'mt-1', 'small');
            eventMarker.textContent = event.title;
            cell.appendChild(eventMarker);
            cell.addEventListener('click', () => alert(`Evento: ${event.title}`));
        });
    }

    function displayUpcomingEvents() {
        eventList.innerHTML = '';
        const today = new Date();
        const upcomingEvents = events.filter(event => new Date(event.start) >= today)
            .sort((a, b) => new Date(a.start) - new Date(b.start));
        upcomingEvents.forEach(event => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `${event.title} - ${new Date(event.start).toLocaleString('pt-BR')}`;
            eventList.appendChild(listItem);
        });
    }

    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));

    function changeMonth(step) {
        currentMonth += step;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    }

    generateCalendar(currentYear, currentMonth);
});

