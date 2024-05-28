import { useState, useEffect } from "react";

function CoursePlayer({ videoUrl, title }) {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    const getVideoData = async () => {
      const bodyData = { videoId: videoUrl };
      const response = await fetch(
        "http://localhost:8080/api/course/generate-video-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );
      const data = await response.json();
      setVideoData(data);
    };
    getVideoData();
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "56%", position: "relative" }}>
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=Ay9kDAMNV0NAL2Y8`}
        style={{
          border: 0,
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        allowFullScreen="true"
        allow="encrypted-media"
      />
    </div>
  );
}

export default CoursePlayer;
