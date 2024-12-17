import React from 'react';

const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

function filterByTerm(inputArr, searchTerm) {
  // Check if there is a searchTerm
  if (!searchTerm) {
      alert("Please enter a search term");
      return[];
  }
  if (!inputArr.length) throw Error("inputArr cannot be empty");
  const regex = new RegExp(searchTerm, "i");
  return inputArr.filter(function(arrayElement) {
      return arrayElement.url.match(regex);
  });
};

export {Greeting, filterByTerm};