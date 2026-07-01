import {Linking, Share} from 'react-native';

export const shareEducationalText = async (title: string, message: string) => {
  await Share.share({
    title,
    message: `${title}\n\n${message}`,
  });
};

export const openMapLocation = async (query: string) => {
  const encoded = encodeURIComponent(query);
  const url = `https://maps.apple.com/?q=${encoded}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
};
