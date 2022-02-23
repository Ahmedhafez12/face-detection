import React from 'react'; 
import Tilt from 'react-tilt';
import camera from './camera.png';

const Logo = () => {
	return (
		<div className= ' ma4 mt8' style = {{ display: 'flex', justifyContent: 'flex-start' }}>		
			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 125, width: 125 }} >
	 			<div className="Tilt-inner pa3"> <img className="pt3" alt= 'logo' src={camera}/></div>
			</Tilt>
	    </div>
	);	
}
export default Logo; 