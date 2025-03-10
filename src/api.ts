import { useMutation } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { FFmpegKit, FFmpegKitConfig } from "ffmpeg-kit-react-native";

export interface CropParams {
  videoUri: string;
  startTime: number;
  endTime: number;
}

const cropVideo = async ({
  videoUri,
  startTime,
  endTime,
}: CropParams): Promise<string> => {
  const duration = endTime - startTime;
  const outputUri = FileSystem.cacheDirectory + `cropped_${Date.now()}.mp4`;

  const cleanVideoUri = videoUri.replace(/^file:\/\//, "");

  FFmpegKitConfig.enableLogCallback((log) => {
    console.log("FFmpeg log:", log.getMessage());
  });
  FFmpegKitConfig.enableStatisticsCallback((stat) => {
    console.log("FFmpeg statistics:", stat);
  });

  const start = parseFloat(startTime.toFixed(2));
  const t = parseFloat(duration.toFixed(2));

  const command = `-y -i "${cleanVideoUri}" -ss ${start} -t ${t} -c:v h264 -c:a aac "${outputUri}"`;
  console.log("Executing FFmpeg command:", command);

  const session = await FFmpegKit.execute(command);
  const returnCode = await session.getReturnCode();

  if (returnCode.isValueSuccess()) {
    console.log("Cropping succeeded, output:", outputUri);
    return outputUri;
  } else {
    console.error("FFmpeg crop operation failed with return code:", returnCode);
    throw new Error("FFmpeg crop operation failed");
  }
};

export const useCropVideo = () => {
  return useMutation<string, unknown, CropParams>({ mutationFn: cropVideo });
};
