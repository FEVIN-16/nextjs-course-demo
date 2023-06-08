import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';


const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>Meetups</title>
                <meta name='description' content='Brows a huge list of Meetups'/>
            </Head>
            <MeetupList meetups={props.meetups} />
        </>

    );
}

// export const getServerSideProps=async ()=>{
//     return {
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://fevinfm:Fevin123@cluster0.xo9e2su.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()

            }))
        },
        revalidate: 1
    }
}

export default HomePage;