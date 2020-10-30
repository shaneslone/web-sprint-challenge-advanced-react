import React, { Component } from 'react';
import axios from 'axios';

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  state = {
    plants: [],
    unfilteredPlants: [],
    name: '',
    price: 0,
    plantsAreFilted: false,
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
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name && this.state.price) {
      // search for both price and name
      this.setState({
        plants: this.state.plants.filter(
          plant =>
            plant.name.toLowerCase().includes(this.state.name.toLowerCase()) &&
            plant.price <= this.state.price
        ),
        plantsAreFilted: true,
      });
    } else if (this.state.name) {
      // checks for just name
      this.setState({
        plants: this.state.plants.filter(plant =>
          plant.name.toLowerCase().includes(this.state.name.toLowerCase())
        ),
        plantsAreFilted: true,
      });
    } else if (this.state.price) {
      // checks for just price
      this.setState({
        plants: this.state.plants.filter(
          plant => plant.price <= this.state.price
        ),
        plantsAreFilted: true,
      });
    }
  };

  handleClear = e => {
    e.preventDefault();
    this.setState({
      plants: this.state.unfilteredPlants,
      name: '',
      price: 0,
      plantsAreFilted: false,
    });
  };
  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <>
        <form
          onSubmit={
            this.state.plantsAreFilted ? this.handleClear : this.handleSubmit
          }
        >
          <h2>Filter Plants</h2>
          <label>
            Name:
            <input
              name='name'
              type='text'
              value={this.state.name}
              onChange={this.handelChange}
            />
          </label>
          <label>
            Price
            <input
              name='price'
              type='number'
              value={this.state.price}
              onChange={this.handelChange}
            />
          </label>
          <button>
            {this.state.plantsAreFilted ? 'Clear Search' : 'Search'}
          </button>
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
