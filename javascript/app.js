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
var database = firebase.database();


//...global variables..................................//
var trainName = "";
var destination = "";
var freq = "";
var firstTrain = "";

$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  trainName = $("#trainNameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  freq = $("#firstTrainInput").val().trim();
  firstTrain = $("#freqInput").val().trim();


newTrain = {
  trainName: trainName,
  destination: destination,
  freq: freq,
  first: firstTrain
    };
    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#freqInput").val("");


     //make a database ref function to add to the DOM
  database.ref().push(newTrain); {
    var sv = snapshot.val();
      // Log everything that's coming out of snapshot
      console.log(sv.val().trainName);
      console.log(sv.val().destination);
      console.log(sv.val().freq);
      console.log(sv.val().firstTrain);


  //pulling from firebase to append dom

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var freq= childSnapshot.val().frequency;
  var firstTrain = childSnapshot.val().time;
  $("#trainNameInput").append(trainName);
  $("#destinationInput").append(destination);
  $("#firstTrainInput").append(freq);
  $("#freqInput").append(firstTrain);

}

  // Change the HTML to reflect
  $("#trainNameInput").append(sv.val().trainName);
  $("#destinationInput").append(sv.val().destination);
  $("#firstTrainInput").append(sv.val().freq);
  $("#freqInput").append(sv.val().firstTrain);
};
});



//...get the realTimeDate/Clock Working.........................
var date = moment().format("M/D/YYYY");  
var time = moment().format("HH:mm:ss");  
console.log(date);
console.log(time);
//...append the date/time.....................................
$("#realTimeDate").text(date);
$("#realTimeClock").text(time);

