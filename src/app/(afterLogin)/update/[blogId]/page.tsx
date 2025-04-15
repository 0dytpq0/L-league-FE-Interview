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
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    blogId: string;
  };
}

// 블로그 데이터 가져오기 함수
async function getBlogDetail(blogId: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/blog/${blogId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: [QUERY_KEYS.BLOG_DETAIL, blogId] },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("블로그 상세 정보 가져오기 실패:", error);
    return null;
  }
}

// 동적 메타데이터 생성
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { blogId } = params;
  
  // 부모 메타데이터에서 기본 이미지 가져오기
  const previousImages = (await parent).openGraph?.images || [];
  
  // 블로그 데이터 가져오기
  const blog = await getBlogDetail(blogId);
  
  if (!blog) {
    return {
      title: "글 수정 - 블로그 글을 찾을 수 없습니다",
      description: "요청하신 블로그 글을 찾을 수 없습니다.",
    };
  }
  
  return {
    title: `글 수정 - ${blog.title}`,
    description: `${blog.title} 글을 수정합니다.`,
    openGraph: {
      title: `글 수정 - ${blog.title}`,
      description: `L-League 블로그에서 ${blog.title} 글을 수정합니다.`,
      images: blog.main_image ? [
        {
          url: blog.main_image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
        ...previousImages,
      ] : ['/og-update.png', ...previousImages],
    },
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
