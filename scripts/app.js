const API =
  "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function saveTask() {
  console.log("Saving Tasks...");

  //read the values of each of the six inputs
  //title, description, color, date, status, budget

  //1. Read the values out of the DOM
  const TITLE = $("#txtTitle").val();
  const DESCRIPTION = $("#txtDescription").val();
  const COLOR = $("#selColor").val();
  const DATE = $("#selDate").val();
  const STATUS = $("#selStatus").val();
  const BUDGET = $("#numBudget").val();

  //2. Build an object using our model
  const TASKTOSAVE = new Task(TITLE, DESCRIPTION, COLOR, DATE, STATUS, BUDGET);

  //3. Log task to show it works
  console.log(TASKTOSAVE);

  //4. Show on screen (local echo - gone on  refresh);
  displayTask(TASKTOSAVE);
}

function init() {
  console.log("App initialized");
  $("#btnSave").click(saveTask);
  loadTasks();
}

function displayTask(task) {
  let syntax = `
    <div class="task" style="border-left-color: ${task.color}">
      
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.description}</p>
      </div>

      <label class="status">${task.status}</label>
      
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: ${task.budget}</label>
      </div>
    
    </div><br>`;

  //"growing a new branch on the DOM tree"
  $(".list").append(syntax);
}

function loadTasks() {
  $.ajax({
    type: "GET", // the HTTP verb for reading
    url: API, // where to send data
    dataType: "json", // what we expect back

    success: function (data) {
      console.log("Server responded with: ", data);

      //clear first, so repeat calls don't duplicate
      $(".list").empty();

      //loop through every task
      for (let i = 0; i < data.length; i++) {
        displayTask(data[i]); //reuse the same render function
      }
    },

    error: function (err) {
      console.error("Error fetching data...", err);
    },
  });
}

window.onload = init;
//executes first, and is a "parent" then, effecting execution order
//force the html and css to resolve before i execute the logic
