

$("#test").click(function(){
    app.test();
});



var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        var date = this.date();
        var heure = this.heure();
        date = date + " - " + heure;
        console.log(cordova.file);
        //alert(date);
        //setInterval(this.alarm);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    date: function(){
        // les noms de jours / mois
        var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
        var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
        // on recupere la date
        var date = new Date();
        // on construit le message
        var message = jours[date.getDay()] + " ";   // nom du jour
        message += date.getDate() + " ";   // numero du jour
        message += mois[date.getMonth()] + " ";   // mois
        message += date.getFullYear();
        return message;
    },

    heure: function(){
         var date = new Date();
         var heure = date.getHours();
         var minutes = date.getMinutes();
         if(minutes < 10)
              minutes = "0" + minutes;
         if (heure < 10)
              heure = "0" + heure;  
         return heure + "h" + minutes;
    },

    alarm: function(){

    },

    test: function(){
    	var jsonArray = {"name": "Chris", "age": "38"};
		var myJsonString = JSON.stringify(jsonArray);
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

	    	console.log('file system open: ' + fs.name);
	    	fs.root.getFile("test.json", { create: true, exclusive: false }, function (fileEntry) {

	        	console.log("fileEntry is file?" + fileEntry.isFile.toString());
	        	fileEntry.name == 'test.json';
	        	fileEntry.fullPath == 'C:/test.json'
	        	app.writeFile(fileEntry, null);

	    	});

		});
	},

	writeFile: function(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            app.readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
	},

	readFile: function(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            //	displayFileData(fileEntry.fullPath + ": " + this.result);
        };

        reader.readAsText(file);

    });
	},

};

app.initialize();