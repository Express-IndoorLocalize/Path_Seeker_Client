import { useContext } from 'react';
import { View as DefaultView, Text as DefaultText, TextProps, ViewProps } from 'react-native';
import DarkMode from '../context/DarkModeProvider';

export function Text(props: TextProps) {
  const { style, ...rest } = props;
  const { isDarkMode} = useContext(DarkMode);
  return (
    <DefaultText
      style={[
        style,
        {
          color: isDarkMode ? 'gray' : 'black',
          opacity: isDarkMode ? 0.6 : 1,
        },
      ]}
      {...rest}
    />
  );
}

export function View(props: ViewProps) {
  const { style, ...rest } = props;
  const { isDarkMode} = useContext(DarkMode);
  return (
    <DefaultView
      style={[
        style,
        {
          backgroundColor: isDarkMode ? '#121212' : 'white',
        },
      ]}
      {...rest}
    />
  );
}

export function Card(props: ViewProps) {
  const { style, ...rest } = props;
  const { isDarkMode} = useContext(DarkMode);
  return (
    <DefaultView
      style={[
        style,
        {
          backgroundColor: isDarkMode ? '#121212' : 'white',
        },
      ]}
      {...rest}
    />
  );
}