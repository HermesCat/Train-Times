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

    
  
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var nextTrain = childSnapshot.val().firstTrain;
  var freq = childSnapshot.val().freq;


// converting stuff to moment

var currentTime = moment();

var nextTrain;


console.log(trainName);
console.log(destination);


var trainTimeConverted = moment(nextTrain, "HH:mm")
console.log(trainTimeConverted)
var minutesTilNextTrain;
// displays the time of the next train based on the frequency and the first arrival time of the train
if (trainTimeConverted > currentTime) {
    nextTrain = trainTimeConverted;
    minutesTilNextTrain = trainTimeConverted.diff(currentTime, 'minutes');;
} else {
    var minutesPast = currentTime.diff(trainTimeConverted, 'minutes');
    var remainder = minutesPast % freq;
    minutesTilNextTrain = freq - remainder;
    nextTrain = currentTime.add(minutesTilNextTrain, 'minutes');
}






//pull info from firebase
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(destination),
  $("<td>").text(freq),
  $("<td>").text(nextTrain.format('HH:mm')),
  $("<td>").text(minutesTilNextTrain)
);

// appends new row to the table body
$("#train-table > tbody").append(newRow);

}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);





});
//...get the realTimeDate/Clock Working.........................
var date = moment().format("M/D/YYYY");  
var time = moment().format("HH:mm:ss");  
console.log(date);
console.log(time);
//...append the date/time.....................................
$("#realTimeDate").text(date);
$("#realTimeClock").text(time);
