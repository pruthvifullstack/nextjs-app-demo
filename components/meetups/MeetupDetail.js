import React,{Fragment} from 'react'
import classes from './MeetupDetail.module.css';

export default function MeetupDetail(props) {
    return (
        <section className={classes.detail}>
            <img src={props.image} width='500px' height='300px' alt={props.title}/>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    )
}
