import Header from "@/app/_component/Header";
import BackButton from "@/app/_component/BackButton";
import { NOTICE_MESSAGE } from "@/constants/message";
import BlogCreateForm from "../_component/BlogCreateForm";
import Notice from "@/app/(beforeLogin)/_component/Notice";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { getCategories } from "@/services/getCategories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '새 글 작성',
  description: 'L-League 블로그에 새로운 글을 작성해보세요.',
  openGraph: {
    title: '새 글 작성 - L-League Blog',
    description: '다양한 주제로 당신의 이야기를 공유해보세요.',
    images: ['/og-create.png'],
  },
};

export default async function Create() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, { page: 1, page_size: 10 }],
    queryFn: async () => await getCategories({ page: 1, page_size: 10 }),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <Header title="글 등록" leftComponent={<BackButton />} />
      <div className="flex flex-col gap-6 mx-5">
        <Notice message={NOTICE_MESSAGE.create} containerClassName="mx-0" />
        <HydrationBoundary state={dehydratedState}>
          <Suspense fallback={<Loading />}>
            <BlogCreateForm />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
}
