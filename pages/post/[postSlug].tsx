import {GetStaticPropsContext} from 'next';

import {MetricsTable} from '../../src/frontend/services/metrics/Metrics';

import {PostPage} from '@atomic/templates/PostPage/PostPage';
import {PostHead} from '@atomic/templates/PostPage/PostHead';
import {ErrorPage} from '@atomic/templates/ErrorPage/ErrorPage';
import {useMetricsStore} from '@hooks/metrics/useMetricsStore';
import {usePostBySlug} from '@hooks/posts/usePostsStore';
import {metricsService} from '@services';
import {postsStore} from '@store';

interface Props {
  postSlug: string;
  metrics: MetricsTable;
}

export default function PostRoute({postSlug, metrics}: Props): JSX.Element {
  useMetricsStore(metrics);

  const post = usePostBySlug(postSlug);
  if (!post) {
    return <ErrorPage mod="404" />;
  }

  return (
    <>
      <PostHead {...post} />
      <PostPage {...post} />
    </>
  );
}
// @See https://nextjs.org/docs/messages/invalid-getstaticpaths-value
export async function getStaticPaths() {
  const posts = postsStore.findAll();

  const paths = posts.map((post) => ({
    params: {postSlug: post.slug},
  }));

  return {paths, fallback: false};
}
// @See https://nextjs.org/docs/basic-features/data-fetching
export async function getStaticProps({params}: GetStaticPropsContext) {
  const postSlug = params?.postSlug as string;

  const post = postsStore.findOneBySlug(postSlug);
  if (post) {
    await metricsService.updateViewsById(post.id);
  }

  const metrics = await metricsService.findAll();

  return {
    props: {
      postSlug,
      metrics,
    },
  };
}
