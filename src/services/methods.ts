interface YoutubeData {
   videoId: string;
   startTime: number | null;
}

export function extractYoutubeVideoId(link: string): YoutubeData {
   const videoIdRegex =
      /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
   const queryParamsRegex = /(\?|\&)([^=]+)\=([^&]+)/g;

   let match = link.match(videoIdRegex);
   if (match) {
      // 비디오 ID를 추출
      const videoId = match[4];
      let startTime: number | null = null;

      // 쿼리 파라미터 검색
      const queryParams = new URLSearchParams(link.split("?")[1]);
      if (queryParams.has("t")) {
         startTime = parseInt(queryParams.get("t") as string);
      }

      // 결과 객체 반환
      return {
         videoId: videoId,
         startTime: startTime,
      };
   }

   return null;
}
