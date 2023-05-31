import React from 'react'
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'

const Header = ()  => {

    


	return (
		<div className="header-app">
			<ul>
  <li><Link to={'/'}>
			Cars
		</Link></li>
  <li>	<Link to={'/mechanics'}>
			Mechanics
		</Link></li>
  <li><Link to={'/repaireds'}>
			Repairs
		</Link></li>
  <li>	<Link to={'/carTypes'}>
			CarTypes
		</Link></li>
</ul>
<br/>
</div>
     
		)
};

export default Header
