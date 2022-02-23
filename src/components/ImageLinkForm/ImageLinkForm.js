import React from 'react'; 
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonChange}) => {
	return (
		<div>
			<p className='f3'> {'Face Recognintion API. Give it a try'}</p> 
			<div className='center'>
				<div className = "center form pa4 br3 shadow-5 w-50">
					<input className= "f4 pa2 w-75 center" type = "text" onChange = {onInputChange}/> 
					<button className= "w-30 grow f4 link ph3 pv2 dib white bg-black" onClick = {onButtonChange}>Detect</button> 
				</div>
			</div>
		</div>
	);	
}
export default ImageLinkForm;


