import styles from '../styles/Home.module.css'
import { useState } from 'react';

export default function Create() {

    const [name, setName] = useState('esalas')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [result, setResult] = useState('')


    const handleTitle = (event) => {
        setTitle(event?.target?.value)
    }

    const handleText = (event) => {
        setText(event?.target?.value)
    }

    const savePost = async () => {
        try {
            await fetch(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/esalas`, {
                method: "POST",
                payload: {
                    title,
                    text
                }
            })
                .then(response => response.json())
                .then(json => setResult(json));
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000);
        }catch (error) {
            console.log('error', error)
        }
}

return (
    <section className={`${styles.container} ${styles.form}`}>

        {
            result ? ( <h1> { result.response } </h1> ) :
            (
                <>
                    <div className={styles.container__form}>
                        <label>Title</label>
                        <input 
                            id="title" 
                            name="title" 
                            type="text" 
                            onChange={handleTitle}
                        />
                    </div>

                    <div className={styles.container__form}>
                        <label htmlFor="text">Text</label>
                        <input 
                            id="text" 
                            name="text" 
                            type="text" 
                            onChange={handleText}
                        />
                    </div>

                    <button
                        className={styles.button}
                        onClick={() => {
                            savePost()
                        }}
                    >
                        Save
                    </button>
                </>
            )
        }
        
    </section>
)
}