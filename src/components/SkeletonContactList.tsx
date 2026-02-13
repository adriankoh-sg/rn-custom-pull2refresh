import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import Colors from "../constants/Colors";
import { useFadingStyle } from "../hooks/useCommonAnimation";

const SkeletonContactList = () => {
  const contacts = new Array(10).fill(0).map((_, i) => ({
    id: i,
    name: "Loading...",
    phone: "Loading...",
    avatar: "https://via.placeholder.com/50?text=...",
  }));

  const opacityStyle = useFadingStyle({ fadeInDuration: 800, fadeOutDuration: 800 });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {contacts.map((contact) => (
        <Animated.View
          style={[styles.container, opacityStyle]}
          key={`item-${contact.id}`}
        >
          <View style={styles.avatar} />

          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                width: 180,
                height: 20,
                backgroundColor: Colors.skeletonBackground,
                marginBottom: 6,
              }}
            />
            <View
              style={{
                width: 120,
                height: 16,
                backgroundColor: Colors.skeletonBackground,
                marginBottom: 6,
              }}
            />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default SkeletonContactList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.skeletonBackground,
  },
});
