// Capture button Click
$("#submit").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var train = {
        name: $("#name-input").val().trim(),
        destination: $("#dest-input").val().trim(),
        frequency: $("#freq-input").val().trim(),
        arrival: $("#time-input").val().trim(),
    }

    // Console log each user input
    console.log(train);
    localStorage.clear();
    localStorage.setItem('train', JSON.stringify(train));

    // Output all of the new information into the relevant HTML sections
    $('#name-display').text(train.name);
    $('#dest-display').text(train.destination);
    $('#freq-display').text(train.frequency);
    $('#arrival-display').text(train.arrival);

})