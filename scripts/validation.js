$("#btnSave").click(function (e) {
  e.preventDefault();
  let empty = false;

  for (const selector of [
    "#txtTitle",
    "#txtDescription",
    "#selColor",
    "#numBudget",
    "#selDate",
    "#selStatus",
  ]) {
    const value = $(selector).val();
    const invalid = value == null || String(value).trim() === "";

    $(selector).css("border", invalid ? "1px solid red" : "");
    if (invalid) empty = true;
  }

  if (empty) {
    alert("Please fill out all fields");
    return; // Stops here if validation fails.
  } else {
    saveTask();
  }

function saveTask() {
  // 1. Capture the form (unchanged from Session 2)
  const title = $("#txtTitle").val();
  const desc = $("#txtDescription").val();
  const color = $("#selColor").val();
  const date = $("#selDate").val();
  const status = $("#selStatus").val();
  const budget = $("#numBudget").val();

  // 2. Build the object
  const data = new Task(title, desc, color, date, status, budget);
  console.log("DATA before POST:", data);

  // 3. Send it
  $.ajax({
    type: "POST", // the verb for creating
    url: API,
    data: JSON.stringify(data), // serialize it
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
