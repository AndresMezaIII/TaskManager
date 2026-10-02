let title = $("#txtTitle").val().trim();
let description = $("#txtDescription").val().trim();
let color = $("#selColor").val().trim();
let date = $("#selDate").val().trim();
let status = $("#selStatus").val().trim();
let budget = $("#numBudget").val().trim();



$("#btnSave").click(function(e) {
    e.preventDefault();
    if (title == "") {
        $("#txtTitle").css("border","red 1px solid");
    }

    if (description == "") {
        $("#txtDescription").css("border","red 1px solid");
    }

    if (color == "") { 
        $("#selColor").css("border","red 1px solid");
    }

    if (date == "") {
        $("#selDate").css("border","red 1px solid");
    }
    if (status == "") {
        $("#selStatus").css("border","red 1px solid");
    }
    if (budget == "") {
        $("#numBudget").css("border","red 1px solid");
    }
    alert("Please fill in all required fields.");
});