/* #6 start the #external #action and say hello */
console.log("App is alive");

/* global variable for Channel Name */
var currentChannel;
/* initialising the variable with the default channel name */
currentChannel = sevencontinents;

/* global variable for current location, initialised for sending messages */
var currentLocation = {
    latitude: 51.558420,
    longitude: -1.782040,
    what3words: "guitar.chair.bother"
};

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelObject Text which is set
 */
function switchChannel(channelObject) {
    //Log the channel switch
    console.log("Tuning in to channel", channelObject);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelObject.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/"'
    + channelObject.createdBy
    + '" target="_blank"><strong>'
    + channelObject.createdBy
    + '</strong></a>';

    /* remove either class */
    $('#channel-star').removeClass('far fas');
    // add class based on the channel
    $('#channel-star').addClass(channelObject.starred ? 'fas' : 'far');

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelObject.name + ')').addClass('selected');

    /* shifting the currentChannel variable into the channelObject */
    currentChannel = channelObject;
}

/* #6 #liking a channel on #click */
function star() {
    $('#channel-star').toggleClass('far');
    $('#channel-star').toggleClass('fas');

    currentChannel.starred = !currentChannel.starred;

    $('#channels li:contains(' + currentChannel.name + ') .fa-star').removeClass('far fas');
    $('#channels li:contains(' + currentChannel.name + ') .fa-star').addClass(currentChannel.starred ? 'fas' : 'far');
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

/* Message constructor function */
function Message(text) {
    // location details come from currentLocation
    this.createdBy = currentLocation.what3words,
    this.latitude = currentLocation.latitude,
    this.longitude = currentLocation.longitude,
    // set the date this was sent
    this.createdOn = new Date(),
    // set the expiration time (15 minutes * 60 seconds * 1000 milliseconds)
    this.expiresOn = new Date(Date.now() + 15 * 60 * 1000),
    // the message body
    this.text = text,
    this.own = true;
}

/* create a new maeesage to send and log it */
function sendMessage() {
    var message = new Message($('#message-box').val());
    console.log("New Message:", message);

    // insert the created message within the messages div
    $('#messages').append(createMessageElement(message));

    // scroll the messages to display the new message
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));

    // clear the message input field
    $('#message-box').val('');
}

/* this function creates a new message element 
* @param messageObject
* @returns {Html element}
*/
function createMessageElement(messageObject) {
    // date calculation using Date.now minus milliseconds and seconds
    var expiresIn = Math.round((messageObject.expiresOn - Date.now()) / 1000 / 60);

    // message element
    return '<div class="message' +
    // this dynamically adds the class 'own' (#own) to the #message, based on the
    // ternary operator. We need () in order to not disrupt the return.
    (messageObject.own ? ' own' : '') + '">' +
    '<h3><a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank">'+
    '<strong>' + messageObject.createdBy + '</strong></a>' +
    messageObject.createdOn.toLocaleString() +
    '<em>' + expiresIn + ' min. left</em></h3>' +
    '<p>' + messageObject.text + '</p>' +
    '<button>+5 min.</button>' + '</div>';
}

/* dynamically create the channel list using jQuery
*/
function listChannels() {
    //$('#channels ul').append("<li> New Channel </li>");

    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevencontinents));
    $('#channels ul').append(createChannelElement(killerapp));
    $('#channels ul').append(createChannelElement(firstpersononmars));
    $('#channels ul').append(createChannelElement(octoberfest));
}

/* creating a new channel
* @param channelObject
* @returns {Html element}
*/
function createChannelElement(channelObject) {
    // creating a channel
    var channel = $('<li>').text(channelObject.name);

    // creating and adding the meta - the star and chevron
    var meta = $('<span>').addClass('channel-meta').appendTo(channel);

    // we add the star here
    $('<i>').addClass('fa-star').addClass(channelObject.starred ? 'fas' : 'far').appendTo(meta);

    // add the message count and expiration time
    $('<span>').text(channelObject.messageCount + ' new').appendTo(meta);
    $('<span>').text(channelObject.expiresIn + ' min').appendTo(meta);

    // this adds the chevron
    $('<i>').addClass('fas').addClass('fa-chevron-right').appendTo(meta);

    // display the channel
    return channel;
}