import Contact from "@/src/components/Contact";
import { sampleContactList } from "@/src/dummy/contacts";
import { FlatList, StyleSheet, View } from "react-native";

export default function Contacts() {
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleContactList}
        style={{ flex: 1, width: "100%" }}
        renderItem={({ item }) => <Contact contact={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
