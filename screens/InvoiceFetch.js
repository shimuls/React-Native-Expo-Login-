import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import '../assets/css/styles.css'

export default function InvoiceFetch(props) {
  const [books, setBooks] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      'https://www.anapioficeandfire.com/api/books?pageSize=30'
    );

    setBooks(response.data);
  };

  return (
    <div className={styles.container}>
      <h1>Search Invoice</h1>
      <h2>Fetch a list from an API and display it</h2>

      {/* Fetch data from API */}
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
        <br />
      </div>

      {/* Display data from API */}
      <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            const authors = book.authors.join(', ');

            return (
              <div className="book" key={index}>
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>

                <div className="details">
                  <p>👨: {authors}</p>
                  <p>📖: {book.numberOfPages} pages</p>
                  <p>🏘️: {book.country}</p>
                  <p>⏰: {cleanedDate}</p>
                </div>
              </div>
            );
          })}
      </div>

     
    </div>
  );
}

//const rootElement = document.getElementById('root');
//ReactDOM.render(<InvoiceFetch />, rootElement);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});