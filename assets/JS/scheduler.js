    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDnmaPP77QcP9yVKdiS6uSAJXJeGYqydFU",
        authDomain: "project1-cbdfd.firebaseapp.com",
        databaseURL: "https://project1-cbdfd.firebaseio.com",
        projectId: "project1-cbdfd",
        storageBucket: "project1-cbdfd.appspot.com",
        messagingSenderId: "461351271704",
        appId: "1:461351271704:web:84d64932d88d7bd4"
    };

    firebase.initializeApp(config);

    var dataRef = firebase.database();


    // Capture button Click
    $("#submit").on("click", function(event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();

        // Capture user inputs and store them into variables
        var name = $("#name-input").val().trim();
        var destination = $("#dest-input").val().trim();
        var frequency = $("#freq-input").val().trim();
        var arrival = $("#arrival-input").val().trim();
        // arrival = moment(arrival).format(arrivalFormat);

        // Code for the push
        dataRef.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            arrival: arrival,
        });


        // ***WIP*** clears input field
        // $('#name-input').empty();
        // $('#dest-input').empty();
        // $('#freq-input').empty();
        // $('#arrival-input').empty();

    });

    // Firebase watcher + initial loader - "Event Listener" in database

    dataRef.ref().on("child_added", function(childSnapshot) {
        // Console log each user input
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().arrival);

        // Creating variables for Firebase data
        var trainName = childSnapshot.val().name;
        var destinationName = childSnapshot.val().destination;
        var trainFrequency = childSnapshot.val().frequency;
        var firstTime = childSnapshot.val().arrival;
        // var trainDist = childSnapshot.val().dist;

        // Displays Firebase variables
        var newRow = $('<tr>').prepend(
            $("<td>").text(trainName),
            $("<td>").text(destinationName),
            $("<td>").text(trainFrequency),
            $("<td>").text(firstTime),
        );

        $("#display-row").append(newRow);

    });