import {MongoClient} from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'
import { Fragment } from 'react'
// const dummy_meetups = [
//     {
//         id:'m1',
//         title:'Firtst meet up',
//         image:'https://upload.wikimedia.org/wikipedia/commons/4/40/Panor%C3%A1mica_Oto%C3%B1o_Alc%C3%A1zar_de_Segovia.jpg',
//         address:'Some address will appear here',
//         description:'this is a first meetup'
//     },
//     {
//         id:'m2',
//         title:'Second meet up',
//         image:'https://upload.wikimedia.org/wikipedia/commons/4/40/Panor%C3%A1mica_Oto%C3%B1o_Alc%C3%A1zar_de_Segovia.jpg',
//         address:'Some address will appear here',
//         description:'this is a second meetup'
//     }
// ]
export default function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>NextJS Meetups</title>
                <meta 
                name="description" 
                content="Browse a huge list of highly active Next and React js meet ups!"
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}


//pregenerated file
//page will be faster with getStaticProps() than getServerSideProps()
//Prerendering
export async function getStaticProps(){
    //fetch data from API
    //data fetch away from the client side
    //This code will not end up in the client side bundle
    const client = await MongoClient.connect('mongodb+srv://admin:admin@cluster0.4yj4f.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

//will always run on server, 
//this is guarenteed to run for every request
//can perform operation which involes credentials which should not be exposed to the user
// export async function getServerSideProps(context){
//     const req = context.req
//     const res = context.res
//     //fetch from API
//     return {
//         props: {
//             meetups:dummy_meetups
//         }
//     }
// }

