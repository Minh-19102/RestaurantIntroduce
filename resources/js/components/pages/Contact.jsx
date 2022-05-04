import React from "react";

function Contact() {
  return (
    <div>
      Contact
      <form action="../../../../app/Http/Controllers/ContactController.php">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" placeholder="Your name..." />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" />

        <label htmlFor="title">Title</label>
        <input type="text" name="title" />

        <label htmlFor="content">Content</label>
        <input type="text-area" name="content" />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Contact;
