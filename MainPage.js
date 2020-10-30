import React, { Component } from 'react';
import axios from "axios";
import configData from "./config.json";

class MainPage extends React.Component {

    state = {
        homes: 
          [ ]
      }     
      onHandleGetAllProperties = () =>
      {
        let result = axios.get(`${configData.API_URL}/GetAllProperty`)
        .then( res=> {
          this.setState({
            homes: [...this.state.homes, result]
          })

          if(result === null || result === 'undefined')
          {
            
          }
        }, (error) => {
          console.log(error);
        });
      }

    render() {
      return  (
            <div>
                <form onSubmit={this.onHandleGetAllProperties(this)}>
                <button className="btn-add-item">Get All Property</button>
                </form>
                <ul>
                {this.state.homes.map(home => (
                    <li key={home.PropertyId} >
                    {home.title}
                    {home.GroupLogoUrl}
                    {home.BedsString}
                    {home.SizeStringMeters}
                    {home.DisplayAddress}
                    {home.PropertyType}
                    {home.BerRating}
                    {home.MainPhoto}
                    {home.Photos.map(photo => (
                            <img src={photo.Url} width="500" height="600"/>
                        ))}
                    <button onClick={this.onHandleGetAllProperties(this)}>Get All Property</button>
                    </li>
                ))}
                </ul>
            </div>

            );
    }
  }

  export default MainPage;