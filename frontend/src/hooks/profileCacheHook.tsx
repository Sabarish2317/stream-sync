import axios from "axios";
import { useEffect, useState } from "react";

const useFetchImage = (url: string | undefined) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const cachedImage = localStorage.getItem("image_cache");
    if (cachedImage) {
      setImageUrl(cachedImage);
      return;
    }

    const fetchImage = async () => {
      if (url) {
        try {
          const response = await axios.get(url, { responseType: "blob" });
          if (response.status !== 200) {
            throw new Error("Network response was not ok");
          }
          const imageBlob = await response.data;
          const imageObjectURL = URL.createObjectURL(imageBlob);

          localStorage.setItem("image_cache", imageObjectURL);
          setImageUrl(imageObjectURL);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();
  }, [url]);

  return imageUrl;
};

export default useFetchImage;
