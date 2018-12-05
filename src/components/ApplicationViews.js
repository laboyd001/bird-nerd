import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SightingList from './sighting/SightingList'

// import SightingCard from './sighting/SightingCard'


export default class ApplicationViews extends Component {


  render() {
    return (
    <Route exact path="/" render={
      (props) => {
        return <SightingList/>
      }
    } />
    )
  }
}