import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css'


const Pagination = ({ loading, term, page, count }) => {
const perPage = 10;
const pageCount = Math.ceil(count / perPage);
const pageNumber = parseInt(page, 10);

  return (
    <div className={styles.pagination}>
      <Head>
        <title>
          Store Front - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/?term=${term}&page=${pageNumber - 1}`}>
        <a aria-disabled={(pageNumber <= 1) || loading}>← Prev</a>
      </Link>
      <p>
        Page {pageNumber} of {pageCount}
      </p>
      <Link href={`/?term=${term}&page=${pageNumber + 1}`}>
        <a aria-disabled={(pageNumber >= pageCount) || loading}>Next →</a>
      </Link>
    </div>
  );
}

export default Pagination;