import Footer from "./_component/Footer";
import Notice from "./_component/Notice";
import { Suspense } from "react";
import MainHeader from "./_component/MainHeader";
import { NOTICE_MESSAGE } from "@/constants/message";
import ImageWrapper from "../_component/ImageWrapper";
import BlogList from "./_component/BlogList";
import TopViewsSlider from "./_component/TopViewsSlider";
import Link from "next/link";
import Loading from "../loading";
import TabMenu from "./_component/TabMenu";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  BlogListRequest,
  BlogListResponse,
  CategoryResponse,
} from "@/types/blog";
import { QUERY_KEYS } from "@/constants/queryKeys";
import getBlogList from "@/services/getBlogList";

// 메타데이터 생성 함수
export async function generateMetadata({ params }: Props) {
  const title = params.title ? `"${params.title}" 검색 결과` : "L-League Blog";

  return {
    title,
    description: "L-League 블로그에서 다양한 카테고리의 이야기를 만나보세요.",
    alternates: {
      canonical: "/",
      languages: {
        "ko-KR": "/ko",
        "en-US": "/en",
      },
    },
    openGraph: {
      images: [
        {
          url: "/og-home.png",
          width: 1200,
          height: 630,
          alt: "L-League Blog 메인 이미지",
        },
      ],
    },
  };
}

interface Props {
  params: {
    tab?: string;
    title?: string;
  };
}

// 서버 컴포넌트에서 카테고리 데이터 가져오기
export async function getCategories() {
  const response = await fetch(
    `${process.env.API_URL}/api/v1/category?page=1&page_size=10`,
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

export default async function Main({ params }: Props) {
  const { title } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<
    CategoryResponse,
    Error,
    { id: number; name: string }[]
  >({
    queryKey: [QUERY_KEYS.CATEGORIES, { page: 1, page_size: 10 }],
    queryFn: getCategories,
  });
  await queryClient.prefetchQuery<BlogListResponse, Error, BlogListRequest>({
    queryKey: [QUERY_KEYS.BLOG_LIST, { page: 1, page_size: 10 }],
    queryFn: async () => await getBlogList({ page: 1, page_size: 10 }),
  });
  const dehydratedState = dehydrate(queryClient);
  const searchTitle = title;

  return (
    <div className="relative">
      {/* header - 검색 모달 포함 (클라이언트 컴포넌트) */}
      <MainHeader title="BLOG" />

      {/* 공지 */}
      <Notice
        message={NOTICE_MESSAGE.main}
        label="공지"
        containerClassName="min-w-[390px] whitespace-nowrap"
      />

      {/* 조회수 TOP 10 */}
      <div className="flex items-center gap-1 py-[10px] mx-3 tablet:mx-7">
        <ImageWrapper
          src={"/icon_rank.svg"}
          alt="rank"
          containerClassName="relative aspect-auto w-6 h-6 tablet:w-7 tablet:h-7 mr-1"
          objectFit="cover"
        />
        <span className="text-xl font-bold tablet:text-2xl">조회수 TOP 10</span>
        <ImageWrapper
          src={"/icon_next.svg"}
          alt="next"
          containerClassName="relative aspect-auto w-6 h-6 mt-[1px] tablet:w-7 tablet:h-7"
          objectFit="cover"
        />
      </div>
      {/* 조회수 슬라이드 */}
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<Loading />}>
          <TopViewsSlider limit={10} />
        </Suspense>
        <TabMenu />

        {searchTitle && (
          <div className="flex items-center justify-between mx-3 mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-blue-700 font-medium flex items-center">
              <ImageWrapper
                src="/icon_search.svg"
                alt="search"
                containerClassName="w-5 h-5 mr-2"
                objectFit="contain"
              />
              <span>{`"${searchTitle}" 검색 결과`}</span>
            </div>
            <Link href={`/`} className="text-blue-700 font-bold">
              전체보기
            </Link>
          </div>
        )}

        <Suspense fallback={<Loading />}>
          <BlogList pageSize={10} title={searchTitle} />
        </Suspense>
      </HydrationBoundary>
      <Footer />
    </div>
  );
}
