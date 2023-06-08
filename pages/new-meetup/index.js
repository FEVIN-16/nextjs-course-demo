import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';


const NewMeetUp = () => {
    const router = useRouter();
    const addMeetupHanler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(enteredMeetupData);

        const data = await response.json();
        console.log(data);
        router.push('/');
    }
    return (
        <>
            <Head>
                <title>New Meetup</title>
                <meta name='description' content='Add your own new Meetups' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHanler} />
        </>
    );
}
export default NewMeetUp;