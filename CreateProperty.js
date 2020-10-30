import React, { Component } from 'react';
import axios from "axios";
import configData from "./config.json";

class CreateProperty extends React.Component {

    state = {
        property: 
          {
            GroupLogoUrl : '',
            BedsString : '',
            Price : 0,
            SizeStringMeters : 0,
            DisplayAddress : 0,
            PropertyType : '',
            BerRating : '',
            MainPhoto : '',
            Photos: []
          }
      }     

      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

      changeHandler = event => {
        this.setState({
          [event.target.name]: {
            ...this.state[event.target.name],
            textValue: event.target.value
          }
        });
        
      };
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();

        let result = axios.post(`${configData.API_URL}/PostProperty`, this.state.property)
        
        .then( res=> {
          this.setState({
            property : [...this.state.property, property]
          })
        }, (error) => {
          console.log(error);
          if(result === null || result === 'undefined')
          {
            
          }
        });

      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Group Logo :
              <input type="text" value={this.state.property.GroupLogoUrl} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />

            <label>
              Beds :
              <input type="text" value={this.state.property.BedsString} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />

            <label>
            Price :
              <input type="text" value={this.state.property.Price} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />

            <label>
            Size :
              <input type="text" value={this.state.property.SizeStringMeters} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />

            <label>
            Display Address :
              <input type="text" value={this.state.property.DisplayAddress} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />

            <label>
            Property Type :
              <input type="text" value={this.state.property.PropertyType} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />

            <label>
            BerRating :
              <input type="text" value={this.state.property.BerRating} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />

            <label>
            Main Photo :
              <input type="text" value={this.state.property.MainPhoto} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />

            <label>
            Photos :
              <input type="text" value={this.state.property.Photos} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
  }

  export default CreateProperty;