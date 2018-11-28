
var config = {
    apiKey: "AIzaSyBK14NYwTZSmQa2796jFADuwvwjgSILQ6A",
    authDomain: "train-activity-92852.firebaseapp.com",
    databaseURL: "https://train-activity-92852.firebaseio.com",
    projectId: "train-activity-92852",
    storageBucket: "train-activity-92852.appspot.com",
    messagingSenderId: "842460217674"
  };
  firebase.initializeApp(config);


  var database = firebase.database();



  var trainName = "";
  var destination = "";
  var firstTime = "00:00";
  var frequency = 0;



  $("#add-train-btn").on("click", function(e){
   
    e.preventDefault();
       

      var trainName = $("#train-name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTime = $("#first-train-input").val().trim();
      var frequency = $("#frequency-input").val().trim();
 


      console.log(trainName);
      console.log(destination);
      console.log(firstTime);
      console.log(frequency);

           database.ref().push({
            trainName:trainName,
            destination: destination,
            firstTime:firstTime,
            frequency:frequency 

            

        })
      
    // return false;
  });

  database.ref().on('child_added', function(childSnapshot){
    
    var trainNameData = childSnapshot.val().trainName
    var destinationData = childSnapshot.val().destination
    var frequencyData = childSnapshot.val().frequency
    var firstTrainTimeData = childSnapshot.val().firstTime
  
   
    var timeArr = firstTrainTimeData.split(":")
    var firstTrainTime = moment().hours(timeArr[0]).minutes(timeArr[1])
    var maxMoment = moment.max(moment(), firstTrainTime)
    if (maxMoment === firstTrainTime) {
  

      var tArrival = firstTrainTime.format("hh:mm A");
  
      var minutesAway = firstTrainTime.diff(moment(), "minutes");
  
    } else {
  
    
      var differenceTimes = moment().diff(firstTrainTime, "minutes");
      var tRemainder = differenceTimes % frequencyData;
      var minutesAway = frequencyData - tRemainder;
      var tArrival = moment().add(minutesAway, "m").format("hh:mm A ");
    }
  
    var newRow = `
    <tr><td>
    ${trainNameData}
    </td><td>
    ${destinationData}
    </td><td>
    ${firstTrainTime.format("HH:MM ")}
    </td><td>
    ${frequencyData}
    </td><td>
    ${tArrival}
    </td><td>
    ${minutesAway}
    </td></tr>
    `
    $("#train-body").append(newRow)
  })
