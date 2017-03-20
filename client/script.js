$(document).ready(function() {
    var $locationList = $('#location-list');
    var $nameField = $('#location-name');
    var $phoneField = $('#location-phone');
    var $deliversField = $('#location-delivers');
    var $line1Field = $('#location-line1');
    var $line2Field = $('#location-line2');
    var $cityField = $('#location-city');
    var $stateField = $('#location-state');
    var $zipField = $('#location-zip');

    $(".submit").on("click", postLocation);
    
    function addLocation(location) {
       var $newLocation = $('<div class="new-location"></div>');
        $('<h3></h3>').text(location.name).appendTo($newLocation);
        $('<h5></h5>').text(location.phone).appendTo($newLocation);
        $('<h5></h5>').text(location.address.line1).appendTo($newLocation);
        $('<h5></h5>').text(location.address.line2).appendTo($newLocation);
        $('<h5></h5>').text(location.address.city).appendTo($newLocation);
        $('<h5></h5>').text(location.address.state).appendTo($newLocation);
        $('<h5></h5>').text(location.address.zip).appendTo($newLocation);
        var $checkbox = $('<label><input type="checkbox" disabled>Delivers</label>');
            if(location.delivers) {
                $checkbox.children().first().attr('checked', true);     
                $newLocation.append($checkbox);
            }
        $locationList.append($newLocation);
    }

    function getLocations() {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/api/locations'
        }).then(function(locations) {
            for (var i = 0; i < locations.length; i++) {
                addLocation(locations[i]);
            }
        }, function (err) {
            console.log(err);
        });   
    }
    getLocations();
    

    function postLocation() {
        var location = {
            name: $nameField.val(),
            phone: $phoneField.val(),
            delivers: $deliversField.is(':checked'),
            address: {
                line1: $line1Field.val(),
                line2: $line2Field.val(),
                city: $cityField.val(),
                state: $stateField.val(),
                zip: $zipField.val()
            }
        };

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/api/locations',
            contentType: 'application/json',
            data: JSON.stringify(location),
        }).then(function(){
            console.log('posting');
                $nameField.val('');
                $phoneField.val('');
                $deliversField.attr('checked', false);
                $line1Field.val('');
                $line2Field.val('');
                $cityField.val('');
                $stateField.val('');
                $zipField.val('');
                window.location.reload();    
            })
    }      
});