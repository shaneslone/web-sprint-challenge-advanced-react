import React, { Component } from 'react';
import axios from 'axios';

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  state = {
    plants: [],
    search: '',
    unfilteredPlants: [],
  };

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount() {
    axios.get('http://localhost:3333/plants').then(res => {
      this.setState({
        plants: res.data.plantsData,
        unfilteredPlants: res.data.plantsData,
      });
      console.log(this.state.plants);
    });
  }

  handelChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      plants: this.state.plants.filter(plant =>
        plant.name.toLowerCase().includes(this.state.search.toLowerCase())
      ),
    });
  };

  handleClear = e => {
    e.preventDefault();
    this.setState({ plants: this.state.unfilteredPlants, search: '' });
  };
  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <>
        <form>
          <label>
            Filter By Name:
            <input
              name='filter'
              type='text'
              value={this.state.search}
              onChange={this.handelChange}
            />
          </label>
          <button onClick={this.handleSubmit}>Search</button>
          <button onClick={this.handleClear}>Clear Search</button>
        </form>
        <main className='plant-list'>
          {this.state?.plants?.map(plant => (
            <div className='plant-card' key={plant.id} data-testid='plant-card'>
              <img className='plant-image' src={plant.img} alt={plant.name} />
              <div className='plant-details'>
                <h2 className='plant-name'>{plant.name}</h2>
                <p className='plant-scientific-name'>{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className='plant-bottom-row'>
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className='plant-button'
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </>
    );
  }
}
