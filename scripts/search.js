let searchInput = document.getElementById("search-input");

let searchTimer = null;

searchInput.addEventListener("input", function () {
  let searchText = searchInput.value.trim();

  if (searchText === "") {
    document.getElementById("issue-count").textContent = allIssues.length;
    renderIssues(allIssues);
    return;
  }

  clearTimeout(searchTimer);
  searchTimer = setTimeout(function () {
    searchIssues(searchText);
  }, 400);
});

async function searchIssues(searchText) {
  let grid = document.getElementById("issues-grid");
  let spinner = document.getElementById("loading-spinner");

  grid.innerHTML = "";
  spinner.classList.remove("hidden");

  try {
    let response = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=" + encodeURIComponent(searchText)
    );
    let data = await response.json();

    let results = data.data;

    spinner.classList.add("hidden");
    document.getElementById("issue-count").textContent = results.length;
    renderIssues(results);

  } catch (error) {
    spinner.classList.add("hidden");
    grid.innerHTML = '<p class="text-red-400 text-center col-span-4 py-10">Search failed. Please try again.</p>';
    console.log("Error searching issues:", error);
  }
}