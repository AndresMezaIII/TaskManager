let empty = false;
$("#btnSave").click(function (e) {
  e.preventDefault();
  empty = false;
  for (const SELECTOR of [
    "#txtTitle",
    "#txtDescription",
    "#selColor",
    "#numBudget",
    "#selDate",
    "#selStatus",
  ]) {
    const value = $(SELECTOR).val();

    if (value == null || value.trim() === "") {
      $(SELECTOR).css("border", "1px solid red");
      empty = true;
    }
  }
  alert("Please fill out all fields");
});
