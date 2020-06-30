This is what i use in .NET 4.8 to make a HTTP POST request.
With this code one can send multiple POST requests at a time Asynchronously. 
At the end of each request an event is raised. And also at the end of all request another event is raised.

The AeonLabs.Envoriment is a class with a collection or fields and properties.
The Aeonlabs.Security is a class for sending POST data encrypted using standard encryption algorithms
