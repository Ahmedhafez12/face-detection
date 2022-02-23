import React from 'react'; 

const Ranking = ({name, counter}) => {
	return (
		<div> 
			<div className= 'f3'>{ `${name} , current rank is ...` }</div> 
			<div className= 'f1'>{counter}</div>
		</div>
	);
	
}
export default Ranking; 


