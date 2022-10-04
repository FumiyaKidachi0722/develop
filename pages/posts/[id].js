import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { getAllpostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllpostIds();

  return {
    paths,
    fallback: false, //指定されたid以外の場合404エラー
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  /* fallback=trueのとき
  const router = useRouter();
  if (router.isFallback) {
    return <div>読み込み中...</div>;
  }
  */

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div
          dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} //要修正
        ></div>
      </article>
    </Layout>
  );
}
