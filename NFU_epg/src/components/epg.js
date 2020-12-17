import React, { Component } from 'react';
import data from '../data/epg.json';
import './epg.css';
import {IonContent,IonCard,IonCardSubtitle, IonCardHeader,IonCardTitle,IonCardContent, IonSlides, IonSlide, IonCol} from '@ionic/react';
export default class Epgloader extends Component {
    constructor(props ) {
      super(props);
      this.state = {epg:{data},isLoaded:false};
      this.options = {
        virtual:true,
        spaceBetween: 0,
        slidesPerView: 5,
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
  
    // tick() {
    //   this.setState({
    //     date: new Date()
    //   });
    // }
  
    render() {
        if(this.state.isLoaded){
            console.log(this.state.epg);
            const events_array = Object.values(this.state.epg.events);
            console.log(events_array);
            return (
                <IonContent>
                    <IonSlides options={this.options}>
                        {events_array.map(function(event){
                            return (
                                <IonSlide key={event.spa.id}> 
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardSubtitle>{event.spa.id}</IonCardSubtitle>
                                            <IonCardTitle>{event.spa.name}</IonCardTitle>
                                        </IonCardHeader>

                                        <IonCardContent>
                                                Keep close to Nature's heart... and break clear away, once in awhile,
                                                and climb a mountain or spend a week in the woods. Wash your spirit clean.
                                        </IonCardContent>
                                    </IonCard>
                                </IonSlide>)
                        })}
                    </IonSlides>
              </IonContent>
                // <IonRow>
                //     <IonLabel>
                //         <h1>{this.state.epg.title}</h1>
                //     </IonLabel>
                    
                //     <IonSlides pager={true} options={this.options}>
                        
                //         <section className="events">
                //             {events_array.map(function(event){
                //                 return (
                //                 <IonSlide key={event.spa.id}> 
                //                     <IonCol>
                //                         <div  className="events__event">
                //                             <span>ID: {event.spa.id}</span><br></br>
                //                             <span>Name: {event.spa.name}</span><br></br>
                //                         </div>
                //                     </IonCol>
                //                 </IonSlide>)
                //             })}
                //         </section>
                //     </IonSlides>
                // </IonRow>

                
          );
        }

        return(
            <h1>{this.state.epg.title}</h1>
        )


    }
  }
  