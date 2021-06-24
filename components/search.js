
import styles from '../styles/Home.module.css'
import Router from 'next/router';

const Search = ({ value, onChange, loading }) => {
    const onSubmit = () => {
        if(value !== '') Router.push(`/?term=${value}&page=1`);
    }

    return (
        <div className={styles.input_container}>
            <div className={styles.inputInner}>
                <label htmlFor="search"></label>
                <input name="search" type="text" value={value} placeholder="Enter product name" onChange={onChange}/>
                {
                    loading ? <div className={styles.loader}/> : <button onClick={onSubmit}>👉</button>
                }
            </div>
        </div>
    )
};

export default Search;