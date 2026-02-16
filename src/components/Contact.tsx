import Colors from '@/src/constants/colors';
import { ContactType } from '@/src/types/contacts';
import { Text, useColorScheme, View } from 'react-native';
import ImageLoader from './ImageLoader';

const Contact = ({ contact }: { contact: ContactType }) => {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      key={`item-${contact.id}`}
    >
      <ImageLoader
        src={contact.avatar}
        style={{ borderRadius: 25, borderColor: '#ccc', borderWidth: 0.3 }}
        width={50}
        height={50}
        cachePolicy="memory-disk"
        contentFit="contain"
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors[colorScheme].text }}>
          {contact.name}
        </Text>
        <Text style={{ fontSize: 14, color: Colors[colorScheme].textSecondary }}>
          {contact.phone}
        </Text>
      </View>
    </View>
  );
};

export default Contact;
