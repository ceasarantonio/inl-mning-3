window.addEventListener('load', function (event) {
  let btnSend = document.getElementById('btnSend');
  let chatText = document.getElementById('chattText');
  let userName = document.getElementById('userName');
  let btnLoggOut = document.getElementById('btnLoggOut');
  let body = document.getElementById('body');
  let chatTable = document.getElementById('chatTable');
  let btnVerify = document.getElementById('btnVerify');
  let h1 = document.createElement('h1');
  let provider = new firebase.auth.GithubAuthProvider();
  let btnHidden = document.getElementById('btnHidden');
  let picture = document.createElement('img');

  let user = '';
  btnSend.disabled = true;
  chatTable.style.visibility = "hidden";
  btnHidden.style.visibility = "hidden";
  btnLoggOut.disabled = true;
  chatText.disabled = true;

  btnVerify.addEventListener('click', function (event) {
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        user = result.user;
        console.log(user);
        h1.innerHTML = `Välkommen ${user.displayName}`;
        body.insertBefore(h1, body.childNodes[0]);
        btnLoggOut.disabled = false;
        btnSend.disabled = false;
        btnVerify.disabled = true;
        chatText.disabled = false;
        picture.setAttribute("src", user.photoURL);
        //picture.setAttribute("width", "304");
        //picture.setAttribute("height", "228");
        body.insertBefore(picture, body.childNodes[0]);
        console.log('Test', user.displayName == "Daniel Karlsson")
        if (user.displayName == "Daniel Karlsson") {
          btnHidden.style.visibility = "visible";
        } else {
          btnHidden.style.visibility = "hidden";
        };
      });


  })

  btnLoggOut.addEventListener('click', function (event) {
    h1.innerHTML = `Logged Out ${user.displayName}`;
    btnLoggOut.disabled = true;
    btnVerify.disabled = false;
    chatText.disabled = true;
    btnSend.disabled = true;
    btnHidden.style.visibility = "hidden";
    body.removeChild(picture, body.childNodes[0]);


  });

  btnSend.addEventListener('click', function (event) {
    let message = {
      name: user.displayName,
      text: chatText.value,
      timestamp: new Date().toLocaleTimeString()
    }
    chatTable.style.visibility = "visible";
    let rt = document.createElement('tr');
    rt.innerHTML = "<td>" + message.name + "<td>" + message.text + "<td>" + message.timestamp;
    chatTable.appendChild(rt);
    firebase.database().ref('chattLogg/').push(message);
    chatText.value = '';

  })
  firebase.database().ref('chattLogg/').on('value', function (snapshot) {
    //console.log('Laddat nya meddelande');
    snapshot.forEach(messageRef => {
      let messageObject = messageRef.val();
      // console.log('Innehåll ', messageObject)


    })
  });

});
