//newmeetup/
import { useRouter } from 'next/router';
import Head from 'next/head'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { Fragment } from 'react';
export default function NewMeetup() {
    const router = useRouter()
    //POST to DB from here
    async function addMeetupHandler(enteredMeetupData){
        const response = await fetch('/api/new-meetup',{
            method:'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        }) ;

        const data = await response.json()
        console.log(data)
        router.push('/')
    }
    return (
        <Fragment>
            <Head>
                <title>Add a New Meetups</title>
                <meta 
                name="description" 
                content="Add meet up and widen your network with different people!"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    )
}
