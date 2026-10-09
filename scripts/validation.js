$("#btnSave").click(function (e) {
  e.preventDefault();
  let empty = false;

  for (const SELECTOR of [
    "#txtTitle",
    "#txtDescription",
    "#selColor",
    "#numBudget",
    "#selDate",
    "#selStatus",
  ]) {
    const VALUE = $(SELECTOR).val();
    const INVALID = VALUE == null || String(VALUE).trim() === "";

    $(SELECTOR).css("border", INVALID ? "1px solid red" : "");
    if (INVALID) empty = true;
  }

  if (empty) {
    alert("Please fill out all fields");
    return; // Stops here if validation fails.
  } else {
    saveTask();
  }
});
