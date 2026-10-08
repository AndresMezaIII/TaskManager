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
});
