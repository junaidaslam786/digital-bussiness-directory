import { Review } from "@/types";

export const reviews: Review[] = [
  // Samsung Electronics - ent-1
  { id: "rev-1", enterpriseId: "ent-1", authorName: "김민수", rating: 5, comment: "세계적인 수준의 제조 시설과 혁신적인 기술. 협업하기 정말 좋은 파트너입니다.", createdAt: "2024-12-10T10:30:00Z" },
  { id: "rev-2", enterpriseId: "ent-1", authorName: "John Smith", rating: 5, comment: "Outstanding semiconductor quality and reliable delivery times. Excellent B2B partner.", createdAt: "2024-12-05T14:20:00Z" },
  { id: "rev-3", enterpriseId: "ent-1", authorName: "박지혜", rating: 4, comment: "품질은 훌륭하지만 가격대가 높은 편입니다. 그래도 만족스럽습니다.", createdAt: "2024-11-28T09:15:00Z" },
  { id: "rev-4", enterpriseId: "ent-1", authorName: "李明", rating: 5, comment: "Professional service and cutting-edge technology. Highly recommended!", createdAt: "2024-11-20T16:45:00Z" },
  { id: "rev-5", enterpriseId: "ent-1", authorName: "최영희", rating: 4, comment: "좋은 품질의 제품과 전문적인 서비스를 제공합니다.", createdAt: "2024-11-15T11:00:00Z" },
  { id: "rev-6", enterpriseId: "ent-1", authorName: "Sarah Johnson", rating: 5, comment: "The best in the industry. Their innovation is unmatched.", createdAt: "2024-11-08T13:30:00Z" },

  // CJ Logistics - ent-2
  { id: "rev-7", enterpriseId: "ent-2", authorName: "이준호", rating: 4, comment: "빠르고 정확한 배송 서비스. 물류 관리가 체계적입니다.", createdAt: "2024-12-18T08:20:00Z" },
  { id: "rev-8", enterpriseId: "ent-2", authorName: "Michael Chen", rating: 5, comment: "Excellent logistics solution for our e-commerce business. Very reliable.", createdAt: "2024-12-12T15:40:00Z" },
  { id: "rev-9", enterpriseId: "ent-2", authorName: "정수연", rating: 4, comment: "창고 관리 시스템이 우수하고 직원들이 친절합니다.", createdAt: "2024-12-01T10:10:00Z" },
  { id: "rev-10", enterpriseId: "ent-2", authorName: "김태우", rating: 5, comment: "콜드체인 물류 서비스가 특히 뛰어납니다. 강력 추천!", createdAt: "2024-11-25T14:25:00Z" },
  { id: "rev-11", enterpriseId: "ent-2", authorName: "Emma Williams", rating: 4, comment: "Good warehousing facilities and responsive customer service.", createdAt: "2024-11-18T09:50:00Z" },
  { id: "rev-12", enterpriseId: "ent-2", authorName: "박상민", rating: 5, comment: "국내외 배송 모두 만족스럽습니다. 추적 시스템도 편리해요.", createdAt: "2024-11-10T16:15:00Z" },

  // Naver Cloud - ent-3
  { id: "rev-13", enterpriseId: "ent-3", authorName: "윤서준", rating: 5, comment: "클라우드 인프라가 안정적이고 AI 서비스 품질이 뛰어납니다.", createdAt: "2024-12-20T11:30:00Z" },
  { id: "rev-14", enterpriseId: "ent-3", authorName: "David Kim", rating: 5, comment: "Best cloud platform in Korea. Great support team and documentation.", createdAt: "2024-12-15T14:00:00Z" },
  { id: "rev-15", enterpriseId: "ent-3", authorName: "강민지", rating: 4, comment: "서비스 품질은 좋은데 가격이 조금 비싼 것 같아요.", createdAt: "2024-12-08T09:20:00Z" },
  { id: "rev-16", enterpriseId: "ent-3", authorName: "Thomas Anderson", rating: 5, comment: "Excellent DevOps tools and scalable infrastructure. Very impressed!", createdAt: "2024-11-30T15:45:00Z" },
  { id: "rev-17", enterpriseId: "ent-3", authorName: "이현우", rating: 5, comment: "CLOVA AI 서비스가 정말 유용합니다. 고객 지원도 빠르고 정확해요.", createdAt: "2024-11-22T10:30:00Z" },
  { id: "rev-18", enterpriseId: "ent-3", authorName: "Jennifer Lee", rating: 4, comment: "Solid cloud services with good uptime. Recommended for enterprise use.", createdAt: "2024-11-14T13:15:00Z" },

  // Mingles Restaurant - ent-4
  { id: "rev-19", enterpriseId: "ent-4", authorName: "조은아", rating: 5, comment: "미슐랭 2스타답게 모든 요리가 예술 작품 같았어요. 특별한 날에 완벽합니다!", createdAt: "2024-12-19T20:30:00Z" },
  { id: "rev-20", enterpriseId: "ent-4", authorName: "Robert Taylor", rating: 5, comment: "Absolutely stunning! The fusion of traditional Korean flavors with modern techniques is brilliant.", createdAt: "2024-12-17T19:45:00Z" },
  { id: "rev-21", enterpriseId: "ent-4", authorName: "김소희", rating: 5, comment: "강민구 셰프님의 창의력이 돋보이는 코스였습니다. 재방문 의사 100%!", createdAt: "2024-12-10T21:00:00Z" },
  { id: "rev-22", enterpriseId: "ent-4", authorName: "Maria Garcia", rating: 4, comment: "Excellent food and presentation. A bit pricey but worth it for special occasions.", createdAt: "2024-12-03T20:15:00Z" },
  { id: "rev-23", enterpriseId: "ent-4", authorName: "박준영", rating: 5, comment: "서비스, 분위기, 음식 모두 완벽했습니다. 한국의 자랑입니다.", createdAt: "2024-11-26T19:30:00Z" },
  { id: "rev-24", enterpriseId: "ent-4", authorName: "Sophie Martin", rating: 5, comment: "One of the best dining experiences in Seoul. Every dish was memorable!", createdAt: "2024-11-19T20:45:00Z" },

  // SNUH - ent-5
  { id: "rev-25", enterpriseId: "ent-5", authorName: "최수진", rating: 5, comment: "의료진들이 매우 전문적이고 친절합니다. 시설도 최신입니다.", createdAt: "2024-12-21T10:00:00Z" },
  { id: "rev-26", enterpriseId: "ent-5", authorName: "김동현", rating: 4, comment: "치료 결과가 만족스러웠습니다. 대기 시간이 조금 길긴 했어요.", createdAt: "2024-12-14T14:30:00Z" },
  { id: "rev-27", enterpriseId: "ent-5", authorName: "이영숙", rating: 5, comment: "가족이 큰 수술을 받았는데 의료진 덕분에 잘 회복했습니다. 감사합니다.", createdAt: "2024-12-07T09:15:00Z" },
  { id: "rev-28", enterpriseId: "ent-5", authorName: "James Wilson", rating: 5, comment: "World-class medical care. The English-speaking staff was very helpful.", createdAt: "2024-11-29T11:45:00Z" },
  { id: "rev-29", enterpriseId: "ent-5", authorName: "박명희", rating: 4, comment: "종합검진 받았는데 체계적이고 꼼꼼했습니다.", createdAt: "2024-11-21T08:30:00Z" },
  { id: "rev-30", enterpriseId: "ent-5", authorName: "Linda Brown", rating: 5, comment: "Excellent emergency care and follow-up treatment. Highly recommended!", createdAt: "2024-11-13T15:20:00Z" },

  // Yonsei University - ent-6
  { id: "rev-31", enterpriseId: "ent-6", authorName: "정민서", rating: 5, comment: "최고의 교육 환경과 뛰어난 교수진. 연세에서 공부할 수 있어 영광입니다.", createdAt: "2024-12-17T14:00:00Z" },
  { id: "rev-32", enterpriseId: "ent-6", authorName: "Alex Johnson", rating: 5, comment: "Great international student support and beautiful campus. Excellent programs!", createdAt: "2024-12-09T10:30:00Z" },
  { id: "rev-33", enterpriseId: "ent-6", authorName: "김하늘", rating: 4, comment: "학습 시설이 우수하고 동아리 활동도 다양합니다.", createdAt: "2024-12-01T16:45:00Z" },
  { id: "rev-34", enterpriseId: "ent-6", authorName: "王芳", rating: 5, comment: "The Korean language institute is excellent. Highly recommend for international students!", createdAt: "2024-11-23T09:20:00Z" },
  { id: "rev-35", enterpriseId: "ent-6", authorName: "이재훈", rating: 5, comment: "연구 환경이 훌륭하고 글로벌 네트워크가 강합니다.", createdAt: "2024-11-15T13:50:00Z" },
  { id: "rev-36", enterpriseId: "ent-6", authorName: "Emily Davis", rating: 4, comment: "Great academic reputation and career opportunities. Worth considering!", createdAt: "2024-11-07T11:15:00Z" },

  // Juno Hair Salon - ent-7
  { id: "rev-37", enterpriseId: "ent-7", authorName: "송지은", rating: 5, comment: "항상 만족스러운 결과! 원장님 실력이 정말 대단하세요.", createdAt: "2024-12-20T18:30:00Z" },
  { id: "rev-38", enterpriseId: "ent-7", authorName: "박수연", rating: 5, comment: "펌 시술 받았는데 머리 손상 없이 너무 예쁘게 나왔어요!", createdAt: "2024-12-13T15:20:00Z" },
  { id: "rev-39", enterpriseId: "ent-7", authorName: "김나영", rating: 4, comment: "분위기도 좋고 서비스도 친절합니다. 가격은 조금 있는 편이에요.", createdAt: "2024-12-06T17:45:00Z" },
  { id: "rev-40", enterpriseId: "ent-7", authorName: "이미라", rating: 5, comment: "컬러 시술 전문가세요. 상담도 꼼꼼하게 해주십니다.", createdAt: "2024-11-28T14:10:00Z" },
  { id: "rev-41", enterpriseId: "ent-7", authorName: "정현주", rating: 5, comment: "강남에서 제일 좋은 헤어샵! 예약 필수입니다.", createdAt: "2024-11-20T16:30:00Z" },
  { id: "rev-42", enterpriseId: "ent-7", authorName: "Hannah Kim", rating: 4, comment: "Great salon with skilled stylists. English communication available!", createdAt: "2024-11-12T13:55:00Z" },

  // Hyundai Construction - ent-8
  { id: "rev-43", enterpriseId: "ent-8", authorName: "오성민", rating: 4, comment: "대형 프로젝트 진행 능력이 뛰어나고 품질 관리가 철저합니다.", createdAt: "2024-12-16T10:20:00Z" },
  { id: "rev-44", enterpriseId: "ent-8", authorName: "이상훈", rating: 5, comment: "아파트 시공 퀄리티가 정말 좋습니다. 브랜드 신뢰도가 높아요.", createdAt: "2024-12-08T14:45:00Z" },
  { id: "rev-45", enterpriseId: "ent-8", authorName: "박진우", rating: 4, comment: "A/S 대응이 빠르고 전문적입니다.", createdAt: "2024-11-30T09:30:00Z" },
  { id: "rev-46", enterpriseId: "ent-8", authorName: "Chris Park", rating: 5, comment: "Professional construction management and on-time delivery. Excellent work!", createdAt: "2024-11-22T11:15:00Z" },
  { id: "rev-47", enterpriseId: "ent-8", authorName: "강현석", rating: 4, comment: "설계부터 시공까지 체계적으로 관리됩니다.", createdAt: "2024-11-14T15:40:00Z" },
  { id: "rev-48", enterpriseId: "ent-8", authorName: "김민석", rating: 5, comment: "현대건설 브랜드 믿고 분양받았는데 매우 만족합니다.", createdAt: "2024-11-06T10:55:00Z" },

  // Kia Motors - ent-9
  { id: "rev-49", enterpriseId: "ent-9", authorName: "윤태희", rating: 4, comment: "상담사분이 친절하고 차량 설명도 자세히 해주셨어요.", createdAt: "2024-12-19T16:20:00Z" },
  { id: "rev-50", enterpriseId: "ent-9", authorName: "최정훈", rating: 5, comment: "EV6 시승 후 바로 계약했습니다. 정말 만족스러운 차예요!", createdAt: "2024-12-11T13:45:00Z" },
  { id: "rev-51", enterpriseId: "ent-9", authorName: "서민재", rating: 4, comment: "서비스센터 직원들이 전문적이고 정비 품질도 좋습니다.", createdAt: "2024-12-03T10:30:00Z" },
  { id: "rev-52", enterpriseId: "ent-9", authorName: "Daniel Lee", rating: 5, comment: "Great selection of vehicles and helpful staff. Test drive was awesome!", createdAt: "2024-11-25T15:10:00Z" },
  { id: "rev-53", enterpriseId: "ent-9", authorName: "임수정", rating: 4, comment: "쇼룸이 깨끗하고 시설이 잘 되어있어요.", createdAt: "2024-11-17T14:25:00Z" },
  { id: "rev-54", enterpriseId: "ent-9", authorName: "박성호", rating: 5, comment: "K5 구매했는데 가격 대비 성능이 훌륭합니다!", createdAt: "2024-11-09T11:40:00Z" },

  // Shinsegae Department Store - ent-10
  { id: "rev-55", enterpriseId: "ent-10", authorName: "한지민", rating: 5, comment: "명품관 상품 구성이 다양하고 직원분들 서비스가 최고예요.", createdAt: "2024-12-21T17:30:00Z" },
  { id: "rev-56", enterpriseId: "ent-10", authorName: "김서윤", rating: 5, comment: "퍼스널 쇼퍼 서비스 이용했는데 정말 만족스러웠습니다!", createdAt: "2024-12-14T15:45:00Z" },
  { id: "rev-57", enterpriseId: "ent-10", authorName: "이지혜", rating: 4, comment: "식품관 퀄리티가 좋고 선물 포장 서비스도 훌륭합니다.", createdAt: "2024-12-07T12:20:00Z" },
  { id: "rev-58", enterpriseId: "ent-10", authorName: "Michelle Wang", rating: 5, comment: "Luxury shopping at its finest. Tax refund service is very convenient!", createdAt: "2024-11-29T16:10:00Z" },
  { id: "rev-59", enterpriseId: "ent-10", authorName: "정수빈", rating: 5, comment: "VIP 라운지 편의시설이 최고입니다. 쇼핑이 더 즐거워요.", createdAt: "2024-11-21T14:35:00Z" },
  { id: "rev-60", enterpriseId: "ent-10", authorName: "Anna Schmidt", rating: 4, comment: "Great department store with excellent brands. A bit expensive but worth it!", createdAt: "2024-11-13T11:50:00Z" },

  // Hana Tour - ent-11
  { id: "rev-61", enterpriseId: "ent-11", authorName: "강민수", rating: 5, comment: "유럽 패키지 여행 정말 만족스러웠어요. 가이드님도 친절하셨습니다.", createdAt: "2024-12-18T13:20:00Z" },
  { id: "rev-62", enterpriseId: "ent-11", authorName: "이수연", rating: 4, comment: "비자 대행 서비스가 편리하고 신속했습니다.", createdAt: "2024-12-10T10:45:00Z" },
  { id: "rev-63", enterpriseId: "ent-11", authorName: "박지원", rating: 5, comment: "허니문 패키지 이용했는데 일정부터 호텔까지 모두 완벽했어요!", createdAt: "2024-12-02T15:30:00Z" },
  { id: "rev-64", enterpriseId: "ent-11", authorName: "윤서영", rating: 4, comment: "맞춤형 여행 상담이 꼼꼼하고 좋았습니다.", createdAt: "2024-11-24T09:15:00Z" },
  { id: "rev-65", enterpriseId: "ent-11", authorName: "김태영", rating: 5, comment: "가족 여행 패키지 추천받아서 다녀왔는데 최고였습니다!", createdAt: "2024-11-16T14:50:00Z" },
  { id: "rev-66", enterpriseId: "ent-11", authorName: "정현아", rating: 4, comment: "가격대도 합리적이고 일정 구성이 알차요.", createdAt: "2024-11-08T11:25:00Z" },

  // KB Bank - ent-12
  { id: "rev-67", enterpriseId: "ent-12", authorName: "조윤서", rating: 4, comment: "직원들이 친절하고 업무 처리가 빠릅니다.", createdAt: "2024-12-20T10:40:00Z" },
  { id: "rev-68", enterpriseId: "ent-12", authorName: "이준혁", rating: 5, comment: "대출 상담이 전문적이었고 금리도 합리적이에요.", createdAt: "2024-12-12T14:15:00Z" },
  { id: "rev-69", enterpriseId: "ent-12", authorName: "김하연", rating: 4, comment: "모바일뱅킹 앱이 편리하고 기능이 다양합니다.", createdAt: "2024-12-04T09:50:00Z" },
  { id: "rev-70", enterpriseId: "ent-12", authorName: "박민재", rating: 4, comment: "외환 업무 처리가 신속하고 정확합니다.", createdAt: "2024-11-26T15:35:00Z" },
  { id: "rev-71", enterpriseId: "ent-12", authorName: "최지우", rating: 5, comment: "기업 금융 담당자가 매우 전문적이고 도움이 많이 되었습니다.", createdAt: "2024-11-18T11:10:00Z" },
  { id: "rev-72", enterpriseId: "ent-12", authorName: "Jason Park", rating: 4, comment: "Good banking services with English support. Convenient location.", createdAt: "2024-11-10T13:45:00Z" },

  // POSCO - ent-13
  { id: "rev-73", enterpriseId: "ent-13", authorName: "신동욱", rating: 5, comment: "철강 품질이 최고 수준이고 납기도 정확합니다.", createdAt: "2024-12-15T09:30:00Z" },
  { id: "rev-74", enterpriseId: "ent-13", authorName: "이상철", rating: 5, comment: "자동차용 강판 품질이 우수하고 기술 지원도 훌륭합니다.", createdAt: "2024-12-07T14:20:00Z" },
  { id: "rev-75", enterpriseId: "ent-13", authorName: "박종현", rating: 4, comment: "대량 주문 시 가격 협상이 가능하고 담당자가 친절합니다.", createdAt: "2024-11-29T10:45:00Z" },
  { id: "rev-76", enterpriseId: "ent-13", authorName: "Robert Kim", rating: 5, comment: "World-class steel quality and reliable supply chain. Excellent partner!", createdAt: "2024-11-21T15:15:00Z" },
  { id: "rev-77", enterpriseId: "ent-13", authorName: "김현수", rating: 5, comment: "환경 친화적 생산 방식이 인상적입니다.", createdAt: "2024-11-13T09:50:00Z" },
  { id: "rev-78", enterpriseId: "ent-13", authorName: "장민호", rating: 4, comment: "제품 다양성과 커스터마이징 서비스가 좋습니다.", createdAt: "2024-11-05T14:30:00Z" },

  // Gopchang Story - ent-14
  { id: "rev-79", enterpriseId: "ent-14", authorName: "최유진", rating: 5, comment: "곱창 맛집! 신선하고 냄새도 안 나요. 강추합니다!", createdAt: "2024-12-21T21:30:00Z" },
  { id: "rev-80", enterpriseId: "ent-14", authorName: "강민지", rating: 5, comment: "대창 진짜 맛있어요. 직원분들도 구워주셔서 편해요.", createdAt: "2024-12-13T20:15:00Z" },
  { id: "rev-81", enterpriseId: "ent-14", authorName: "이준석", rating: 4, comment: "가격은 조금 있지만 품질이 좋아서 만족합니다.", createdAt: "2024-12-05T19:45:00Z" },
  { id: "rev-82", enterpriseId: "ent-14", authorName: "박서현", rating: 5, comment: "곱창 처음 먹어봤는데 여기서 먹길 잘했어요. 맛있습니다!", createdAt: "2024-11-27T21:00:00Z" },
  { id: "rev-83", enterpriseId: "ent-14", authorName: "정우성", rating: 5, comment: "회식하기 좋은 곳! 프라이빗룸도 있어서 편합니다.", createdAt: "2024-11-19T20:30:00Z" },
  { id: "rev-84", enterpriseId: "ent-14", authorName: "Mark Johnson", rating: 4, comment: "Unique Korean BBQ experience! Staff is very helpful with cooking.", createdAt: "2024-11-11T19:20:00Z" },

  // Gangnam Severance - ent-15
  { id: "rev-85", enterpriseId: "ent-15", authorName: "송미영", rating: 5, comment: "암 치료 받았는데 의료진들이 정말 최선을 다해주셨어요. 감사합니다.", createdAt: "2024-12-20T10:15:00Z" },
  { id: "rev-86", enterpriseId: "ent-15", authorName: "김태수", rating: 5, comment: "심장 수술 성공적으로 마쳤습니다. 최고의 의료진!", createdAt: "2024-12-12T14:40:00Z" },
  { id: "rev-87", enterpriseId: "ent-15", authorName: "이영미", rating: 4, comment: "종합검진 매우 체계적이고 상세한 설명 감사했습니다.", createdAt: "2024-12-04T09:25:00Z" },
  { id: "rev-88", enterpriseId: "ent-15", authorName: "박준호", rating: 5, comment: "시설이 최신이고 진료 대기 시스템이 효율적입니다.", createdAt: "2024-11-26T11:50:00Z" },
  { id: "rev-89", enterpriseId: "ent-15", authorName: "Sarah Kim", rating: 5, comment: "Excellent medical care and English interpretation services. Highly recommend!", createdAt: "2024-11-18T15:30:00Z" },
  { id: "rev-90", enterpriseId: "ent-15", authorName: "정혜진", rating: 4, comment: "간호사분들이 친절하고 세심하게 케어해주십니다.", createdAt: "2024-11-10T10:20:00Z" },

  // KAIST - ent-16
  { id: "rev-91", enterpriseId: "ent-16", authorName: "김도현", rating: 5, comment: "세계 최고 수준의 연구 환경과 시설을 갖추고 있습니다.", createdAt: "2024-12-19T13:50:00Z" },
  { id: "rev-92", enterpriseId: "ent-16", authorName: "이서연", rating: 5, comment: "교수님들의 열정과 학문적 수준이 매우 높습니다.", createdAt: "2024-12-11T10:30:00Z" },
  { id: "rev-93", enterpriseId: "ent-16", authorName: "박민규", rating: 4, comment: "연구 지원이 풍부하고 국제 협력 기회가 많습니다.", createdAt: "2024-12-03T15:15:00Z" },
  { id: "rev-94", enterpriseId: "ent-16", authorName: "Wei Zhang", rating: 5, comment: "Excellent research facilities and supportive faculty. Best choice for STEM!", createdAt: "2024-11-25T09:40:00Z" },
  { id: "rev-95", enterpriseId: "ent-16", authorName: "최하은", rating: 5, comment: "캠퍼스 생활이 자유롭고 창의적인 분위기입니다.", createdAt: "2024-11-17T14:25:00Z" },
  { id: "rev-96", enterpriseId: "ent-16", authorName: "Tom Wilson", rating: 4, comment: "Great university for engineering and science. Strong industry connections.", createdAt: "2024-11-09T11:55:00Z" },

  // Amore Pacific - ent-17
  { id: "rev-97", enterpriseId: "ent-17", authorName: "한예슬", rating: 5, comment: "설화수 제품 너무 좋아요. 피부 분석도 정확하고 상담도 꼼꼼해요!", createdAt: "2024-12-21T16:20:00Z" },
  { id: "rev-98", enterpriseId: "ent-17", authorName: "김수진", rating: 5, comment: "라네즈 워터 슬리핑 마스크 강추! 직원분도 친절하세요.", createdAt: "2024-12-13T14:45:00Z" },
  { id: "rev-99", enterpriseId: "ent-17", authorName: "이지은", rating: 4, comment: "제품 품질은 최고인데 가격대가 높은 편입니다.", createdAt: "2024-12-05T17:30:00Z" },
  { id: "rev-100", enterpriseId: "ent-17", authorName: "박소영", rating: 5, comment: "K-뷰티의 자부심! 이니스프리부터 설화수까지 다 있어요.", createdAt: "2024-11-27T15:10:00Z" },
  { id: "rev-101", enterpriseId: "ent-17", authorName: "Jessica Lee", rating: 5, comment: "Amazing Korean skincare products! Staff helped me find the perfect routine.", createdAt: "2024-11-19T13:55:00Z" },
  { id: "rev-102", enterpriseId: "ent-17", authorName: "정민아", rating: 4, comment: "페이셜 트리트먼트 받았는데 피부가 정말 좋아졌어요!", createdAt: "2024-11-11T16:40:00Z" },

  // GS Construction - ent-18
  { id: "rev-103", enterpriseId: "ent-18", authorName: "오정훈", rating: 4, comment: "아파트 마감이 깔끔하고 시공 품질이 좋습니다.", createdAt: "2024-12-17T11:20:00Z" },
  { id: "rev-104", enterpriseId: "ent-18", authorName: "이성민", rating: 5, comment: "친환경 건축에 신경쓰는 모습이 인상적입니다.", createdAt: "2024-12-09T15:35:00Z" },
  { id: "rev-105", enterpriseId: "ent-18", authorName: "김영호", rating: 4, comment: "프로젝트 관리가 체계적이고 일정 준수율이 높습니다.", createdAt: "2024-12-01T10:15:00Z" },
  { id: "rev-106", enterpriseId: "ent-18", authorName: "박상우", rating: 5, comment: "상업 건물 시공 의뢰했는데 매우 만족스럽습니다.", createdAt: "2024-11-23T14:50:00Z" },
  { id: "rev-107", enterpriseId: "ent-18", authorName: "Brian Kim", rating: 4, comment: "Professional construction management and good quality control.", createdAt: "2024-11-15T09:40:00Z" },
  { id: "rev-108", enterpriseId: "ent-18", authorName: "최재혁", rating: 5, comment: "LEED 인증 받은 건물 시공 경험이 풍부합니다.", createdAt: "2024-11-07T13:25:00Z" },

  // Hyundai Motorstudio - ent-19
  { id: "rev-109", enterpriseId: "ent-19", authorName: "강지훈", rating: 5, comment: "쇼룸이 미술관 같아요. IONIQ 5 시승 최고였습니다!", createdAt: "2024-12-20T17:30:00Z" },
  { id: "rev-110", enterpriseId: "ent-19", authorName: "이주연", rating: 5, comment: "상담사분이 전문적이고 차량 설명이 자세했어요.", createdAt: "2024-12-12T15:20:00Z" },
  { id: "rev-111", enterpriseId: "ent-19", authorName: "박현우", rating: 4, comment: "전시 공간이 멋지고 카페도 있어서 좋습니다.", createdAt: "2024-12-04T13:45:00Z" },
  { id: "rev-112", enterpriseId: "ent-19", authorName: "김민준", rating: 5, comment: "팰리세이드 구매했는데 정말 만족스럽습니다!", createdAt: "2024-11-26T16:10:00Z" },
  { id: "rev-113", enterpriseId: "ent-19", authorName: "Rachel Park", rating: 5, comment: "Best automotive showroom I've visited. Great EV selection!", createdAt: "2024-11-18T14:35:00Z" },
  { id: "rev-114", enterpriseId: "ent-19", authorName: "정우진", rating: 4, comment: "주차도 편하고 위치도 좋아요. 강남에 있어서 접근성 최고!", createdAt: "2024-11-10T11:50:00Z" },

  // Starfield COEX - ent-20
  { id: "rev-115", enterpriseId: "ent-20", authorName: "송하늘", rating: 5, comment: "별마당 도서관 너무 멋져요! 쇼핑도 하고 구경도 하고 최고입니다.", createdAt: "2024-12-21T19:20:00Z" },
  { id: "rev-116", enterpriseId: "ent-20", authorName: "윤채원", rating: 5, comment: "코엑스 아쿠아리움 아이들과 가기 정말 좋아요!", createdAt: "2024-12-14T16:45:00Z" },
  { id: "rev-117", enterpriseId: "ent-20", authorName: "이서준", rating: 4, comment: "매장이 정말 많고 먹을 곳도 다양해서 하루 종일 있어도 안 질려요.", createdAt: "2024-12-06T18:30:00Z" },
  { id: "rev-118", enterpriseId: "ent-20", authorName: "박지아", rating: 5, comment: "메가박스도 있고 쇼핑도 하고 데이트 코스로 완벽!", createdAt: "2024-11-28T17:15:00Z" },
  { id: "rev-119", enterpriseId: "ent-20", authorName: "Kevin Lee", rating: 5, comment: "Huge underground mall! Starfield Library is a must-see. Amazing place!", createdAt: "2024-11-20T15:40:00Z" },
  { id: "rev-120", enterpriseId: "ent-20", authorName: "정수아", rating: 4, comment: "주말에는 사람이 많지만 시설이 좋고 볼거리가 많아요.", createdAt: "2024-11-12T14:25:00Z" },

  // Hyundai Steel - ent-21
  { id: "rev-121", enterpriseId: "ent-21", authorName: "김철수", rating: 4, comment: "고품질 철강 제품을 제공합니다. 납기도 정확해요.", createdAt: "2024-12-20T10:15:00Z" },
  { id: "rev-122", enterpriseId: "ent-21", authorName: "Mike Johnson", rating: 5, comment: "Excellent steel quality for our construction projects. Reliable supplier.", createdAt: "2024-12-12T14:30:00Z" },
  { id: "rev-123", enterpriseId: "ent-21", authorName: "이상호", rating: 4, comment: "전기로 기술이 우수하고 환경 관리도 잘 되어있습니다.", createdAt: "2024-12-05T09:45:00Z" },
  { id: "rev-124", enterpriseId: "ent-21", authorName: "박진우", rating: 5, comment: "자동차용 특수강 품질이 뛰어납니다. B2B 파트너로 추천!", createdAt: "2024-11-28T11:20:00Z" },
  { id: "rev-125", enterpriseId: "ent-21", authorName: "정미경", rating: 4, comment: "ISO 인증도 받고 품질 관리가 체계적입니다.", createdAt: "2024-11-20T15:00:00Z" },
  { id: "rev-126", enterpriseId: "ent-21", authorName: "Tom Wilson", rating: 4, comment: "Good steel manufacturer with consistent quality. Professional service.", createdAt: "2024-11-13T13:40:00Z" },

  // Kakao Tech - ent-22
  { id: "rev-127", enterpriseId: "ent-22", authorName: "최유진", rating: 5, comment: "카카오톡 API 연동이 쉽고 문서화가 잘 되어있어요!", createdAt: "2024-12-21T16:30:00Z" },
  { id: "rev-128", enterpriseId: "ent-22", authorName: "안준호", rating: 5, comment: "모바일 플랫폼 개발 서비스 정말 만족스럽습니다. 기술력이 뛰어나요.", createdAt: "2024-12-15T11:45:00Z" },
  { id: "rev-129", enterpriseId: "ent-22", authorName: "Sarah Kim", rating: 4, comment: "Great platform services! Kakao Pay integration worked perfectly for our app.", createdAt: "2024-12-08T14:20:00Z" },
  { id: "rev-130", enterpriseId: "ent-22", authorName: "이현수", rating: 5, comment: "카카오 모빌리티 솔루션 도입했는데 효율적이고 좋아요!", createdAt: "2024-12-01T10:00:00Z" },
  { id: "rev-131", enterpriseId: "ent-22", authorName: "박서현", rating: 4, comment: "고객 지원팀이 친절하고 신속하게 대응해줍니다.", createdAt: "2024-11-24T13:15:00Z" },
  { id: "rev-132", enterpriseId: "ent-22", authorName: "David Park", rating: 5, comment: "Innovative solutions and excellent developer support. Highly recommended!", createdAt: "2024-11-17T09:30:00Z" },

  // Seoul Medical Center - ent-23
  { id: "rev-133", enterpriseId: "ent-23", authorName: "김영희", rating: 5, comment: "응급실 대응이 빠르고 의료진이 매우 전문적입니다.", createdAt: "2024-12-22T08:30:00Z" },
  { id: "rev-134", enterpriseId: "ent-23", authorName: "이동욱", rating: 5, comment: "JCI 인증 병원답게 시설과 서비스 모두 훌륭합니다.", createdAt: "2024-12-16T15:20:00Z" },
  { id: "rev-135", enterpriseId: "ent-23", authorName: "박수진", rating: 4, comment: "종합 건강검진 받았는데 체계적이고 상세한 설명 감사합니다.", createdAt: "2024-12-10T10:45:00Z" },
  { id: "rev-136", enterpriseId: "ent-23", authorName: "James Lee", rating: 5, comment: "Excellent medical care with English support. Saved my life during emergency!", createdAt: "2024-12-03T14:00:00Z" },
  { id: "rev-137", enterpriseId: "ent-23", authorName: "최민호", rating: 5, comment: "전문의 상담부터 치료까지 모두 만족스러웠습니다.", createdAt: "2024-11-26T09:15:00Z" },
  { id: "rev-138", enterpriseId: "ent-23", authorName: "정은영", rating: 4, comment: "24시간 운영하고 응급실도 잘 갖춰져 있어 안심됩니다.", createdAt: "2024-11-19T16:50:00Z" },

  // Seoul International School - ent-24
  { id: "rev-139", enterpriseId: "ent-24", authorName: "김민지", rating: 5, comment: "IB 프로그램이 우수하고 선생님들이 정말 전문적이세요!", createdAt: "2024-12-18T11:00:00Z" },
  { id: "rev-140", enterpriseId: "ent-24", authorName: "Michael Brown", rating: 5, comment: "Best international school in Seoul! Our children are thriving here.", createdAt: "2024-12-11T14:30:00Z" },
  { id: "rev-141", enterpriseId: "ent-24", authorName: "이서영", rating: 5, comment: "교육 시설이 최고 수준이고 다양한 과외활동이 좋아요.", createdAt: "2024-12-04T10:15:00Z" },
  { id: "rev-142", enterpriseId: "ent-24", authorName: "박준혁", rating: 4, comment: "글로벌 교육 환경이 훌륭하지만 학비가 비싼 편입니다.", createdAt: "2024-11-27T13:45:00Z" },
  { id: "rev-143", enterpriseId: "ent-24", authorName: "Emma Wilson", rating: 5, comment: "Excellent curriculum and wonderful community. Worth every penny!", createdAt: "2024-11-20T09:30:00Z" },
  { id: "rev-144", enterpriseId: "ent-24", authorName: "최유나", rating: 5, comment: "WASC 인증받은 학교답게 교육의 질이 정말 높습니다.", createdAt: "2024-11-13T15:20:00Z" },

  // Busan Port - ent-25
  { id: "rev-145", enterpriseId: "ent-25", authorName: "송재훈", rating: 4, comment: "항만 시설이 잘 되어있고 물류 처리가 빠릅니다.", createdAt: "2024-12-19T10:00:00Z" },
  { id: "rev-146", enterpriseId: "ent-25", authorName: "Richard Thompson", rating: 5, comment: "Excellent port logistics! Our shipping operations have been very smooth.", createdAt: "2024-12-13T14:45:00Z" },
  { id: "rev-147", enterpriseId: "ent-25", authorName: "김현우", rating: 5, comment: "AEO 인증받은 항만답게 통관이 신속하고 정확합니다.", createdAt: "2024-12-06T09:30:00Z" },
  { id: "rev-148", enterpriseId: "ent-25", authorName: "이수정", rating: 4, comment: "창고 시설이 우수하고 24시간 운영이 편리해요.", createdAt: "2024-11-29T11:15:00Z" },
  { id: "rev-149", enterpriseId: "ent-25", authorName: "박민수", rating: 5, comment: "컨테이너 처리 능력이 뛰어나고 서비스가 전문적입니다.", createdAt: "2024-11-22T13:50:00Z" },
  { id: "rev-150", enterpriseId: "ent-25", authorName: "Chen Wei", rating: 4, comment: "Good port facilities with efficient customs clearance. Recommended!", createdAt: "2024-11-15T10:20:00Z" },

  // Gangnam Finance - ent-26
  { id: "rev-151", enterpriseId: "ent-26", authorName: "윤성호", rating: 5, comment: "자산 관리 컨설팅이 매우 전문적이고 수익률도 만족스럽습니다.", createdAt: "2024-12-20T15:30:00Z" },
  { id: "rev-152", enterpriseId: "ent-26", authorName: "김지은", rating: 4, comment: "재무 설계 서비스가 꼼꼼하고 상담사가 친절해요.", createdAt: "2024-12-14T11:45:00Z" },
  { id: "rev-153", enterpriseId: "ent-26", authorName: "Robert Kim", rating: 5, comment: "Excellent wealth management services! CFA professionals know their stuff.", createdAt: "2024-12-07T14:20:00Z" },
  { id: "rev-154", enterpriseId: "ent-26", authorName: "이준석", rating: 5, comment: "투자 자문 받고 포트폴리오 성과가 많이 개선됐습니다!", createdAt: "2024-11-30T10:00:00Z" },
  { id: "rev-155", enterpriseId: "ent-26", authorName: "박혜진", rating: 4, comment: "은퇴 설계 상담이 체계적이고 전문적입니다.", createdAt: "2024-11-23T13:15:00Z" },
  { id: "rev-156", enterpriseId: "ent-26", authorName: "Jennifer Park", rating: 5, comment: "Top-notch financial advisory. They really understand international investments!", createdAt: "2024-11-16T09:40:00Z" },

  // Jeju Resort - ent-27
  { id: "rev-157", enterpriseId: "ent-27", authorName: "안지혜", rating: 5, comment: "오션뷰 객실 정말 환상적이에요! 신혼여행으로 완벽했습니다.", createdAt: "2024-12-21T18:30:00Z" },
  { id: "rev-158", enterpriseId: "ent-27", authorName: "최동훈", rating: 5, comment: "리조트 시설이 럭셔리하고 스파 서비스도 최고였어요!", createdAt: "2024-12-15T20:15:00Z" },
  { id: "rev-159", enterpriseId: "ent-27", authorName: "Mary Johnson", rating: 4, comment: "Beautiful beachfront resort! Staff was very helpful and accommodating.", createdAt: "2024-12-08T17:45:00Z" },
  { id: "rev-160", enterpriseId: "ent-27", authorName: "이상아", rating: 5, comment: "결혼식 올렸는데 장소도 멋지고 서비스가 완벽했습니다!", createdAt: "2024-12-01T16:20:00Z" },
  { id: "rev-161", enterpriseId: "ent-27", authorName: "박선영", rating: 5, comment: "가족 휴가로 다녀왔는데 아이들도 너무 좋아했어요. 재방문 예정!", createdAt: "2024-11-24T19:00:00Z" },
  { id: "rev-162", enterpriseId: "ent-27", authorName: "David Miller", rating: 5, comment: "5-star experience! The sunset views from our room were breathtaking.", createdAt: "2024-11-17T18:35:00Z" },

  // Hanok Restaurant - ent-28
  { id: "rev-163", enterpriseId: "ent-28", authorName: "정민아", rating: 5, comment: "한옥에서 먹는 궁중 요리 경험이 정말 특별했어요!", createdAt: "2024-12-22T13:30:00Z" },
  { id: "rev-164", enterpriseId: "ent-28", authorName: "이재현", rating: 5, comment: "전통 방식으로 조리한 음식이 정말 맛있고 분위기도 훌륭합니다.", createdAt: "2024-12-16T12:45:00Z" },
  { id: "rev-165", enterpriseId: "ent-28", authorName: "Laura Smith", rating: 5, comment: "Amazing authentic Korean cuisine! The hanok setting makes it even more special.", createdAt: "2024-12-09T14:20:00Z" },
  { id: "rev-166", enterpriseId: "ent-28", authorName: "김준호", rating: 4, comment: "음식 맛도 좋고 한국 전통 문화도 체험할 수 있어 좋았어요.", createdAt: "2024-12-02T13:00:00Z" },
  { id: "rev-167", enterpriseId: "ent-28", authorName: "박수영", rating: 5, comment: "미슐랭 가이드 추천 맛집답게 모든 게 완벽했습니다!", createdAt: "2024-11-25T19:15:00Z" },
  { id: "rev-168", enterpriseId: "ent-28", authorName: "Thomas Anderson", rating: 5, comment: "Best Korean traditional dining experience in Seoul. Worth every won!", createdAt: "2024-11-18T20:30:00Z" },

  // Seoul Fashion Boutique - ent-29
  { id: "rev-169", enterpriseId: "ent-29", authorName: "최예은", rating: 5, comment: "한국 디자이너 브랜드가 다양하고 스타일링 조언도 받을 수 있어요!", createdAt: "2024-12-19T15:20:00Z" },
  { id: "rev-170", enterpriseId: "ent-29", authorName: "이하늘", rating: 4, comment: "트렌디한 옷들이 많고 직원분들이 친절하세요.", createdAt: "2024-12-12T16:45:00Z" },
  { id: "rev-171", enterpriseId: "ent-29", authorName: "Sophia Lee", rating: 5, comment: "Love the K-fashion collections! Unique pieces you can't find anywhere else.", createdAt: "2024-12-05T14:30:00Z" },
  { id: "rev-172", enterpriseId: "ent-29", authorName: "박지민", rating: 5, comment: "개인 스타일링 서비스 받았는데 정말 만족스러워요!", createdAt: "2024-11-28T13:15:00Z" },
  { id: "rev-173", enterpriseId: "ent-29", authorName: "김소현", rating: 4, comment: "압구정 패션의 메카! 좀 비싸긴 하지만 퀄리티가 좋아요.", createdAt: "2024-11-21T17:00:00Z" },
  { id: "rev-174", enterpriseId: "ent-29", authorName: "Emma Johnson", rating: 5, comment: "Fantastic boutique with excellent customer service. My go-to fashion store!", createdAt: "2024-11-14T15:40:00Z" },

  // Green Energy Solutions - ent-30
  { id: "rev-175", enterpriseId: "ent-30", authorName: "강민수", rating: 5, comment: "태양광 시스템 설계가 전문적이고 효율적입니다!", createdAt: "2024-12-18T10:30:00Z" },
  { id: "rev-176", enterpriseId: "ent-30", authorName: "이승호", rating: 4, comment: "에너지 진단 받고 비용 많이 절감했어요. 추천합니다.", createdAt: "2024-12-11T14:15:00Z" },
  { id: "rev-177", enterpriseId: "ent-30", authorName: "Daniel Kim", rating: 5, comment: "Excellent renewable energy consulting! LEED certification process was smooth.", createdAt: "2024-12-04T11:45:00Z" },
  { id: "rev-178", enterpriseId: "ent-30", authorName: "박영진", rating: 5, comment: "친환경 솔루션이 실용적이고 경제적입니다.", createdAt: "2024-11-27T09:20:00Z" },
  { id: "rev-179", enterpriseId: "ent-30", authorName: "정수미", rating: 4, comment: "환경 영향 평가가 체계적이고 상세해요.", createdAt: "2024-11-20T13:50:00Z" },
  { id: "rev-180", enterpriseId: "ent-30", authorName: "Robert Wilson", rating: 5, comment: "Professional sustainability consulting. Helped us achieve our green goals!", createdAt: "2024-11-13T10:15:00Z" },

  // Daejeon Property - ent-31
  { id: "rev-181", enterpriseId: "ent-31", authorName: "윤서현", rating: 4, comment: "부동산 관리 서비스가 체계적이고 신속해요.", createdAt: "2024-12-17T11:30:00Z" },
  { id: "rev-182", enterpriseId: "ent-31", authorName: "김태현", rating: 5, comment: "매물 정보가 정확하고 중개 서비스가 만족스럽습니다.", createdAt: "2024-12-10T15:20:00Z" },
  { id: "rev-183", enterpriseId: "ent-31", authorName: "이민지", rating: 4, comment: "임대 관리 맡겼는데 꼼꼼하게 잘 관리해주세요.", createdAt: "2024-12-03T10:45:00Z" },
  { id: "rev-184", enterpriseId: "ent-31", authorName: "박상우", rating: 5, comment: "대전에서 제일 믿을 만한 부동산! 추천합니다.", createdAt: "2024-11-26T14:00:00Z" },
  { id: "rev-185", enterpriseId: "ent-31", authorName: "최유진", rating: 4, comment: "투자 컨설팅도 해주고 서비스가 다양해요.", createdAt: "2024-11-19T09:30:00Z" },
  { id: "rev-186", enterpriseId: "ent-31", authorName: "Brian Park", rating: 5, comment: "Professional property management with great communication. Highly satisfied!", createdAt: "2024-11-12T13:15:00Z" },

  // Korea Cultural Events - ent-32
  { id: "rev-187", enterpriseId: "ent-32", authorName: "안재희", rating: 5, comment: "회사 행사 기획했는데 완벽하게 진행해주셨어요!", createdAt: "2024-12-21T16:00:00Z" },
  { id: "rev-188", enterpriseId: "ent-32", authorName: "이동현", rating: 5, comment: "문화 축제 이벤트가 정말 감동적이었습니다. 전문성이 돋보여요!", createdAt: "2024-12-14T18:30:00Z" },
  { id: "rev-189", enterpriseId: "ent-32", authorName: "Michelle Lee", rating: 4, comment: "Great event planning services! The Korean cultural experience was authentic.", createdAt: "2024-12-07T15:45:00Z" },
  { id: "rev-190", enterpriseId: "ent-32", authorName: "박준영", rating: 5, comment: "기업 행사부터 문화 이벤트까지 다 잘하세요. 강추!", createdAt: "2024-11-30T14:20:00Z" },
  { id: "rev-191", enterpriseId: "ent-32", authorName: "김수현", rating: 5, comment: "체험형 마케팅 이벤트 효과가 정말 좋았어요!", createdAt: "2024-11-23T11:00:00Z" },
  { id: "rev-192", enterpriseId: "ent-32", authorName: "Jason Kim", rating: 4, comment: "Professional team with creative ideas. Event was a huge success!", createdAt: "2024-11-16T13:40:00Z" },

  // K-Beauty Cosmetics - ent-33
  { id: "rev-193", enterpriseId: "ent-33", authorName: "송지아", rating: 5, comment: "스킨케어 제품 품질이 정말 좋아요! 피부가 좋아졌어요.", createdAt: "2024-12-20T14:30:00Z" },
  { id: "rev-194", enterpriseId: "ent-33", authorName: "이소영", rating: 5, comment: "명동 매장 방문했는데 제품 설명도 잘해주시고 친절해요!", createdAt: "2024-12-13T16:45:00Z" },
  { id: "rev-195", enterpriseId: "ent-33", authorName: "Anna Wang", rating: 5, comment: "Best K-beauty store! Got amazing skincare products with expert advice.", createdAt: "2024-12-06T15:20:00Z" },
  { id: "rev-196", enterpriseId: "ent-33", authorName: "박민서", rating: 4, comment: "한국 전통 성분을 활용한 제품들이 독특하고 좋아요.", createdAt: "2024-11-29T13:00:00Z" },
  { id: "rev-197", enterpriseId: "ent-33", authorName: "최예린", rating: 5, comment: "피부 상담 받고 딱 맞는 제품 추천받았어요. 감사합니다!", createdAt: "2024-11-22T17:15:00Z" },
  { id: "rev-198", enterpriseId: "ent-33", authorName: "Rachel Kim", rating: 5, comment: "Cruelty-free products with amazing results. My favorite K-beauty shop!", createdAt: "2024-11-15T14:50:00Z" },

  // Incheon Auto - ent-34
  { id: "rev-199", enterpriseId: "ent-34", authorName: "김동수", rating: 5, comment: "정비 기술이 뛰어나고 가격도 합리적입니다!", createdAt: "2024-12-19T10:30:00Z" },
  { id: "rev-200", enterpriseId: "ent-34", authorName: "이준혁", rating: 4, comment: "엔진 수리 잘 해주셨어요. 설명도 자세히 해주시고 친절합니다.", createdAt: "2024-12-12T14:15:00Z" },
  { id: "rev-201", enterpriseId: "ent-34", authorName: "박성민", rating: 5, comment: "정기 점검 받는데 꼼꼼하게 봐주시고 서비스가 좋아요.", createdAt: "2024-12-05T09:45:00Z" },
  { id: "rev-202", enterpriseId: "ent-34", authorName: "최재원", rating: 4, comment: "인증받은 정비소라 믿을 수 있어요. 대기 시간도 짧습니다.", createdAt: "2024-11-28T11:20:00Z" },
  { id: "rev-203", enterpriseId: "ent-34", authorName: "정현우", rating: 5, comment: "타이어 교체하고 정렬까지 완벽하게 해주셨어요!", createdAt: "2024-11-21T13:50:00Z" },
  { id: "rev-204", enterpriseId: "ent-34", authorName: "Kevin Park", rating: 5, comment: "ASE certified technicians! Great service at reasonable prices.", createdAt: "2024-11-14T10:00:00Z" },

  // Seoul Yoga - ent-35
  { id: "rev-205", enterpriseId: "ent-35", authorName: "안수진", rating: 5, comment: "요가 강사님들이 정말 전문적이시고 분위기도 좋아요!", createdAt: "2024-12-21T08:30:00Z" },
  { id: "rev-206", enterpriseId: "ent-35", authorName: "이지은", rating: 5, comment: "명상 세션 듣고 스트레스가 많이 해소됐어요. 감사합니다!", createdAt: "2024-12-14T19:15:00Z" },
  { id: "rev-207", enterpriseId: "ent-35", authorName: "Sarah Johnson", rating: 5, comment: "Best yoga studio in Gangnam! Instructors are amazing and very supportive.", createdAt: "2024-12-07T18:45:00Z" },
  { id: "rev-208", enterpriseId: "ent-35", authorName: "박예진", rating: 4, comment: "요가 수업 다양하고 시설이 깨끗해요. 추천합니다!", createdAt: "2024-11-30T07:30:00Z" },
  { id: "rev-209", enterpriseId: "ent-35", authorName: "김민정", rating: 5, comment: "개인 트레이닝 받고 몸이 정말 좋아졌어요. 강추!", createdAt: "2024-11-23T20:00:00Z" },
  { id: "rev-210", enterpriseId: "ent-35", authorName: "Emily Chen", rating: 5, comment: "Yoga Alliance certified instructors! Wellness programs are excellent.", createdAt: "2024-11-16T18:20:00Z" },

  // Gwangju Digital Marketing - ent-36
  { id: "rev-211", enterpriseId: "ent-36", authorName: "최민철", rating: 5, comment: "SEO 서비스 받고 검색 순위가 많이 올라갔어요!", createdAt: "2024-12-18T15:30:00Z" },
  { id: "rev-212", enterpriseId: "ent-36", authorName: "이상혁", rating: 4, comment: "소셜미디어 마케팅 효과가 좋았습니다. 전문성이 있어요.", createdAt: "2024-12-11T11:45:00Z" },
  { id: "rev-213", enterpriseId: "ent-36", authorName: "박진수", rating: 5, comment: "디지털 광고 캠페인 결과가 기대 이상이었습니다!", createdAt: "2024-12-04T14:20:00Z" },
  { id: "rev-214", enterpriseId: "ent-36", authorName: "정유미", rating: 5, comment: "콘텐츠 마케팅 전략이 체계적이고 효과적이에요.", createdAt: "2024-11-27T10:00:00Z" },
  { id: "rev-215", enterpriseId: "ent-36", authorName: "James Park", rating: 4, comment: "Google Partner certified! Great ROI on our PPC campaigns.", createdAt: "2024-11-20T13:15:00Z" },
  { id: "rev-216", enterpriseId: "ent-36", authorName: "김수영", rating: 5, comment: "광주에서 제일 좋은 디지털 마케팅 에이전시! 강추합니다.", createdAt: "2024-11-13T09:30:00Z" },

  // Korea Coffee Roasters - ent-37
  { id: "rev-217", enterpriseId: "ent-37", authorName: "송유진", rating: 5, comment: "스페셜티 커피 맛이 정말 훌륭해요! 로스팅 실력이 뛰어나십니다.", createdAt: "2024-12-22T09:30:00Z" },
  { id: "rev-218", enterpriseId: "ent-37", authorName: "이현우", rating: 5, comment: "바리스타 교육 받고 커피에 대해 많이 배웠어요. 감사합니다!", createdAt: "2024-12-15T14:45:00Z" },
  { id: "rev-219", enterpriseId: "ent-37", authorName: "Chris Lee", rating: 5, comment: "Best specialty coffee in Seoul! SCA certified roastery with amazing beans.", createdAt: "2024-12-08T11:20:00Z" },
  { id: "rev-220", enterpriseId: "ent-37", authorName: "박소현", rating: 4, comment: "카페 분위기도 좋고 커피도 맛있어요. 이태원 명소!", createdAt: "2024-12-01T10:15:00Z" },
  { id: "rev-221", enterpriseId: "ent-37", authorName: "김민수", rating: 5, comment: "원두 구매해서 집에서도 마시는데 퀄리티가 정말 좋습니다!", createdAt: "2024-11-24T16:30:00Z" },
  { id: "rev-222", enterpriseId: "ent-37", authorName: "Maria Garcia", rating: 5, comment: "Organic certified coffee with incredible taste. Love this place!", createdAt: "2024-11-17T13:00:00Z" },

  // Seoul Dental Clinic - ent-38
  { id: "rev-223", enterpriseId: "ent-38", authorName: "윤서아", rating: 5, comment: "임플란트 시술 받았는데 전혀 안 아프고 결과도 완벽해요!", createdAt: "2024-12-19T15:20:00Z" },
  { id: "rev-224", enterpriseId: "ent-38", authorName: "이재훈", rating: 5, comment: "치과 공포증 있었는데 선생님들이 너무 친절하셔서 치료 잘 받았어요.", createdAt: "2024-12-12T10:45:00Z" },
  { id: "rev-225", enterpriseId: "ent-38", authorName: "박은지", rating: 4, comment: "심미 치료 결과가 만족스럽고 시설이 최신입니다.", createdAt: "2024-12-05T14:30:00Z" },
  { id: "rev-226", enterpriseId: "ent-38", authorName: "최민호", rating: 5, comment: "교정 치료 중인데 경과가 좋고 설명도 자세히 해주세요!", createdAt: "2024-11-28T09:00:00Z" },
  { id: "rev-227", enterpriseId: "ent-38", authorName: "Jennifer Kim", rating: 5, comment: "ADA certified! Advanced dental care with English-speaking staff.", createdAt: "2024-11-21T11:15:00Z" },
  { id: "rev-228", enterpriseId: "ent-38", authorName: "정수진", rating: 5, comment: "스케일링부터 미백까지 다 여기서 합니다. 최고예요!", createdAt: "2024-11-14T13:40:00Z" },

  // Busan Architecture - ent-39
  { id: "rev-229", enterpriseId: "ent-39", authorName: "강동원", rating: 5, comment: "건축 설계가 창의적이고 기능적입니다. 만족스러워요!", createdAt: "2024-12-17T16:00:00Z" },
  { id: "rev-230", enterpriseId: "ent-39", authorName: "이승민", rating: 5, comment: "친환경 설계에 특화되어 있고 LEED 인증까지 도와주셨어요!", createdAt: "2024-12-10T14:30:00Z" },
  { id: "rev-231", enterpriseId: "ent-39", authorName: "박재현", rating: 4, comment: "상업 공간 디자인 잘해주셔서 매출이 올랐어요. 감사합니다!", createdAt: "2024-12-03T11:45:00Z" },
  { id: "rev-232", enterpriseId: "ent-39", authorName: "최유나", rating: 5, comment: "주거 공간 설계가 정말 마음에 들어요. 살기 편하고 아름답습니다!", createdAt: "2024-11-26T10:20:00Z" },
  { id: "rev-233", enterpriseId: "ent-39", authorName: "Michael Kim", rating: 5, comment: "Award-winning architects! Sustainable design with beautiful aesthetics.", createdAt: "2024-11-19T15:00:00Z" },
  { id: "rev-234", enterpriseId: "ent-39", authorName: "정민수", rating: 4, comment: "부산에서 제일 좋은 건축사무소! 인테리어도 잘해요.", createdAt: "2024-11-12T09:30:00Z" },

  // Korea Language Academy - ent-40
  { id: "rev-235", enterpriseId: "ent-40", authorName: "Emma Wilson", rating: 5, comment: "Best Korean language school! TOPIK prep was excellent, passed level 5!", createdAt: "2024-12-20T16:30:00Z" },
  { id: "rev-236", enterpriseId: "ent-40", authorName: "John Martinez", rating: 5, comment: "Great teachers and cultural immersion programs. Learned so much!", createdAt: "2024-12-13T11:45:00Z" },
  { id: "rev-237", enterpriseId: "ent-40", authorName: "Sophie Chen", rating: 4, comment: "Intensive course is challenging but very effective. Improved a lot!", createdAt: "2024-12-06T14:20:00Z" },
  { id: "rev-238", enterpriseId: "ent-40", authorName: "이민준", rating: 5, comment: "외국인 친구들 추천할 만한 최고의 한국어 학원입니다!", createdAt: "2024-11-29T10:00:00Z" },
  { id: "rev-239", enterpriseId: "ent-40", authorName: "Anna Schmidt", rating: 5, comment: "Ministry certified! Excellent curriculum and friendly staff.", createdAt: "2024-11-22T13:15:00Z" },
  { id: "rev-240", enterpriseId: "ent-40", authorName: "David Brown", rating: 5, comment: "Cultural exchange activities are amazing! Made many Korean friends here.", createdAt: "2024-11-15T09:40:00Z" },

  // DAIM AUTOS Ltd. - ent-41
  { id: "rev-241", enterpriseId: "ent-41", authorName: "Carlos Rodriguez", rating: 5, comment: "Excellent service! They helped me import a Hyundai to Chile with no problems. Highly professional.", createdAt: "2024-12-20T14:30:00Z" },
  { id: "rev-242", enterpriseId: "ent-41", authorName: "박성호", rating: 5, comment: "칠레로 차량 수출 도와주셨는데 처음부터 끝까지 완벽했습니다. 강력 추천!", createdAt: "2024-12-15T09:20:00Z" },
  { id: "rev-243", enterpriseId: "ent-41", authorName: "Maria Gonzalez", rating: 4, comment: "Good service and fair prices. Documentation process was smooth.", createdAt: "2024-12-10T11:45:00Z" },
  { id: "rev-244", enterpriseId: "ent-41", authorName: "김태양", rating: 5, comment: "해외 자동차 거래 전문가입니다. 신뢰할 수 있는 업체!", createdAt: "2024-12-05T16:10:00Z" },
  { id: "rev-245", enterpriseId: "ent-41", authorName: "Pedro Sanchez", rating: 5, comment: "Fast shipping and great communication. Will use again for sure!", createdAt: "2024-11-28T13:55:00Z" },
  { id: "rev-246", enterpriseId: "ent-41", authorName: "이준혁", rating: 4, comment: "중고차 수출 서비스 좋습니다. 가격도 합리적이에요.", createdAt: "2024-11-20T10:30:00Z" },

  // KIMS INTERNATIONAL - ent-42
  { id: "rev-247", enterpriseId: "ent-42", authorName: "박철수", rating: 5, comment: "스텐 파이프 수출 건으로 거래했는데 품질 좋고 가격도 합리적입니다. 김선희 대표님 친절하세요!", createdAt: "2024-12-15T11:20:00Z" },
  { id: "rev-248", enterpriseId: "ent-42", authorName: "Mohammed Al-Fayed", rating: 5, comment: "Excellent service for industrial machinery export. Fast delivery and good quality equipment.", createdAt: "2024-12-08T14:45:00Z" },
  { id: "rev-249", enterpriseId: "ent-42", authorName: "김태영", rating: 4, comment: "용접기 구매했는데 중고지만 상태 양호합니다. 가성비 좋아요.", createdAt: "2024-12-01T09:30:00Z" },
  { id: "rev-250", enterpriseId: "ent-42", authorName: "李强", rating: 5, comment: "Good supplier for steel materials. Professional service and reliable delivery to China.", createdAt: "2024-11-25T16:10:00Z" },
  { id: "rev-251", enterpriseId: "ent-42", authorName: "정민호", rating: 4, comment: "각종 기계 재고 처리하는데 도움 많이 받았습니다. 전문적이고 신속해요.", createdAt: "2024-11-18T13:25:00Z" },
  { id: "rev-252", enterpriseId: "ent-42", authorName: "Ahmed Hassan", rating: 5, comment: "Best industrial materials trader in Korea! Very satisfied with excavator purchase.", createdAt: "2024-11-10T10:50:00Z" },
];
