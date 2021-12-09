By Alberto Rodriguez
Student ID: 52092176

Website design process

First I created a rough website design by hand. This allowed me to see (roughly) how I wanted it to look.
Then I created the basic HTML semantics of the website for a general structure i.e. added sections, header tags etc.
After this I added content to the pages, i.e. text and images. Once this was finished I focused on the styling. I experimented
a lot with my website design and settles for a more informal style so I chose a colour scheme to reflect this: 
red contrasting with black and gray, informal writing style, etc.
Also includes some basic JavaScript: a button which shows a gif when clicked.

Challenges

One challenge I face was when implementing the chat features, especially the notification when users leave/join. 
I found it difficult at first since I had not used socket.io much in the past but after reading the official documentation and examples provided
it was much easier to think of a solution. 
Another challenge was checking if users are typing. Tried many technique such as adding EventListeners, and others but I just
could not figure out how to adapt it to my code.

How the chat application client side communicates with server

The client side is in charge of allocating the user their unique username which is then emitted to the 
server which picks up the packet and makes sure they are added to set of current user, it then 
communicates back to the client, telling it to update the UI so that it shows the new user. This is essentially the core of the 
communication between the client and server: the client sends a request to the server, which processes the request and sends information back to the client.
The server and client 'listen' for certain actions (such as 'user connected' for example) and then process them accordingly.
Another example where the client and server communicate is the instance where a user is disconnected: The server knows when a user is disconnected to removes them
from the list of active users and then sends a message to the client telling it that a user has disconnected, which then allows the client to 
update the HTML on the page. For the case of submitting messages an event listener is used to check when the user submits 
the form and passes the appropriate data to the server from the client.

sources used:
- W3Schools @ https://www.w3schools.com/
- Socket.io @ https://socket.io/
- https://stackoverflow.com/questions/16766488/socket-io-how-to-check-if-user-is-typing-and-broadcast-it-to-other-users
