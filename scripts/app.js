//asynchronous calls go at the very top so that all functions have access to them, and so that they are not hoisted and executed before the DOM is ready
const API =
  "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function deleteTask() {
  console.log("Delete button clicked");
  //1. context
  let btn = $(this);
  //2. get the parent task (a div with class task)
  let taskElement = btn.parents(".task");
  //3. get the id of the task
  let taskID = taskElement.attr("id");
  //4.use this id to delete the selected element
  $.ajax({
    type: "DELETE",
    url: API + "/" + taskID,
    success: function () {
      taskElement.fadeOut(500, function () {
        $(this).remove(); //remove the task from the DOM after fadeOut() is complete
      });
    },
    error: function (fails) {
      console.log(fails);
    },
  });
}

function filter(status) {
  if (status === "All") {
    $(".task").show();
  } else {
    $(".task").hide();
  }
  $(".task").each(function () {
    let taskStatus = $(this).find(".status").$text();
    if (taskStatus === status) {
      $(this).show();
    }
  });
}

function saveTask() {
  console.log("Saving task...");
  // 1. Capture the form input (unchanged from Session 2), read the values out of the DOM
  const TITLE = $("#txtTitle").val().trim();
  const DESCRIPTION = $("#txtDescription").val().trim();
  const COLOR = $("#selColor").val();
  const DATE = $("#selDate").val();
  const STATUS = $("#selStatus").val();
  const BUDGET = $("#numBudget").val();

  // 2. Build the object using our argument
  const DATA = new Task(TITLE, DESCRIPTION, COLOR, DATE, STATUS, BUDGET);
  console.log("DATA before POST:", DATA);

  //$('btnSave').click(saveTask); //this is the event handler, it will call saveTask when the button is clicked

  // 3. Send it
  $.ajax({
    type: "POST", // the verb for creating
    url: API,
    data: JSON.stringify(DATA), // serialize it into a medium all components can understand, because some components are not JS
    contentType: "application/json", // tell the server what it is

    success: function (created) {
      console.log("CREATED:", created);

      // 4. Show the SERVER's version, not ours
      displayTask(created);

      // 5. Tidy up
      clearForm();
    },

    error: function (err) {
      console.error("POST error:", err.responseText || err);
      alert("Task could not be saved.");
    },
  });
}

function init() {
  console.log("App initialized");
  //$("#btnSave").click(saveTask);
  $("#btnAll").click(function () {
    filter("All");
  });
  $("#btnDone").click(function () {
    filter("Completed");
  });
  $("#btnTodo").click(function () {
    filter("Pending");
  });
  //when someone clicks in the list class and the target is btnDelete run deleteTask
  $(".list").on("click", ".btnDelete", deleteTask);
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
