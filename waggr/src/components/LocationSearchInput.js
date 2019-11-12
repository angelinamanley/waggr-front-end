import React from 'react';
import {Input} from 'semantic-ui-react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


class LocationSearchInput extends React.Component {

    state = {
        address: '',
        latitude: '', 
        longitude: ''
    }


  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
      this.setState({location: address})
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>this.setState( {latitude : latLng.lat, longitude: latLng.lng}))
      .then( () => this.props.selectLocation(this.state.address, this.state.latitude, this.state.longitude)
      )
      .catch(error => console.error('Error', error));
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
            required
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#14B89C', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}






export default LocationSearchInput