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

    getDayName(seconds){
        // console.log(date.getDay());
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(0);
        d.setUTCSeconds(seconds); 
        var dayName = days[d.getDay()];
        console.log(dayName);
        return dayName;
    }
    
    secondstotime(seconds){
        if(seconds==null){
            return ["test","test"]
        }
        let hours = this.convertUTCtoDate(seconds);
        let hoursarray=hours.split(" ");
        return hoursarray;
    }

    convertUTCtoDate(data){
        let d=new Date(0);
        d.setUTCSeconds(data);                          
        return d.toLocaleString("es-ES",{});  
    }

    handleClick(start,duration){
        alert("start:"+this.secondstotime(start)+ " End:"+(this.secondstotime(start+duration))); 
    }
  
    render() {
        if(this.state.isLoaded){
            console.log(this.state.epg);
            const events_array = Object.values(this.state.epg.events);
            let last_day;


            return (
                <IonContent>
                    <IonRow>
                        <IonSlides options={this.options}>
                            
                            {events_array.map((event,i,arr) => (
                                <IonSlide style={{width:event.spa.duration/7}}  key={event.spa.id} onClick={ 
                                        () => this.handleClick(event.spa.start,event.spa.duration) 
                                    }> 
                                    <IonRow className="timeline_day">
                                        {/* {(this.secondstotime((arr[i-1]) ? arr[i-1].spa.start:null)[0]===this.secondstotime(event.spa.start)[0])?<span></span>:<span>{last_day===this.secondstotime(event.spa.start)[0]}{this.secondstotime(event.spa.start)[0]}</span>} */}
                                        <span>{this.secondstotime(event.spa.start)[0]}  ({this.getDayName(event.spa.start)})</span>

                                    </IonRow>
                                    <IonRow className="timeline">
                                        {(arr.length -1 === i)?<span>{this.secondstotime(event.spa.start+event.spa.duration)[1]}</span>:<span>{this.secondstotime(event.spa.start)[1]}</span>}
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
  