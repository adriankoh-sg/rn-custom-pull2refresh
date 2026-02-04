import { ContactType } from "@/src/types";
import { Image } from "expo-image";
import { Text, View } from "react-native";

const Contact = ({ contact }: { contact: ContactType }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
      key={`item-${contact.id}`}
    >
      <Image
        source={{ uri: contact.avatar }}
        style={{ width: 50, height: 50, borderRadius: 25, borderColor: "#ccc", borderWidth: 0.3 }}
        contentFit="contain"
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{contact.name}</Text>
        <Text style={{ fontSize: 14, color: "gray" }}>{contact.phone}</Text>
      </View>
    </View>
  );
};

export default Contact;
