import React, { Component } from 'react';

class SearchComponent extends Component {

  findSubstring = (key, array) => {
    let results = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].indexOf(key) === 0) {
        results.push(array[i]);
      }
    }
    return results;
  };

  findComponent = (query, arr) => {
    let results = this.findSubstring(query, arr);
    results.forEach(item => {
      this.prependFoundComponent(item);
    });
  };

  prependFoundComponent = dataKey => {
    this.props.componentHolder.querySelectorAll(
      ".CurrencyComponent"
    ).forEach((item, index) => {
      if (item.getAttribute("data-key") === dataKey) {
        this.props.componentHolder.prepend(item);
      }
    });
  };

  SearchHandler = (e) => {
    let inputVal = e.target.value.toUpperCase();
    this.findComponent(inputVal, this.props.componentArray);
  }

  render() {
    return(
      <input type='text' onChange={this.SearchHandler} />
    )
  }
}

export default SearchComponent;