
// Locale storage
let startRecurInfo = localStorage.getItem('eventStartDate') || ''
let endRecurInfo = localStorage.getItem('eventEndDate') || ''
let daysOfWeekInfo = localStorage.getItem('daysOfWeek') || []
let shiftStart = localStorage.getItem('eventStartTime') || ''
let breakStart = localStorage.getItem('eventBreakStartTime') || ''
let breakEnd = localStorage.getItem('eventBreakEndTime') || ''
let shiftEnd = localStorage.getItem('eventEndTime') || ''



function addEvent() {
    // Récupérer les valeurs des champs
    let startDate = document.getElementById('startDate').value;
    let startTime = document.getElementById('startTime').value;
    let endDate = document.getElementById('endDate').value;
    let endTime = document.getElementById('endTime').value;
    let breakStartTime = document.getElementById('breakStartTime').value;
    let breakEndTime = document.getElementById('breakEndTime').value;
    let weekDays = getCheckedDays();

    // Stocker les valeurs dans le localStorage
    localStorage.setItem('daysOfWeek' , weekDays)
    localStorage.setItem('eventStartDate', startDate);
    localStorage.setItem('eventStartTime', startTime);
    localStorage.setItem('eventEndDate', endDate);
    localStorage.setItem('eventEndTime', endTime);
    localStorage.setItem('eventBreakStartTime', breakStartTime);
    localStorage.setItem('eventBreakEndTime', breakEndTime);

    location.reload();
}

function getCheckedDays() {
    let checkedDays = [];
    // Sélectionner toutes les cases à cocher des jours de la semaine
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
    // Parcourir chaque case à cocher
    checkboxes.forEach(function(checkbox) {
      // Vérifier si la case est cochée
      if (checkbox.checked) {
        // Ajouter la valeur de la case à cocher (jour de la semaine) au tableau
        checkedDays.push(checkbox.value);
      }
    });
  
    // Retourner le tableau contenant les jours cochés
    return checkedDays;
}

// Calendrier
document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
      customButtons: {
        myCustomButton: {
          text: 'Ajouter un événement',
          click: function() {
            $('#exampleModal').modal('show');
          }
        }
      },
      themeSystem: 'bootstrap',
      initialView: 'timeGridWeek',
      headerToolbar: { start : 'prev,today,next, myCustomButton',center: 'title' , end : 'timeGridDay,dayGridWeek,dayGridMonth' }, 
      selectable: true, // activate the selection feature
      select: function(info) {
          // Display the modal and set the start date field value
          $('#exampleModal').modal('show');
          document.getElementById('startDate').value = info.startStr; // set the start date value
      },
      titleFormat : {
        month: 'long',
        year: 'numeric',
      },
      locale: 'fr',
      events: [
        {
            title: 'Heures de travail matin',
            daysOfWeek: daysOfWeekInfo,
            startTime: shiftStart,
            endTime: breakStart,
            startRecur: startRecurInfo,
            endRecur: endRecurInfo,
          },
          {
            title: 'Heures de travail midi',
            daysOfWeek: daysOfWeekInfo,
            startTime: breakEnd,
            endTime:  shiftEnd,
            startRecur: startRecurInfo,
            endRecur: endRecurInfo,
          },
   
      ],
      textColor : 'black', // an option!



      
      eventDisplay  : 'block', 
      // eventColor: '#7BE0AD',
      dateClick: function(info) {
        // Ouvre la modal lorsqu'une date est cliquée
        $('#exampleModal').modal('show');
        
      }
    });
    calendar.render();
});