import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { Movie } from '../src/models'
import { DataStore } from 'aws-amplify'
import { useRouter } from 'next/router'
import { Notifications } from 'aws-amplify';
import { withInAppMessaging } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";


const { InAppMessaging } = Notifications;
const myMovieEvent = { name: 'movies_event' };

const AddMovie = () => {
    const router = useRouter()
    const initValues = {
        title: '',
        url: '',
        description: ''
    }
    const [form, setForm] = useState(initValues)
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitMovie = async (e) => {
        e.preventDefault()

        await DataStore.save(
            new Movie({
                title: form.title,
                image: form.url,
                description: form.description
            })
        );

        if (!form.title || !form.url || !form.description) {
            alert('fill in all the fields')
            return;
        };
        InAppMessaging.syncMessages();
        InAppMessaging.dispatchEvent(myMovieEvent)
        // setTimeout(() => {
        //     router.push('/')
        // }, 15000)
    }


    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <form className={styles.form}>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Movie Name</label>
                        <input className={styles.formControl} type="text" placeholder="Avengers" onChange={handleChange} value={form.title} name="title" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}> Image</label>
                        <input className={styles.formControl} type="url" name="url" placeholder="https://" onChange={handleChange} value={form.url} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}> Description </label>
                        <textarea placeholder="Avengers" className={styles.formControl} onChange={handleChange} name="description" value={form.description} minLength={10} maxLength={50} />
                    </div>


                    <button className={[styles.button]} onClick={submitMovie} type="submit" > Submit Entry</button>
                </form>
            </div>
        </main>
    )
}

export default withInAppMessaging(AddMovie);