import Header from "@/app/_component/Header";
import BackButton from "@/app/_component/BackButton";
import { NOTICE_MESSAGE } from "@/constants/message";
import Notice from "@/app/(beforeLogin)/_component/Notice";
import BlogUpdateForm from "../../_component/BlogUpdateForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getCategories } from "@/services/getCategories";
import { Suspense } from "react";
import Loading from "@/app/loading";

interface Props {
  params: {
    blogId: string;
  };
}
export default async function Update({ params }: Props) {
  const queryClient = new QueryClient();
  const { blogId } = params;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, { page: 1, page_size: 10 }],
    queryFn: async () => await getCategories({ page: 1, page_size: 10 }),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <Header title="글 수정" leftComponent={<BackButton />} />
      <div className="flex flex-col gap-6 mx-5">
        <Notice message={NOTICE_MESSAGE.create} containerClassName="mx-0" />
        <HydrationBoundary state={dehydratedState}>
          <Suspense fallback={<Loading />}>
            <BlogUpdateForm blogId={Number(blogId)} />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
}
