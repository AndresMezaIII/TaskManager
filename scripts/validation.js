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
    console.log("Saving Tasks...");

    //read the values of each of the six inputs
    //title, description, color, date, status, budget

    //1. Read the values out of the DOM
    const TITLE = $("#txtTitle").val().trim();
    const DESCRIPTION = $("#txtDescription").val().trim();
    const COLOR = $("#selColor").val();
    const DATE = $("#selDate").val();
    const STATUS = $("#selStatus").val();
    const BUDGET = $("#numBudget").val().trim();

    //2. Build an object using our model
    const TASKTOSAVE = new Task(
      TITLE,
      DESCRIPTION,
      COLOR,
      DATE,
      STATUS,
      BUDGET,
    );

    //3. Log task to show it works
    console.log(TASKTOSAVE);

    //4. Show on screen (local echo - gone on  refresh);
    displayTask(TASKTOSAVE);
  }
});
