import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
// import Paginator from '@theme/Paginator'; 

/**
 * 'STUFFS' 섹션 전용 블로그 목록 페이지 컴포넌트입니다.
 * 쇼핑몰 같은 그리드 레이아웃을 표시합니다. (디자인 수정됨)
 */
export default function ExperimentsGridPage({metadata, items}) {
  const {blogTitle, blogDescription} = metadata;

  return (
    <Layout
      title={blogTitle}
      description={blogDescription}>
      
      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        
        {/* 페이지 제목 */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 font-mono tracking-wide">
          {blogTitle}
        </h1>

        {/* 그리드 컨테이너 (카드 간격을 조금 늘렸습니다: gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {items.map(({content: BlogPostContent}) => {
            const {metadata, frontMatter} = BlogPostContent;
            
            // Markdown 파일 상단(front matter)에서 'image' 경로를 가져옵니다.
            const imageUrl = frontMatter.image;

            return (
              <Link
                key={metadata.permalink}
                to={metadata.permalink}
                /* [디자인 수정됨]
                  - 'border-4 border-black p-5' 스타일 제거
                  - 'rounded-lg': 둥근 모서리
                  - 'border border-gray-200': 얇은 회색 테두리
                  - 'shadow-md': 기본 그림자
                  - 'overflow-hidden': 이미지가 모서리를 삐져나가지 않게 함
                  - 'transition-all duration-200': 부드러운 전환 효과
                  - 'hover:shadow-xl hover:-translate-y-1': 호버 시 그림자 및 위치 이동
                */
                className="block rounded-lg border border-gray-200 shadow-md overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              >
                {/* 썸네일 이미지 영역 */}
                {imageUrl ? (
                  /*
                    [수정됨]
                    - 'mb-4', 'border' 등 불필요한 스타일 제거
                  */
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={metadata.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  // 이미지가 없을 경우 (테두리 상단이 둥글게 처리되도록 수정)
                  <div className="aspect-video border-b border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                    <span className="text-sm text-gray-400">No Image</span>
                  </div>
                )}
                
                {/* [수정됨]
                  - 텍스트 콘텐츠를 별도 div로 감싸고 안쪽 여백(p-4)을 줍니다.
                */}
                <div className="p-4">
                  {/* 제목 */}
                  <h3 className="font-bold text-lg font-mono tracking-wide">
                    {metadata.title}
                  </h3>
                  
                  {/* 요약 내용 (글자색을 조금 연하게 변경: text-gray-600) */}
                  {metadata.description && (
                     <p className="mt-2 text-sm text-gray-600">
                       {metadata.description}
                     </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* 페이지네이션 (게시물이 많아지면 필요합니다)
          <div className="mt-16">
            <Paginator metadata={metadata} />
          </div> 
        */}
      </main>
    </Layout>
  );
}