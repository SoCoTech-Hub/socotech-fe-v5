"use client";

import { useEffect, useState } from "react";
import { Download, Pause, Play, RotateCw } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Skeleton } from "../skeleton";
import PDFViewer from "./pdfViewer";

interface Resource {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: "pdf" | "audio" | "video" | "other";
}

interface ResourcePageProps {
  resourceId: string;
}

export default function ResourcePage({ resourceId }: ResourcePageProps) {
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchResource = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        setTimeout(() => {
          setResource({
            id: resourceId,
            title: "Sample Media Resource",
            description:
              "This is a sample media resource. You can view or play it directly on this page or download it.",
            fileUrl: "https://example.com/sample-resource.mp4",
            fileType: "video",
          });
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to fetch resource", error);
        setIsLoading(false);
      }
    };

    fetchResource();
  }, [resourceId]);

  const handleDownload = () => {
    if (resource?.fileUrl) {
      window.open(resource.fileUrl, "_blank");
    }
  };

  const togglePlayback = (action: "play" | "pause" | "restart") => {
    const mediaElement =
      document.querySelector<HTMLMediaElement>("video, audio");
    if (mediaElement) {
      if (action === "play") {
        mediaElement.play();
        setIsPlaying(true);
      } else if (action === "pause") {
        mediaElement.pause();
        setIsPlaying(false);
      } else if (action === "restart") {
        mediaElement.currentTime = 0;
        mediaElement.play();
        setIsPlaying(true);
      }
    }
  };

  const renderMediaPlayer = () => {
    if (!resource) return null;

    switch (resource.fileType) {
      case "audio":
        return (
          <audio
            src={resource.fileUrl}
            className="w-full"
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Your browser does not support the audio element.
          </audio>
        );
      case "video":
        return (
          <video
            src={resource.fileUrl}
            className="w-full"
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Your browser does not support the video element.
          </video>
        );
      case "pdf":
        return <PDFViewer url={resource.fileUrl} />;
      default:
        return <p>Unsupported file type.</p>;
    }
  };

  return (
    <div className="container mx-auto space-y-4 p-4">
      <Card className="mx-auto w-full max-w-3xl">
        {isLoading ? (
          <>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-32" />
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>{resource?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{resource?.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Button onClick={handleDownload} className="mr-2">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                {(resource?.fileType === "audio" ||
                  resource?.fileType === "video") && (
                  <>
                    <Button
                      onClick={() =>
                        togglePlayback(isPlaying ? "pause" : "play")
                      }
                      variant="outline"
                      className="mr-2"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => togglePlayback("restart")}
                      variant="outline"
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          </>
        )}
      </Card>

      {!isLoading && (
        <Card className="mx-auto w-full max-w-3xl">
          <CardContent className="p-4">{renderMediaPlayer()}</CardContent>
        </Card>
      )}
    </div>
  );
}
