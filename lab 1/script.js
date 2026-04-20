const eventList = document.getElementById("eventList");

function addEvent() {
  const title = document.getElementById("title").value;
  
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  if (!title || !date) {
    alert("Please fill in title and date");
    return;
  }

  renderEvent(title, date, category, description);

  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
}

function renderEvent(title, date, category, description) {
  if (document.querySelector(".empty")) {
    eventList.innerHTML = "";
  }

  const div = document.createElement("div");
  div.className = "event";

  div.innerHTML = `
    <h4>${title}</h4>
    <small>${date} | ${category}</small>
    <p>${description}</p>
  `;

  eventList.appendChild(div);
}

function clearEvents() {
  eventList.innerHTML = `<p class="empty">No events yet. Add your first event!</p>`;
}

function addSampleEvents() {
  clearEvents();

  renderEvent("Tech Conference", "2026-03-12", "Conference", "Annual technology conference.");
  renderEvent("Web Workshop", "2026-04-05", "Workshop", "Hands-on web development workshop.");
}
