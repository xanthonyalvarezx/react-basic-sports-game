class Team extends React.Component{
    constructor(props){
        super(props)
        

this.state = {
    venue:'Madison square garden',
    shotPercent:0,
    score:0,
    shotsTaken:0,
    resets:0,
    
} 
this.shotSound = new Audio('Back+Board.mp3')

this.scoreSound = new Audio('Swish+2.mp3')



}


handleShoot = (event) => {  
    
    let score = this.state.score
    setTimeout(()=> {

        this.shotSound.play()
    }, 25 )

    if( Math.random() > 0.5){
        score += 1
        setTimeout(()=> {
            this.scoreSound.play()
        }, 100 )
    }
        this.setState((currentState, props)=>({   
                       
            
            shotsTaken:currentState.shotsTaken + 1,
            score,
        }
    ))
     
}
handleReset = (event) => {
     
    
    this.setState((currentState, props)=> ({
        
        score: currentState.score = 0,
        shotsTaken:currentState.shotsTaken = 0,
        resets:currentState.resets + 1,
        shotPercent:currentState.shotPercent  = 0
        
    }
    ))
    
    
}




render(){
    let shotPercentDiv

    if(this.state.shotsTaken){
const shotPercent = Math.round((this.state.score / this.state.shotsTaken)* 100)
         shotPercentDiv =(
            <div><strong>Shot%:{shotPercent}</strong></div>
         )
    }
return(
    <div className='Game'>
        
        <h3>{this.props.name}</h3>
        <div className='logo'><img src={this.props.logo} alt="team logo"/></div>

        <div className='shotDiv'>
        <button id="Shoot" onClick={this.handleShoot}>Shoot</button>
        <p>Score: {this.state.score}</p>

        <p>shotsTaken: {this.state.shotsTaken}</p>
        {shotPercentDiv}
        </div>


        <p><button id="reset" onClick={this.handleReset}>Reset</button> <br/>
        Resets: {this.state.resets}</p>
        
    </div>
    )
}

} 

function Game(props){
return(
<div className='Game'>
<h1>Welcome to{props.venue}!</h1>
<div className='stats'>
        
        <Team

       name={props.homeTeam.name} 
       logo={props.homeTeam.logoSrc} 
       />

       <div className='versus'><h1>VS</h1></div>
       
       <Team

name={props.visitingTeam.name} 
logo={props.visitingTeam.logoSrc} 
       
       />

        </div>
    </div>



)


}
    



function App (props) {
    const thunder = {
        name:"The Thunder",
       logoSrc:"./download.jpeg"
    }
    const bulldogs = {
        name:"The Bulldogs",
       logoSrc:"./bulldog.jpeg"
    }
    const lions = {
        name:"The Lions",
       logoSrc:"./Lions.jpeg"
    }
    const polarBears = {
        name:"The Polar Bears",
       logoSrc:"./polar-bears.png"
    }
return (
    <div className='App'>
        <Game venue='Madison Square Garden'
        homeTeam={thunder}
        visitingTeam={bulldogs}
        />
        
        <Game venue=' MGM Grand'
         homeTeam={lions}
         visitingTeam={polarBears}
        />
    </div>
       
)
    
    
}










ReactDOM.render(
<App/>,document.getElementById('root')
)

