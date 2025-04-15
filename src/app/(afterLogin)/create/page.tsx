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
import { CategoryRequest } from "@/types/blog";
import { Suspense } from "react";
import Loading from "@/app/loading";
export async function getCategories(params: CategoryRequest) {
  const response = await fetch(
    `${
      process.env.API_URL
    }/api/v1/category?page=${params.page.toString()}&page_size=${params.page_size.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("카테고리 데이터 패칭 실패");
  }
  return response.json();
}

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
