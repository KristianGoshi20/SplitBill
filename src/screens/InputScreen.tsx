import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function InputScreen(): JSX.Element {
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();

  const navigateToResult = useCallback(() => {
    navigation.navigate('Result', {
      amount: amount,
    });
  }, [amount]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{backgroundColor: 'lightgray'}}
      contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 20,
          }}>
          Split bill calculator
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          margin: 20,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}>
        <TextInput
          style={{height: 40, borderRadius: 100}}
          inputMode={'decimal'}
          placeholder="Type your bill amount here"
          onChangeText={newAmount => setAmount(newAmount)}
          defaultValue={amount}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 18,
        }}
        disabled={!amount}
        onPress={navigateToResult}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
            color: 'white',
          }}>
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default InputScreen;
