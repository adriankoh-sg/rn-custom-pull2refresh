import { Image, ImageProps, ImageStyle } from "expo-image";
import React from "react";
import { StyleProp, View } from "react-native";
import Animated from "react-native-reanimated";
import Colors from "../constants/Colors";
import { useFadingStyle } from "../hooks/useCommonAnimation";
interface ImageLoaderProps extends ImageProps {
  src: string;
  style: StyleProp<ImageStyle>;
  width?: number;
  height?: number;
}

/**
 * Component to load an image with a skeleton placeholder while loading.
 * @param { string } src - The source URL of the image to load.
 * @param { StyleProp<ImageStyle> } style - The style to apply to the image.
 * @param { number } width - The width of the image.
 * @param { number } height - The height of the image.
 * @param { ImageProps } props - Additional props for the Image component.
 * @returns
 */
const ImageLoader = ({
  src,
  style,
  width,
  height,
  ...props
}: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const fadingStyle = useFadingStyle({});

  return (
    <View style={{ width, height }}>
      {isLoading && (
        <Animated.View
          style={[
            style,
            {
              width,
              height,
              backgroundColor: Colors.skeletonBackground,
              position: "absolute",
            },
            fadingStyle,
          ]}
        />
      )}
      <Image
        source={{ uri: src }}
        style={[style, { width, height }]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        {...props}
      />
    </View>
  );
};

export default ImageLoader;
