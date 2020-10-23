import React, { Component } from 'react';
import axios from "axios";

class MainPage extends React.Component {

    state = {
        homes: 
          [ ]
      }

      onHandleGetAllProperties = () =>
      {
        let result = axios.get("http://localhost:51131/GetAllProperty")
        .then( res=> {
          this.setState({
            homes: [...this.state.homes, result]
          })
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