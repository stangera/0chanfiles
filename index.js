let refreshInterval;
const REFRESH_DELAY = 3000;

function loadMessages() {
  console.log("Loading messages...");
  db.collection("users").doc("user1").get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data.main) {
          if (JSON.stringify(messages) !== JSON.stringify(data.main)) {
            messages = data.main;
            displayMessages();
          }
        }
      }
    })
    .catch((error) => {
      console.log("Error occurred", error);
    });
}

function startAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  refreshInterval = setInterval(() => {
    loadMessages();
  }, REFRESH_DELAY);

  loadMessages();
}

function stopAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('messages-container')) {
    const container = document.createElement('div');
    container.id = 'messages-container';
    document.body.appendChild(container);
  }
  
  startAutoRefresh();
});

async function send() {
  const usernameInput = document.getElementById("username-inp");
  const messageInput = document.getElementById("message-inp");
  
  let username = usernameInput.value.trim();
  const messageText = messageInput.value.trim();

  if (!username) {
    username = "Anonymous";
  }

  if (!messageText) return; // Не отправляем пустые сообщения

  const newMessage = {
    username: username,
    message: messageText,
    time: new Date()
  };

  try {
    messages.push(newMessage);

    await db.collection("users").doc("user1").set({
      main: messages
    }, { merge: true });

    messageInput.value = '';
    displayMessages();

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  } catch (error) {
    console.error("Error occurred", error);
    messages.pop();
  }
}let messages = [];

const firebaseConfig = {
  apiKey: "AIzaSyANMtaO13zEoctg0gtE7oKwnAo_FIFDeq8",
  authDomain: "dbtest-hexi.firebaseapp.com",
  projectId: "dbtest-hexi",
  storageBucket: "dbtest-hexi.appspot.com",
  messagingSenderId: "979642314448",
  appId: "1:979642314448:web:221ee30e8c334258f1b8d5",
  measurementId: "G-68QCZKDLLP"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function loadMessages() {
  console.log("loading messages...")
  db.collection("users").doc("user1").get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data.main) {
          messages = data.main;
          displayMessages();
        }
      }
    })
    .catch((error) => {
      console.log("Error occured", error);
    });
}

function displayMessages() {
  const container = document.getElementById('messages-container') || document.body;
  container.innerHTML = '';

  messages.forEach(msg => {
    const messageElement = document.createElement('p');

    let time;
    if (msg.time && msg.time.toDate) {
      time = msg.time.toDate();
    } else if (msg.time) {
      time = new Date(msg.time);
    } else {
      time = new Date();
    }

    messageElement.innerHTML = `
      <strong>${msg.username}</strong>
      <span style="color: #999999">
        - ${time.getDate().toString().padStart(2, '0')}.${(time.getMonth() + 1).toString().padStart(2, '0')}.${time.getFullYear()}
        ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')} [${messages.findIndex(current_msg => {return current_msg == msg;}) + 1}]
      </span>
      <br>${msg.message}
    `;
    
    container.appendChild(messageElement);
    window.scrollTo(0, document.body.scrollHeight);
  });
}

async function send() {
  const username = document.getElementById("username-inp").value.trim() || 'Anonymous';
  const messageText = document.getElementById("message-inp").value.trim();

  if (!username) {
    username = "Anonymous";
  }

  const newMessage = {
    username: username,
    message: messageText,
    time: new Date()
  };

  try {
    messages.push(newMessage);

    await db.collection("users").doc("user1").set({
      main: messages
    }, { merge: true });

    document.getElementById("message-inp").value = '';

    displayMessages();
  } catch (error) {
    console.error("Error occured", error);
    messages.pop();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadMessages();
});

