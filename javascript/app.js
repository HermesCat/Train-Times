//...get the realTimeDate/Clock Working.........................
var date = moment().format("M/D/YYYY");  
var time = moment().format("HH:mm:ss");  
console.log(date);
console.log(time);
//...append the date/time.....................................
$("#realTimeDate").text(date);
$("#realTimeClock").text(time);

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

//...global variables..................................//
var database = firebase.initializeApp();
var trainName;
var destination;
var freq;
var submitTime = date + time;

$("#submit").on("click", function(event) {
  event.preventDefault();



  // Grabbed values from text boxes
  trainName = $("#trainNameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  freq = $("#firstTrainInput").val().trim();
  submitTime = $("#freqInput").val().trim();


  database.ref().set({
  trainName: trainName,
  destination: destination,
  freq: freq,
  time: submitTime
});
database.ref().on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.trainName);
  console.log(sv.destination);
  console.log(sv.freq);
  console.log(sv.time);

  // Change the HTML to reflect
  $("#trainNameInput").text().prepend(sv.trainName);
  $("#destinationInput").text(sv.destination);
  $("#firstTrainInput").text(sv.freq);
  $("#freqInput").text(sv.time);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
});







