import { BlogItem, BlogListResponse } from "@/hooks/useBlog";

// 사용자 정보
const fakeUser = {
  id: 1,
  email: "user@example.com",
  status: "A",
  name: "홍길동",
  phone_number: "010-1234-5678",
  profile_image: "/profile.jpg",
};

// 카테고리 정보
const fakeCategories = [
  { id: 1, name: "일상생활" },
  { id: 2, name: "맛집소개" },
  { id: 3, name: "제품후기" },
  { id: 4, name: "IT정보" },
];

// 블로그 아이템 데이터
export const fakeBlogItems: BlogItem[] = [
  {
    id: 1,
    title: "오늘의 일상 - 봄 나들이",
    content: "따뜻한 봄날, 가족들과 함께 나들이를 다녀왔습니다. 벚꽃이 만개한 공원에서 피크닉을 즐기고 아이들과 함께 자전거도 탔어요. 오랜만에 가족과 함께한 시간이 정말 소중했습니다.",
    main_image: "https://picsum.photos/id/10/500/300",
    sub_image: "https://picsum.photos/id/11/500/300",
    created_at: "2025-04-10T09:00:00Z",
    updated_at: "2025-04-10T09:00:00Z",
    deleted_at: null,
    user: fakeUser,
    category: fakeCategories[0],
  },
  {
    id: 2,
    title: "서울 강남 숨은 맛집 - 오미라이스 전문점",
    content: "강남역 근처에서 발견한 숨은 맛집을 소개합니다. 오미라이스 전문점인 이 곳은 특제 소스와 부드러운 달걀이 일품입니다. 점심시간에는 항상 줄을 서야 하니 일찍 방문하시는 것을 추천해요.",
    main_image: "https://picsum.photos/id/20/500/300",
    sub_image: "https://picsum.photos/id/21/500/300",
    created_at: "2025-04-08T12:30:00Z",
    updated_at: "2025-04-08T14:20:00Z",
    deleted_at: null,
    user: fakeUser,
    category: fakeCategories[1],
  },
  {
    id: 3,
    title: "최신 스마트폰 리뷰 - 갤럭시 S25",
    content: "이번에 출시된 갤럭시 S25를 2주간 사용해보았습니다. 전작에 비해 카메라 성능이 크게 향상되었고, 배터리 지속시간도 놀랍습니다. AI 기능도 실용적으로 개선되어 일상에서 많은 도움이 됩니다.",
    main_image: "https://picsum.photos/id/30/500/300",
    sub_image: "https://picsum.photos/id/31/500/300",
    created_at: "2025-04-05T18:45:00Z",
    updated_at: "2025-04-06T10:15:00Z",
    deleted_at: null,
    user: fakeUser,
    category: fakeCategories[2],
  },
  {
    id: 4,
    title: "2025년 프론트엔드 개발 트렌드",
    content: "올해 프론트엔드 개발 분야에서 주목해야 할 트렌드를 정리했습니다. React 19의 새로운 기능과 서버 컴포넌트의 발전, 그리고 AI 기반 코드 생성 도구들이 개발 생산성을 크게 향상시키고 있습니다.",
    main_image: "https://picsum.photos/id/40/500/300",
    sub_image: "https://picsum.photos/id/41/500/300",
    created_at: "2025-04-03T08:20:00Z",
    updated_at: "2025-04-03T15:10:00Z",
    deleted_at: null,
    user: fakeUser,
    category: fakeCategories[3],
  },
  {
    id: 5,
    title: "홈카페 도전기 - 라떼아트 배우기",
    content: "집에서 바리스타처럼 라떼아트를 만드는 방법을 배워보았습니다. 처음에는 어려웠지만 꾸준한 연습 끝에 하트 모양과 잎사귀 모양을 만들 수 있게 되었어요. 홈카페 도전을 위한 기본 장비와 팁을 공유합니다.",
    main_image: "https://picsum.photos/id/50/500/300",
    sub_image: "https://picsum.photos/id/51/500/300",
    created_at: "2025-04-01T11:30:00Z",
    updated_at: "2025-04-01T11:30:00Z",
    deleted_at: null,
    user: fakeUser,
    category: fakeCategories[0],
  },
];

// 블로그 목록 응답 데이터
export const fakeBlogListResponse: BlogListResponse = {
  count: 5,
  totalCnt: 5,
  pageCnt: 1,
  curPage: 1,
  nextPage: 0,
  previousPage: 0,
  data: fakeBlogItems,
};
