import './App.css';
import React , { Component } from 'react'; 
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Ranking/Ranking';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import 'tachyons'; 


/*// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement, additionally an implementation
// of ImageData is required, in case you want to use the MTCNN
const { Canvas, Image } = canvas
faceapi.env.monkeyPatch({ Canvas, Image});

const image = document.getElementById('myImg')*/


const Polygonparticles = {
                    polygon: {
                        enable: true,
                        type: 'inside',
                        move: {
                            radius: 20
                        }
                    }
                };

const initialState = {
      input : '', 
      imageUrl: '', 
      box: [],
      route: 'signin',
      isSignedin: false,
      user:
      { 
        id: '',
        name: '',
        email: '',
        counter: 0,
        joined: ''
      }
    };

class App extends Component { 
  constructor(){
    super()
    this.state = initialState;
  } 

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      counter: data.counter,
      joined: data.joined

    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageId');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiBox.left_col * width, 
      rightCol: width - (clarifaiBox.right_col * width),
      topRow: clarifaiBox.top_row * height,
      bottomRow: height - (clarifaiBox.bottom_row * height) 
     };
  }

  displayFaceBox = (box) => {
      this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); 
  }

  onButtonChange = () => {
   this.setState({imageUrl: this.state.input});
    // console.log(this.state.user);

     fetch('https://ancient-tundra-28750.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch('https://ancient-tundra-28750.herokuapp.com/image', {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {counter: count.counter}))
          //this.setState({user:{count}});
        })
        .catch(err => {
          console.log(err);
         });
      }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => {
        console.log(err);
      });
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({isSignedin: true})
    }
    this.setState({route: route});
  }
  render() {
    const { imageUrl, route, box, isSignedin } = this.state ; 
    return (
      <div className="App"> 
        <Particles className= 'particles' params = {Polygonparticles}/>
        <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange} />
        <Logo /> 
        { route === 'home'
          ? <div>
              <Rank
              name={this.state.user.name}
              counter={this.state.user.counter}/> 
              <ImageLinkForm onInputChange={this.onInputChange} onButtonChange={this.onButtonChange} /> 
              <FaceRecognition box = {box} imageUrl={imageUrl}/>  
            </div>
          :  route === 'signin' 
              ? <SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
             
        }
      </div> 
    );
  }
}
export default App;
