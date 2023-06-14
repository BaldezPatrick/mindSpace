
# MindSpace: A MVC Web Application

MindSpace is a cutting-edge web application developed using the Node.js runtime environment, along with the robust Express framework. It follows the widely adopted MVC (Model-View-Controller) architectural pattern, providing a structured and efficient approach to building web applications.

In MindSpace, data persistence is ensured through the MySQL database management system. This reliable and widely used database allows for efficient storage, retrieval, and management of application data, ensuring a seamless experience for users. The application incorporates a complete CRUD (Create, Read, Update, Delete) functionality, enabling users to easily create, view, update, and delete their thoughts and ideas.

MindSpace also implements an user authentication system. This ensures that only authorized individuals can access and interact with some parts of the application.

Handlebars is integrated into MindSpace for managing the dynamic rendering of views.


## Stack

**Front-end:** Handlebars Template

**Back-end:** Node, Express, MySql


## How to run?

To run the program you must, first of all, have MySQL installed on your machine and you must create a database. After that, configure the `.env` file, where the host name (DB_HOST), database name (DB_NAME), user name (DB_USER_NAME) and password (DB_PASSWORD) are allocated.

After that:

```bash
  npm install
  npm start
```
    