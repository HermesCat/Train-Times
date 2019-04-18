//...set up firebase.........................................
var config = {
  apiKey: "AIzaSyCvUMwQHCWQIBip85sJdtPS7h8d2a8NCzQ",
  authDomain: "train-times-7045c.firebaseapp.com",
  databaseURL: "https://train-times-7045c.firebaseio.com",
  projectId: "train-times-7045c",
  storageBucket: "train-times-7045c.appspot.com",
  messagingSenderId: "877606179573"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var freq = $("#firstTrainInput").val().trim();
  var firstTrain = $("#freqInput").val().trim();


// push new train values to firebase
var newTrain = {
  trainName: trainName,
  destination: destination,
  freq: freq,
  firstTrain: firstTrain
    };

  database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#freqInput").val("");

  });
 
// pull from firebase
 database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    
  
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var freq = childSnapshot.val().freq;
 
  $("#trainNameInput").append(trainName);
  $("#destinationInput").append(destination);
  $("#firstTrainInput").append(freq);
  $("#freqInput").append(firstTrain);


//pull info from firebase
var newRow = [
  $("#trainName").text(trainName).append(),
  $("destination").text(destination).append(),
  $("freq").text(freq).append(),
  // $("appendedNT").text(firstTrain)
];
$("#tbody").append(newRow);

 });


// //...get the realTimeDate/Clock Working.........................
// var date = moment().format("M/D/YYYY");  
// var time = moment().format("HH:mm:ss");  
// console.log(date);
// console.log(time);
// //...append the date/time.....................................
// $("#realTimeDate").text(date);
// $("#realTimeClock").text(time);
