import React, { Component } from "react";

// STYLING SHEETS
import "../css-sheets/App.css";
import "../css-sheets/plantCard.css";

// import App from "./App.js"
import AllPlants from "../page-routes/AllPlants";

// CLASS BASED COMPONENT
class PlantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      succulent: [],
      herb: [],
      flowers: [],
    };
  }

  getPlants = () => {
    fetch(process.env.REACT_APP_BACKEND_URL)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then(data => {
        console.log("data:", data);
        this.setState({ plants: data.plants });
      });
  };

  componentDidMount() {
    this.getPlants();
  }
  //Need to bring in plant data as STATE for findIndex to work



  // handleDelete = id => {
  //   // event.preventDefault();
  //   console.log("hitting this route");
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}` + "id", {
  //     method: "DELETE",
  //   }).then(response => {
  //     const findIndex = this.state.plants.findIndex(plant => plant._id === id);
  //     const copyPlants = [...this.state.plants];
  //     copyPlants.splice(findIndex, 1);
  //     this.setState({ plants: copyPlants });
  //   });
  // };


  //ADDED DELETE ROUTE AND REMOVED STRING INTERPOLATION
  handleDelete = (id) => {
    fetch(process.env.REACT_APP_BACKEND_URL + id, {
      method: "DELETE",
    }).then(response => {
      const findIndex = this.state.plants.findIndex(plant => plant._id === id);
      const copyPlants = [...this.state.plants];
      copyPlants.splice(findIndex, 1);
      this.setState({ plants: copyPlants });
    });
  };

  render() {
    // console.log("data", this.state);
    return (
      <div className="Card">
        <div className="ImgBox">
          <img src={this.props.img} alt="Plant card" />
        </div>

        <button>ADD</button>
        {/* <button>DELETE</button> */}

        <button onClick={() => this.handleDelete()}>Delete</button>

        <h5 className="PlantType"> {this.props.type} </h5>
        <h3 className="PlantName"> {this.props.name} </h3>
        <h5 className="PlantDescription"> {this.props.description}</h5>
      </div>
    );
  }
}

export default PlantCard;
