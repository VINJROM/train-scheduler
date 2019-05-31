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

    // Initial Values
    var name = "";
    var destination = "";
    var frequency = 0;
    var arrival = 0;
    var arrivalFormat = "hh:mm A";



    // Capture button Click
    $("#submit").on("click", function(event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();

        // Capture user inputs and store them into variables
        name = $("#name-input").val().trim(),
            destination = $("#dest-input").val().trim(),
            frequency = $("#freq-input").val().trim(),
            arrival = $("#time-input").val().trim(),
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
        // $('#time-input').empty();

    });

    // Firebase watcher + initial loader - "Event Listener" in database
    dataRef.ref().on("child_added", function(childSnapshot) {
            // Console log each user input
            console.log(childSnapshot.val().name);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().frequency);
            console.log(childSnapshot.val().arrival);

            // full list of items to the well
            $("#display-row").prepend("<tr><td id='name-display'>" + childSnapshot.val().name + "</td>" +
                "<td id='dest-display'>" + childSnapshot.val().destination + "</td>" +
                "<td id='freq-display'>" + childSnapshot.val().frequency + "</td>" +
                "<td id='arrival'-display'>" + childSnapshot.val().arrivalFormat + "</td>" +
                "<td id='minutes-display'>" + childSnapshot.val().arrival + "</td></tr>");
        },
        // Handle the errors
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        $("#name-display").text(snapshot.val().name);
        $("#dest-display").text(snapshot.val().destination);
        $("#freq-display").text(snapshot.val().frequency);
        $("#arrival-display").text(snapshot.val().arrival);
    });