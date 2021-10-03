import { Component } from 'react';
class CreateContent extends Component {
  render() {
    return (
      <article>
        <h2>Create</h2>
        <form action="/create_process" method="post"
          onSubmit={function (e) {
            e.preventDefault();
            alert("Submit!!!!");
          }.bind(this)}
        >
          <p><input type="text" name="title" placehold