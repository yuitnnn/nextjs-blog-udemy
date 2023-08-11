import Image from 'next/image'
import { Inter } from 'next/font/google'

import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import utilStyle from '../styles/utils.module.css';
import Layout, { siteTitle } from '@/components/Layout';
import { getPostsData } from '../lib/post'

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, data, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <serction className={utilStyle.headingMd}>
        <p>私はフルスタックエンジニアです。</p>
      </serction>

      <section>
        <h2>📝 エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img 
                  src={`${thumbnail}`} 
                  className={styles.thumbnailImage}  
                />
              </Link>
              <Link legacyBehavior href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>
                {date}
              </small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
