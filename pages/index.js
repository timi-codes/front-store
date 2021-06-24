/* eslint-disable @next/next/no-img-element */
import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Search from 'components/search';
import Pagination from 'components/pagination'
import { useRouter } from 'next/router'

const useGetProducts = ({ term, page }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onSearch = useCallback(async () => {
    setLoading(true);
    const query = { term, page }
    const url = new URLSearchParams(query);
    const stream = await fetch(`https://api.test.mywebaisle.com/items/search?${url}`);
    const result = await stream.json();
    setResult(result);
    setLoading(false);
  }, [term, page])

  useEffect(() => {
    if (term !== undefined && page !== undefined) onSearch();
  }, [term, page, onSearch])

  return [
    onSearch,
    {
    loading,
    results: result
    }
  ]
}

export default function Home() {
  const { query } = useRouter();
  const page = query?.page;
  const queryTerm = query?.term;
  const [term, setTerm] = useState(queryTerm ? queryTerm : '');
  const [onSearch, { results, loading }] = useGetProducts({ term: queryTerm, page })

  return (
    <div className={styles.container}>
      <Head>
        <title>Store Front</title>
        <meta name="description" content="A simple search page for a grocery store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          🛍Gocart
        </h1> 

        <Search loading={loading} value={term} onChange={(e)=> setTerm(e.target.value)} />
        {results && results.total > 0 && (
          <Pagination
            loading={loading}
            count={results?.total}
            term={term}
            page={page}
          />
        )}
        {
          results && results.total === 0 && (
            <p className={styles.description}>
              No Result Found
            </p>
          )
        }
        {
          results && results.total > 0 && (
            <p className={styles.description}>
              {results?.total} Item(s) in Total
            </p>
          )
        }
        <div className={styles.grid}>
          {
            results && results.data.map((item) => (
              <div key={item.id} className={styles.card}>
                <img src={item.imageURL} height={210} width="100%" alt={item.name}/>
                <h1>{item.name}</h1>
                <p>{item.description || 'No description'}</p>
                <h5>{item.categoryName}</h5>
                <h2>${item.price}</h2>
              </div>
            ))
          }
        </div>
          {results && results.total > 0 && (
            <Pagination
              loading={loading}
              count={results?.total}
              term={term}
              page={page}
            />
          )}
      </main>

      <footer className={styles.footer}>
          <a
            href="https://github.com/timi-codes/front-store"
            target="_blank"
            rel="noopener noreferrer"
          >
            {'<👀 the source code/>'}
          </a>
      </footer>
    </div>
  )
}
