let allIssues = [];
let currentFilter = "all";

function getBorderColor(status) {
  if (status === "open") return "border-t-green-400";
  return "border-t-purple-400";
}

function getPriorityBadge(priority) {
  if (priority === "high") {
    return '<span class="bg-red-100 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full">HIGH</span>';
  } else if (priority === "medium") {
    return '<span class="bg-orange-100 text-orange-500 text-xs font-semibold px-2 py-0.5 rounded-full">MEDIUM</span>';
  } else {
    return '<span class="bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full">LOW</span>';
  }
}

function getLabelPill(label) {
  if (label === "bug") {
    return '<span class="bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit"><img src="bug.png" class="w-3 h-3"> BUG</span>';
  } else if (label === "help wanted") {
    return '<span class="bg-orange-100 text-orange-500 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit"><img src="help.png" class="w-3 h-3"> HELP WANTED</span>';
  } else if (label === "enhancement") {
    return '<span class="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit"><img src="enhance.png" class="w-3 h-3"> ENHANCEMENT</span>';
  } else if (label === "documentation") {
    return '<span class="bg-blue-100 text-blue-500 text-xs px-2 py-0.5 rounded-full">📝 DOCUMENTATION</span>';
  } else if (label === "good first issue") {
    return '<span class="bg-teal-100 text-teal-600 text-xs px-2 py-0.5 rounded-full">🤞 GOOD FIRST ISSUE</span>';
  } else {
    return (
      '<span class="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">' +
      label.toUpperCase() +
      "</span>"
    );
  }
}

function formatDate(dateString) {
  let date = new Date(dateString);
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

function createCard(issue) {
  let borderColor = getBorderColor(issue.status);

  let icon = "";
  if (issue.status === "open") {
    icon = '<img src="loading.png" alt="open" class="w-6 h-6">';
  } else {
    icon = '<img src="tick.png" alt="closed" class="w-6 h-6">';
  }

  let labelsHTML = "";
  for (let i = 0; i < issue.labels.length; i++) {
    labelsHTML += getLabelPill(issue.labels[i]);
  }

  let desc = issue.description;
  if (desc.length > 80) {
    desc = desc.slice(0, 80) + "...";
  }

  let card = `
                <div onclick="openModal(${issue.id})" class="bg-white rounded-lg p-4 border-t-4 ${borderColor} shadow-sm cursor-pointer hover:shadow-md">
                    <div class="flex items-center justify-between mb-3">
                        ${icon}
                        ${getPriorityBadge(issue.priority)}
                    </div>
                    <p class="font-bold text-gray-900 text-sm mb-1">${issue.title}</p>
                    <p class="text-gray-400 text-xs mb-3">${desc}</p>
                    <div class="flex flex-wrap gap-1 mb-3">
                        ${labelsHTML}
                    </div>
                    <p class="text-gray-400 text-xs">#${issue.id} by ${issue.author}</p>
                    <p class="text-gray-400 text-xs">${formatDate(issue.createdAt)}</p>
                </div>
            `;

  return card;
}

function renderIssues(issues) {
  let grid = document.getElementById("issues-grid");
  grid.innerHTML = "";

  if (issues.length === 0) {
    grid.innerHTML =
      '<p class="text-gray-400 text-center col-span-4 py-10">No issues found.</p>';
    return;
  }

  for (let i = 0; i < issues.length; i++) {
    grid.innerHTML += createCard(issues[i]);
  }
}

function filterAndRender(filter) {
  currentFilter = filter;

  let filtered = [];

  if (filter === "all") {
    filtered = allIssues;
  } else {
    for (let i = 0; i < allIssues.length; i++) {
      if (allIssues[i].status === filter) {
        filtered.push(allIssues[i]);
      }
    }
  }

  document.getElementById("issue-count").textContent = filtered.length;
  renderIssues(filtered);
}

let tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    tabButtons.forEach(function (b) {
      b.classList.remove("bg-indigo-600", "text-white", "font-semibold");
      b.classList.add("bg-white", "text-gray-700", "border", "border-gray-300", "font-medium");
    });
    btn.classList.add("bg-indigo-600", "text-white", "font-semibold");
    btn.classList.remove("bg-white", "text-gray-700", "border", "border-gray-300", "font-medium");

    filterAndRender(btn.dataset.filter);
  });
});


async function fetchIssues() {
  let grid = document.getElementById("issues-grid");
  grid.innerHTML =
    '<p class="text-gray-400 text-center col-span-4 py-10">Loading issues...</p>';

  try {
    let response = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    let data = await response.json();

    allIssues = data.data;

    document.getElementById("issue-count").textContent = allIssues.length;
    renderIssues(allIssues);
  } catch (error) {
    grid.innerHTML =
      '<p class="text-red-400 text-center col-span-4 py-10">Failed to load issues. Please try again.</p>';
    console.log("Error fetching issues:", error);
  }
}

fetchIssues();


