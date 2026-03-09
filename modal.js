function getModalPriorityBadge(priority) {
  if (priority === "high") {
    return '<span class="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">HIGH</span>';
  } else if (priority === "medium") {
    return '<span class="bg-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full">MEDIUM</span>';
  } else {
    return '<span class="bg-gray-400 text-white text-xs font-semibold px-3 py-1 rounded-full">LOW</span>';
  }
}


function getStatusBadge(status) {
  if (status === "open") {
    return '<span class="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Opened</span>';
  } else {
    return '<span class="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Closed</span>';
  }
}


function formatModalDate(dateString) {
  let date = new Date(dateString);
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}


async function openModal(issueId) {
  let overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("hidden");

  let modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = '<p class="text-gray-400 text-center py-10">Loading...</p>';

  try {
    let response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issue/" + issueId);
    let data = await response.json();
    let issue = data.data;

    let labelsHTML = "";
    for (let i = 0; i < issue.labels.length; i++) {
      labelsHTML += getLabelPill(issue.labels[i]);
    }

    modalBody.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-900">${issue.title}</h2>
      </div>

      <div class="flex items-center gap-2 mb-4 flex-wrap">
        ${getStatusBadge(issue.status)}
        <span class="text-gray-400 text-sm">• Opened by ${issue.author} • ${formatModalDate(issue.createdAt)}</span>
      </div>

      <div class="flex flex-wrap gap-2 mb-4">
        ${labelsHTML}
      </div>

      <p class="text-gray-600 text-sm mb-6">${issue.description}</p>

      <div class="flex gap-8">
        <div>
          <p class="text-gray-400 text-xs mb-1">Assignee:</p>
          <p class="text-gray-900 font-semibold text-sm">${issue.assignee ? issue.assignee : "None"}</p>
        </div>
        <div>
          <p class="text-gray-400 text-xs mb-1">Priority:</p>
          ${getModalPriorityBadge(issue.priority)}
        </div>
      </div>
    `;

  } catch (error) {
    modalBody.innerHTML = '<p class="text-red-400 text-center py-10">Failed to load issue details.</p>';
    console.log("Error fetching issue:", error);
  }
}

function closeModal() {
  let overlay = document.getElementById("modal-overlay");
  overlay.classList.add("hidden");
}

document.getElementById("modal-overlay").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});
