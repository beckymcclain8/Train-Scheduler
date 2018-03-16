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

  var newTrain = {
    name: name,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  database.ref().push(newTrain);

  // Console log each of the user inputs to confirm we are receiving them
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrainTime);
  console.log(newTrain.frequency);

  alert("New Train Added to Schedule");

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
  
});

database.ref().on("child_added", function(snapshot, prevChildKey) {

  console.log(snapshot.val());

  var trainName = snapshot.val().name;
  var trainDest = snapshot.val().destination;
  var firstTrain = snapshot.val().firstTrainTime;
  var frequency = snapshot.val().frequency;

  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrain);
  console.log(frequency);

var tFrequency = frequency;
var firstTime = firstTrain;
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

tRemainder = diffTime % tFrequency;
console.log(tRemainder);

var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td><td>");
});
