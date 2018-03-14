// Initialize Firebase
var config = {
  apiKey: "AIzaSyBc7TuyP6Ev8C3CR8-ekI1Fzs16XQ6IKUI",
  authDomain: "train-scheduler-f42bb.firebaseapp.com",
  databaseURL: "https://train-scheduler-f42bb.firebaseio.com",
  projectId: "train-scheduler-f42bb",
  storageBucket: "train-scheduler-f42bb.appspot.com",
  messagingSenderId: "971593377764"
};

firebase.initializeApp(config);

var database = firebase.database();
// Capture Button Click
$("#add-train").on("click", function(event) {
  // prevent form from trying to submit/refresh the page
  event.preventDefault();

  // Capture User Inputs and store them into variables
  var name = $("#name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrainTime = $("#first-input")
    .val()
    .trim();
  var frequency = $("#frequency-input")
    .val()
    .trim();

  // Console log each of the user inputs to confirm we are receiving them
  console.log(name);
  console.log(destination);
  console.log(fristTrainTime);
  console.log(frequency);

  database.ref().push({
    name: name,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

database.ref().on("child_added", function(snapshot) {
  $("#name").text(snapshot.val().name);
  $("#destination").text(snapshot.val().destination);
  $("#frequency").text(snapshot.val().frequency);
  // $("#nextArrival").text(snapshot.val().rate);
  // $("#minutesAway").text(snapshot.val().rate);
});
