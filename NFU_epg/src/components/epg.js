import React, { Component } from 'react';
import data from '../data/epg.json';
import './epg.css';
import {IonContent,IonCard,IonCardSubtitle, IonCardHeader,IonCardTitle,IonItem, IonSlides, IonSlide, IonRow} from '@ionic/react';
export default class Epgloader extends Component {
    constructor(props ) {
      super(props);
      this.state = {epg:{data},isLoaded:false};
      this.options = {
        slidesPerView: 'auto', 
        zoom: false, 
        grabCursor: true,       
        virtual: true, 
        }
    }
  
    componentDidMount() {
        
        this.setState({
            isLoaded: true,
            epg:data
        })
        // console.log(this.state);
    }
  
    componentWillUnmount() {
    //   clearInterval(this.timerID);
    }
    
    secondstotime(seconds){
        return new Date(seconds * 1000).toISOString().substr(11, 8)
    }

    handleClick(start,duration){
        alert("start:"+this.secondstotime(start)+ " End:"+(this.secondstotime(start+duration))); 
    }
  
    render() {
        if(this.state.isLoaded){
            console.log(this.state.epg);
            const events_array = Object.values(this.state.epg.events);
            console.log(this.secondstotime(events_array.slice(0)[0].spa.start));
            console.log(this.secondstotime(events_array.slice(-1)[0].spa.start+events_array.slice(-1)[0].spa.duration));


            return (
                <IonContent>
                    <IonRow>
                        <IonSlides options={this.options}>

                            {events_array.map((event) => (
                                <IonSlide style={{width:event.spa.duration/7}}  key={event.spa.id} onClick={ 
                                        () => this.handleClick(event.spa.start,event.spa.duration) 
                                    }> 
                                    <IonRow className="timeline">
                                        <span>{this.secondstotime(event.spa.start)}</span>
                                    </IonRow>
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardSubtitle>{event.spa.id}</IonCardSubtitle>
                                            <IonCardTitle>{event.spa.name}</IonCardTitle>
                                            Start: {this.secondstotime(event.spa.start)}<br></br>
                                            End: {this.secondstotime(event.spa.start+event.spa.duration)}<br></br>
                                            Duration: {this.secondstotime(event.spa.duration)}
                                        </IonCardHeader>
                                    </IonCard>
                                </IonSlide>
                            ))}
                        </IonSlides>
                    </IonRow>
                </IonContent>
                
          );
        }

        return(
            <h1>{this.state.epg.title}</h1>
        )


    }
  }
  